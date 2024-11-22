import { doc, deleteDoc, updateDoc, arrayRemove, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setDeleteLesson = async (lesson: unknown, course: unknown) => {
    //@ts-expect-error lesson
    const lessonDoc = doc(db, 'lessons', lesson.id)
    //@ts-expect-error lesson
    const courseDoc = doc(db, 'courses', course.id)
    const courseData = await getDoc(courseDoc)

    //@ts-expect-error duration
    if (lesson?.duration) {
        // Course duration is now stored in seconds directly
        const currentTotalSeconds: number = courseData.data()?.duration || 0;
        //@ts-expect-error duration - lesson duration is already in seconds
        const lessonSeconds: number = lesson.duration;
        const newTotalSeconds: number = currentTotalSeconds - lessonSeconds;

        await updateDoc(courseDoc, { duration: newTotalSeconds })
    }

    await deleteDoc(lessonDoc)
    await updateDoc(courseDoc, {
        //@ts-expect-error lesson
        lessons: arrayRemove(lesson.id)
    })

    return { success: true }
}