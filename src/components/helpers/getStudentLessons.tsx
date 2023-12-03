import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentLessons = async (studentId: string, lessons: string[]) => {
    const studentLessonRef = collection(db, 'studentLesson')
    const queryRef = query(studentLessonRef, and(where('studentId', '==', studentId), where('lessonId', 'in', lessons)))

    const studentLessonData = await getDocs(queryRef)

    const studentLessonArray = studentLessonData.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentLessonArray
}