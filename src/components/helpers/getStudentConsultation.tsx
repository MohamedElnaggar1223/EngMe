import { query, where, getDocs, collection } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentConsultation = async(studentId: string) => {
    const studentConsultationRef = collection(db, 'consultationSessions')
    const queryStudentConsultation = query(studentConsultationRef, where('studentId', '==', studentId))

    const studentConsultationDocs = await getDocs(queryStudentConsultation)

    const studentConsultationData = studentConsultationDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentConsultationData
}