import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentChatTeacher = async(teacherId: string, studentId: string) => {
    const studentDoc = doc(db, 'students', studentId)
    const teacherDoc = doc(db, 'teachers', teacherId)

    await updateDoc(studentDoc, { friends: arrayUnion(teacherId) })
    await updateDoc(teacherDoc, { friends: arrayUnion(studentId) })
}