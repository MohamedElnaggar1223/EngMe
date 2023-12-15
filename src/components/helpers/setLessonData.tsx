import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getStorage, ref, uploadBytes } from "firebase/storage"

export const setLessonData = async(title: string, description: string, lesson?: unknown, course?: unknown, file?: unknown, fileType?: unknown, order?: number) => {
    console.log(title, description, lesson, course)
    if(lesson)
    {
        //@ts-expect-error course
        const lessonDoc = doc(db, 'lessons', lesson.id)

        const storage = getStorage();
        const storagePath = fileType === 'video/mp4' ? 'Videos/' : 'Pdfs/';
        //@ts-expect-error file
        const storageRef = ref(storage, storagePath + file.name);

        //@ts-expect-error file
        await uploadBytes(storageRef, file)

        const updatedLesson = {
            title,
            description,
            content: {
                type: storagePath,
                //@ts-expect-error file
                content: file.name
            }
        }

        await updateDoc(lessonDoc, updatedLesson)
    }
    else
    {
        console.log(course)
        if(course)
        {
            console.log('hello')
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

            //@ts-expect-error duration
            const durationAdded = ((115 / 60) + Number(course?.duration?.split(' ')[0])).toFixed(0)

            await updateDoc(courseDoc, { lessons: arrayUnion(addedLesson.id), duration: `${durationAdded} Hours` })
        }
    }
}