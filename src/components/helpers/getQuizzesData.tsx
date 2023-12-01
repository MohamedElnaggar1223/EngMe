import { collection, query, where, documentId, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

//@ts-expect-error course
export const getQuizzesData = async (courses) => {
    const quizzesRef = collection(db, 'quizzes')
    //@ts-expect-error course
    const coursesQuizzes = courses?.map(course => course?.quizzes).flat()
    if(coursesQuizzes?.length)
    {
        const queryRef = query(quizzesRef, where(documentId(), 'in', coursesQuizzes))

        const quizzesDocs = await getDocs(queryRef)
        const quizzesArray = quizzesDocs.docs.map(doc => ({...doc.data(), id: doc.id})) ?? []

        const orderedQuizzesArray = quizzesArray.slice().sort((a, b) => {
            //@ts-expect-error createdAt
            const dateA = a.createdAt.toDate();
            //@ts-expect-error createdAt
            const dateB = b.createdAt.toDate();
          
            // Compare the dates for sorting
            return dateA - dateB;
          })

        return orderedQuizzesArray
    }
    else return []
}