import { collection, query, where, documentId, getDocs } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"

//@ts-expect-error course
export const getAssessmentsData = async (courses) => {
    const assessmentsRef = collection(db, 'assessments')
    //@ts-expect-error course
    const coursesAssessments = courses?.map(course => course?.assessments).flat()
    if(coursesAssessments?.length)
    {
        const queryRef = query(assessmentsRef, where(documentId(), 'in', coursesAssessments))

        const assessmentsDocs = await getDocs(queryRef)
        const assessmentsArray = assessmentsDocs.docs.map(doc => ({...doc.data(), id: doc.id})) ?? []

        const orderedAssessmentsArray = assessmentsArray.slice().sort((a, b) => {
            //@ts-expect-error createdAt
            const dateA = a.createdAt.toDate();
            //@ts-expect-error createdAt
            const dateB = b.createdAt.toDate();
          
            // Compare the dates for sorting
            return dateA - dateB;
          })

        return orderedAssessmentsArray
    }
    else return []
}