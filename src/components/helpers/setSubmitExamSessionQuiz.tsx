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
        //@ts-expect-error createdAt
        const dateA = a.createdAt.toDate();
        //@ts-expect-error createdAt
        const dateB = b.createdAt.toDate();
      
        // Compare the dates for sorting
        return dateA - dateB;
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
    console.log(correctOptions)
    const answers = orderedQuizzesArray[0]?.data()?.answers
    console.log(answers)
    //@ts-expect-error anyerror
    const results = correctOptions.map((option, index) => {
      if(typeof answers[index] === 'object')
      {
        console.log('object', answers[index])
        const objectAnswers = Object.values(answers[index]).map((answer, indexOfAnswer) => Number(option[indexOfAnswer]) === Number(answer))
        console.log(objectAnswers)
        console.log(objectAnswers.every(Boolean))
        return objectAnswers.every(Boolean)
      }
      else answers[index] === Number(option)
    })
    console.log(results)
    console.log(results.slice().filter(res => !!res).length)
    console.log(results.length)
    //@ts-expect-error anyerror
    const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)
    
    const studentQuizDoc = doc(db, 'studentQuiz', orderedQuizzesArray[0]?.id)

    await updateDoc(studentQuizDoc, {...orderedQuizzesArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id)
}