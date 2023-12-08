import { collection, documentId, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentsData = async(studentsIds: string[]) => {
    const studentsRef = collection(db, 'students')
    const queryStudents = query(studentsRef, where(documentId(), 'in', studentsIds))

    const studentsDocs = await getDocs(queryStudents)
    const studentData = studentsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentData
}