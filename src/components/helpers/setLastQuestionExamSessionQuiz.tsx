import { collection, query, and, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setLastQuestionExamSessionQuiz = async (studentId: string, quizId: string, index: number, answer: unknown) => {
    try
    {
        const examSessionRef = collection(db, 'examSession')
        const studentQuizRef = collection(db, 'studentQuiz')

        const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('quizId', '==', quizId)))
        const queryStudentQuiz = query(studentQuizRef, and(where('studentId', '==', studentId), where('quizId', '==', quizId)))

        const oldExamSessionData = await getDocs(queryExamSession)
        const oldStudentQuizData = await getDocs(queryStudentQuiz)

        const orderedOldStudentQuizData = oldStudentQuizData.docs.slice().sort((a, b) => {
            const dateA = a.data().createdAt.toDate();
            const dateB = b.data().createdAt.toDate();
          
            // Compare the dates for sorting
            return dateB - dateA;
          })

        const examSessionRefDoc = doc(db, 'examSession', oldExamSessionData.docs[0].id)
        const studentQuizRefDoc = doc(db, 'studentQuiz', orderedOldStudentQuizData[0].id)

        await updateDoc(examSessionRefDoc, {...oldExamSessionData.docs[0].data(), lastQuestion: index + 1})
        if(Array.isArray(answer))
        {
            const newAnswerObject = answer.reduce((obj, value, index) => {
                obj[index] = value;
                return obj;
            }, {})

            const newAnswer = orderedOldStudentQuizData[0].data().answers?.length > 0 ? [...orderedOldStudentQuizData[0].data().answers, newAnswerObject] : [newAnswerObject]
            await updateDoc(studentQuizRefDoc, {...orderedOldStudentQuizData[0].data(), answers: newAnswer})
        }
        else
        {
            const newAnswer = orderedOldStudentQuizData[0].data().answers?.length > 0 ? [...orderedOldStudentQuizData[0].data().answers, answer] : [answer]
            await updateDoc(studentQuizRefDoc, {...orderedOldStudentQuizData[0].data(), answers: newAnswer})
        }
    }
    catch(e)
    {
        console.error(e)
    }
}