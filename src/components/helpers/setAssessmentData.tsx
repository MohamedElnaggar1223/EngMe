import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setAssessmentData = async(questions: unknown, assessment?: unknown, course?: unknown, order?: number) => {
    if(assessment)
    {
        //@ts-expect-error course
        const assessmentDoc = doc(db, 'assessments', assessment.id)

        const updatedAssessment = {
            questions
        }

        await updateDoc(assessmentDoc, updatedAssessment)
    }
    else
    {
        if(course)
        {
            const assessmentsRef = collection(db, 'assessments')

            const newAssessment = {
                title: 'Assessment',
                order,
                questions,
                duration: '30 Minutes',
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id
            }

            const addedAssessment = await addDoc(assessmentsRef, newAssessment)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)

            await updateDoc(courseDoc, { assessments: arrayUnion(addedAssessment) })
        }
    }
}