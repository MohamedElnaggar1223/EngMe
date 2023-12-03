import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentLesson = async (studentId: string, lessonId: string) => {
    const studentLessonRef = collection(db, 'studentLesson')

    const newStudentLesson = {
        studentId,
        lessonId
    }

    await addDoc(studentLessonRef, newStudentLesson)
}