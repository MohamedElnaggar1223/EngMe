import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentQuizzes = async (studentId: string, quizzes: string[]) => {
    const studentQuizesRef = collection(db, 'studentQuiz')
    const queryRef = query(studentQuizesRef, and(where('studentId', '==', studentId), where('quizId', 'in', quizzes)))

    const studentQuizzesData = await getDocs(queryRef)

    const studentQuizzesArray = studentQuizzesData.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentQuizzesArray
}