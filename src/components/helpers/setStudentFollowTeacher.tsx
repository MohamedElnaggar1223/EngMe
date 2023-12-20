import { collection, addDoc, and, getDocs, query, where, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentFollowTeacher = async(teacherId: string, studentId: string) => {
    const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')
    const queryStudentFollowTeacher = query(studentFollowTeacherRef, and(where('studentId', '==', studentId), where('teacherId', '==', teacherId)))

    const studentFollowTeacherDoc = await getDocs(queryStudentFollowTeacher)

    if(studentFollowTeacherDoc.docs.length)
    {
        const deletedDoc = doc(db, 'studentFollowTeacher', studentFollowTeacherDoc.docs[0].id)
        await deleteDoc(deletedDoc)
    }
    else
    {
        const newFollow = {
            teacherId,
            studentId
        }
    
        await addDoc(studentFollowTeacherRef, newFollow)
    }
}