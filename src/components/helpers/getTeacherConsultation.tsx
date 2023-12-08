import { query, where, getDocs, collection } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherConsultation = async(teacherId: string) => {
    const teacherConsultationRef = collection(db, 'consultationSessions')
    const queryTeacherConsultation = query(teacherConsultationRef, where('teacherId', '==', teacherId))

    const teacherConsultationDocs = await getDocs(queryTeacherConsultation)

    const teacherConsultationData = teacherConsultationDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return teacherConsultationData
}