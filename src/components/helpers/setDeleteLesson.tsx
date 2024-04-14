import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setDeleteLesson = async (lesson: unknown, course: unknown) => {
    //@ts-expect-error lesson
    const lessonDoc = doc(db, 'lessons', lesson.id)
    //@ts-expect-error lesson
    const courseDoc = doc(db, 'courses', course.id)

    //@ts-expect-error duration
    if(lesson?.duration)
    {
        //@ts-expect-error duration
        const courseDuration = course?.duration
    
        const totalCourseDuration = parseInt(courseDuration?.split(' ')[0]) * 3600 + parseInt(courseDuration?.split(' ')[2]) * 60 + parseInt(courseDuration?.split(' ')[4])

        //@ts-expect-error duration
        const newDuration = (totalCourseDuration - lesson?.duration).toString()
        
        const sec_num = parseInt(newDuration, 10)
        const hours_duration = Math.floor(sec_num / 3600);
        const minutes_duration = Math.floor((sec_num - (hours_duration * 3600)) / 60)
        const seconds_duration = sec_num - (hours_duration * 3600) - (minutes_duration * 60);

        const finalDuration = `${hours_duration} Hours ${minutes_duration} Minutes ${seconds_duration} Seconds`
        await updateDoc(courseDoc, { duration: `${finalDuration}` })
    }

    await deleteDoc(lessonDoc)
    await updateDoc(courseDoc, {
        //@ts-expect-error lesson
        lessons: arrayRemove(lesson.id)
    })

    return { success: true }
}