import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentAssessments = async (studentId: string, assessments: string[]) => {
    const studentAssessmentRef = collection(db, 'studentAssessment')
    const queryRef = query(studentAssessmentRef, and(where('studentId', '==', studentId), where('assessmentId', 'in', assessments)))

    const studentAssessmentData = await getDocs(queryRef)

    const studentAssessmentArray = studentAssessmentData.docs.map(doc => ({...doc.data(), id: doc.id}))

    const orderedCoursesArray = studentAssessmentArray.slice().sort((a, b) => {
        //@ts-expect-error createdAt
        const dateA = a.createdAt.toDate();
        //@ts-expect-error createdAt
        const dateB = b.createdAt.toDate();
      
        // Compare the dates for sorting
        return dateB - dateA;
      })

    return orderedCoursesArray
}