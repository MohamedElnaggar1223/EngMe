import { collection, documentId, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

//@ts-expect-error course
export const getLessonsData = async (courses) => {
    const lessonsRef = collection(db, 'lessons')
    //@ts-expect-error course
    const coursesLessons = courses?.map(course => course?.lessons).flat()

    if(coursesLessons?.length)
    {
        const queryRef = query(lessonsRef, where(documentId(), 'in', coursesLessons))

        const lessonsDocs = await getDocs(queryRef)
        const lessonsArray = lessonsDocs.docs.map(doc => ({...doc.data(), id: doc.id})) ?? []

        //@ts-expect-error order
        const orderedLessonsArray = lessonsArray.slice().sort((a, b) => a.order - b.order)

        return orderedLessonsArray
    }
    else return []
}