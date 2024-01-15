import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit } from "firebase/firestore"
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
        const arrayAnswers = Object.values(answers[index]).map((answer) => option.includes(answer))
        return arrayAnswers.every(Boolean)
      }
      else return answers[index] === Number(option)
    })
    //@ts-expect-error anyerror
    const grade = (results.slice().filter(res => !!res)).length
    // const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)

    
    const studentQuizDoc = doc(db, 'studentQuiz', orderedQuizzesArray[0]?.id)

    await updateDoc(studentQuizDoc, {...orderedQuizzesArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id)
}