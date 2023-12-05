import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentQuiz = async (studentId: string, quizId: string) => {
    const studentQuizRef = collection(db, 'studentQuiz')
    const studentExamSession = collection(db, 'examSession')
    const quizRef = doc(db, 'quizzes', quizId)

    const quiz = await getDoc(quizRef)

    const minutesToAdd = quiz.data()?.duration.split(" ")[0]

    const currentTime = Timestamp.now().toDate()
    currentTime.setMinutes(currentTime.getMinutes() + Number(minutesToAdd))


    const newStudentQuiz = {
        studentId,
        quizId,
        grade: 0,
        createdAt: Timestamp.now()
    }

    const newStudentQuizSession = {
        studentId,
        type: 'quiz',
        quizId,
        startTime: Timestamp.now(),
        endTime: Timestamp.fromDate(currentTime),
        lastQuestion: 0
    }

    await addDoc(studentQuizRef, newStudentQuiz)
    await addDoc(studentExamSession, newStudentQuizSession)
}