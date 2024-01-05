import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setDeleteLesson = async (lesson: unknown, course: unknown) => {
    //@ts-expect-error lesson
    const lessonDoc = doc(db, 'lessons', lesson.id)
    //@ts-expect-error lesson
    const courseDoc = doc(db, 'courses', course.id)

    await deleteDoc(lessonDoc)
    await updateDoc(courseDoc, {
        //@ts-expect-error lesson
        lessons: arrayRemove(lesson.id)
    })
}