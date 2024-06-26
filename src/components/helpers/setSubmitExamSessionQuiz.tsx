import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

export const setSubmitExamSessionQuiz = async (studentId: string, quizId: string) => {
    const examSessionRef = collection(db, 'examSession')
    const studentQuizRef = collection(db, 'studentQuiz')
    const quizDoc = doc(db, 'quizzes', quizId)

    const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('quizId', '==', quizId)), limit(1))
    const queryStudentQuiz = query(studentQuizRef, and(where('studentId', '==', studentId), where('quizId', '==', quizId)))
    const quizData = await getDoc(quizDoc)
    const studentQuizDocs = await getDocs(queryStudentQuiz)
    const examSessionData = await getDocs(queryExamSession)

    const orderedQuizzesArray = studentQuizDocs.docs.slice().sort((a, b) => {
      const dateA = a.data().createdAt.toDate();
      const dateB = b.data().createdAt.toDate();
    
      // Compare the dates for sorting
      return dateB - dateA;
      })

    //@ts-expect-error anyerr
    const correctOptions = quizData?.data()?.questions.map(question => {
      if(question.type === 'dropdowns')
      {
        const correctOptions = [question.firstCorrect, question.secondCorrect, question.thirdCorrect, question.fourthCorrect]
        return correctOptions
      }
      else
      {
        return question.correctOption
      }
    })
    const answers = orderedQuizzesArray[0]?.data()?.answers
    //@ts-expect-error anyerror
    const results = correctOptions.map((option, index) => {
      if(typeof answers[index] === 'object')
      {
        const objectAnswers = Object.values(answers[index]).map((answer, indexOfAnswer) => option[indexOfAnswer] === answer)
        return objectAnswers.every(Boolean)
      }
      else if(Array.isArray(option))
      {
        //@ts-expect-error answer
        const arrayAnswers = Object.values(answers[index]).map((answer) => option.includes(answer.toString()))
        return arrayAnswers.every(Boolean)
      }
      else return Number(answers[index]) === Number(option)
    })

    const questions = quizData?.data()?.questions as []
    //@ts-expect-error anyerror
    const wrongQuestions = results.slice().reduce((acc, option, index) => {
        if(!option)
        {
          acc.push(questions[index])
        }
        return acc
    }, []) 

    const troubleshootref = collection(db, 'troubleshoot')
    const troubleshootquery = query(troubleshootref, where('studentId', '==', studentId))
    const troubleshootdocs = await getDocs(troubleshootquery)
    if(troubleshootdocs.docs.length === 0)
    {
        const newTroubleshoot = {
            studentId,
            questions: wrongQuestions
        }
        await addDoc(troubleshootref, newTroubleshoot)
    }
    else
    {
        await updateDoc(doc(troubleshootref, troubleshootdocs.docs[0].id), { questions: troubleshootdocs.docs[0].data().questions ? [...troubleshootdocs.docs[0].data().questions, ...wrongQuestions] : [...wrongQuestions] })
    }
    //@ts-expect-error anyerror
    const grade = (results.slice().filter(res => !!res)).length
    // const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)

    const courseDoc = doc(db, 'courses', quizData.data()?.courseId)
    const courseData = await getDoc(courseDoc)
    
    const studentQuizDoc = doc(db, 'studentQuiz', orderedQuizzesArray[0]?.id)

    await updateDoc(studentQuizDoc, {...orderedQuizzesArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id, studentId, `/programs/current/${courseData.data()?.programId}`)
}