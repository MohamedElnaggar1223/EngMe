import { collection, query, where, documentId, getDocs } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"

//@ts-expect-error program
export const getCoursesData = async (program) => {
    const coursesRef = collection(db, 'courses')
    const queryRef = query(coursesRef, where(documentId(), 'in', program.courses))

    const coursesDocs = await getDocs(queryRef)
    const coursesArray = coursesDocs.docs.map(doc => ({...doc.data(), id: doc.id})) ?? []

    const orderedCoursesArray = coursesArray.slice().sort((a, b) => {
        //@ts-expect-error createdAt
        const dateA = a.createdAt.toDate();
        //@ts-expect-error createdAt
        const dateB = b.createdAt.toDate();
      
        // Compare the dates for sorting
        return dateA - dateB;
      })

    return orderedCoursesArray
}