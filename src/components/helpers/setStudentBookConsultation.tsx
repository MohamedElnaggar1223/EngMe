import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentBookConsultation = async(studentId: string, teacherId: string) => {
    const consultationSessionsRef = collection(db, 'consultationSessions')

    const newSession = {
        teacherId,
        studentId
    }

    await addDoc(consultationSessionsRef, newSession)
}