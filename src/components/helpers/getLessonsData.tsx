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

        const orderedLessonsArray = lessonsArray.slice().sort((a, b) => {
            //@ts-expect-error createdAt
            const dateA = a.createdAt.toDate();
            //@ts-expect-error createdAt
            const dateB = b.createdAt.toDate();
          
            // Compare the dates for sorting
            return dateA - dateB;
          })

        return orderedLessonsArray
    }
    else return []
}