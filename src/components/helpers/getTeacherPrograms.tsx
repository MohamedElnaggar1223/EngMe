import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherPrograms = async(teacherId: string) => {
    const teacherProgramsRef = collection(db, 'programs')
    const queryTeacherPrograms = query(teacherProgramsRef, where('teacherId', '==', teacherId))

    const teacherProgramsDocs = await getDocs(queryTeacherPrograms)

    const teacherProgramsData = teacherProgramsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return teacherProgramsData
}