import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setCancelConsultation } from "./setCancelConsultation"
import { setStudentBookConsultation } from "./setStudentBookConsultation"

export const setRescheduleConsultation = async(consultationId: string) => {
    const consultationDoc = doc(db, 'consultationSessions', consultationId)

    const consultationData = await getDoc(consultationDoc)

    await setStudentBookConsultation(consultationData.data()?.studentId, consultationData.data()?.teacherId)

    await setCancelConsultation(consultationId)
}