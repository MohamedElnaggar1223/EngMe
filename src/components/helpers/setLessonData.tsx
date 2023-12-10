import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setLessonData = async(title: string, description: string, lesson?: unknown, course?: unknown, order?: number) => {
    if(lesson)
    {
        //@ts-expect-error course
        const lessonDoc = doc(db, 'lessons', lesson.id)

        const updatedLesson = {
            title,
            description
        }

        await updateDoc(lessonDoc, updatedLesson)
    }
    else
    {
        if(course)
        {
            const lessonsRef = collection(db, 'lessons')

            const newLesson = {
                title,
                order,
                description,
                duration: '1 Hour 55 Minutes',
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id
            }

            const addedLesson = await addDoc(lessonsRef, newLesson)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)

            await updateDoc(courseDoc, { lessons: arrayUnion(addedLesson) })
        }
    }
}