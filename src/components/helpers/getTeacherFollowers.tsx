import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherFollowers = async(teacherId: string) => {
    const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')
    const queryStudentFollowTeacher = query(studentFollowTeacherRef, where('teacherId', '==', teacherId))

    const studentFollowTeacherDocs = await getDocs(queryStudentFollowTeacher)
    const studentFollowTeacherData = studentFollowTeacherDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentFollowTeacherData
}