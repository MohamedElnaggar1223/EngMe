import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentTroubleshoot = async (studentId: string, troubleshootId: string) => {
    const studentTroubleshootRef = collection(db, 'studentTroubleshoot')
    const studentExamSession = collection(db, 'examSession')

    const currentTime = Timestamp.now().toDate()
    currentTime.setMinutes(currentTime.getMinutes() + 90)


    const newStudentTroubleshoot = {
        studentId,
        troubleshootId,
        grade: 0,
        createdAt: Timestamp.now()
    }

    const newStudentTroubleshootSession = {
        studentId,
        type: 'troubleshoot',
        troubleshootId,
        startTime: Timestamp.now(),
        endTime: Timestamp.fromDate(currentTime),
        lastQuestion: 0
    }

    await addDoc(studentTroubleshootRef, newStudentTroubleshoot)
    await addDoc(studentExamSession, newStudentTroubleshootSession)
}