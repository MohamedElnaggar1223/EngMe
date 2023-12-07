import { collection, documentId, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeachersData = async(teachersIds: string[]) => {
    const teachersRef = collection(db, 'teachers')
    const queryTeachers = query(teachersRef, where(documentId(), 'in', teachersIds))

    const teachersDocs = await getDocs(queryTeachers)
    const teacherData = teachersDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return teacherData
}