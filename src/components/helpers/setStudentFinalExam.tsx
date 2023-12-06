import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentFinalExam = async (studentId: string, finalExamId: string) => {
    const studentFinalExamRef = collection(db, 'studentFinalExam')
    const studentExamSession = collection(db, 'examSession')
    const finalExamRef = doc(db, 'finalExams', finalExamId)

    const finalExam = await getDoc(finalExamRef)

    const minutesToAdd = finalExam.data()?.duration.split(" ")[0]

    const currentTime = Timestamp.now().toDate()
    currentTime.setMinutes(currentTime.getMinutes() + Number(minutesToAdd))


    const newStudentFinalExam = {
        studentId,
        finalExamId,
        grade: 0,
        createdAt: Timestamp.now()
    }

    const newStudentFinalExamSession = {
        studentId,
        type: 'finalExam',
        finalExamId,
        startTime: Timestamp.now(),
        endTime: Timestamp.fromDate(currentTime),
        lastQuestion: 0
    }

    await addDoc(studentFinalExamRef, newStudentFinalExam)
    await addDoc(studentExamSession, newStudentFinalExamSession)
}