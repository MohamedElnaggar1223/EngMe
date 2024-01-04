import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeachers = async () => {
    const teachersRef = collection(db, 'teachers')

    const teachersDocs = await getDocs(teachersRef)

    const teachers = teachersDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    //@ts-expect-error hide firstLoginLink from teachers
    const filteredTeachers = teachers.filter((teacher) => !teacher?.firstLoginLink)

    return filteredTeachers
}