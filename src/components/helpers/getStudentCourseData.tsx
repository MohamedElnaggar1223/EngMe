import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentCourseData = async (studentId: string, courses: string[]) => {
    const studentCourseRef = collection(db, 'studentCourse')
    const queryStudentCourse = query(studentCourseRef, and(where('studentId', '==', studentId), where('courseId', 'in', courses)))

    const studentCourseData = await getDocs(queryStudentCourse)
    const studentCourseArray = studentCourseData.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentCourseArray
}