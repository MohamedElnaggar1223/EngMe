import { collection, addDoc, Timestamp, and, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentLesson = async (studentId: string, lessonId: string) => {
    const studentLessonRef = collection(db, 'studentLesson')

    const queryStudentLesson = query(studentLessonRef, and(where('studentId', '==', studentId), where('lessonId', '==', lessonId)))

    const studentLessonData = await getDocs(queryStudentLesson)

    if(studentLessonData.docs.length > 0) return

    const newStudentLesson = {
        studentId,
        lessonId,
        createdAt: Timestamp.now()
    }

    await addDoc(studentLessonRef, newStudentLesson)
}