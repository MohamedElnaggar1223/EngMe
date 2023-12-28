import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherFirstLogins = async () => {
    const teacherRef = collection(db, 'teachers')

    const queryTeachers = query(teacherRef, where('firstLoginLink', '!=', null))

    const teachersDocs = await getDocs(queryTeachers)

    const teachersData = teachersDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return teachersData
}