import { collection, addDoc, and, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentCourseStatus = async (studentId: string, courseId: string) => {
    const studentCourseRef = collection(db, 'studentCourse')
    const queryCourseRef = query(studentCourseRef, and(where('studentId', '==', studentId), where('courseId', '==', courseId)))

    const studentCourseData = await getDocs(queryCourseRef)

    if(studentCourseData.docs.length > 0) return
    
    const newStudentCourse = {
        studentId,
        courseId,
        completed: true
    }

    await addDoc(studentCourseRef, newStudentCourse)
}