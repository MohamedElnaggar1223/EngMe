import { collection, query, and, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setLastQuestionExamSessionAssessment = async (studentId: string, assessmentId: string, index: number, answer: unknown) => {
    try
    {
        const examSessionRef = collection(db, 'examSession')
        const studentAssessmentRef = collection(db, 'studentAssessment')

        const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)))
        const queryStudentAssessment = query(studentAssessmentRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)))

        const oldExamSessionData = await getDocs(queryExamSession)
        const oldStudentAssessmentData = await getDocs(queryStudentAssessment)
        console.log(oldStudentAssessmentData.docs.map(doc => doc.data()))

        const orderedOldStudentAssessmentData = oldStudentAssessmentData.docs.slice().sort((a, b) => {
            const dateA = a.data().createdAt.toDate();
            const dateB = b.data().createdAt.toDate();
            // Compare the dates for sorting
            return dateB - dateA;
        })
        console.log(orderedOldStudentAssessmentData)

        const examSessionRefDoc = doc(db, 'examSession', oldExamSessionData.docs[0].id)
        const studentAssessmentRefDoc = doc(db, 'studentAssessment', orderedOldStudentAssessmentData[0].id)
        
        await updateDoc(examSessionRefDoc, {...oldExamSessionData.docs[0].data(), lastQuestion: index + 1})
        if(Array.isArray(answer))
        {
            const newAnswerObject = answer.reduce((obj, value, index) => {
                obj[index] = value;
                return obj;
            }, {})

            const newAnswer = orderedOldStudentAssessmentData[0].data().answers?.length > 0 ? [...orderedOldStudentAssessmentData[0].data().answers, newAnswerObject] : [newAnswerObject]
            await updateDoc(studentAssessmentRefDoc, {...orderedOldStudentAssessmentData[0].data(), answers: newAnswer})
        }
        else
        {
            const newAnswer = orderedOldStudentAssessmentData[0].data().answers?.length > 0 ? [...orderedOldStudentAssessmentData[0].data().answers, answer] : [answer]
            await updateDoc(studentAssessmentRefDoc, {...orderedOldStudentAssessmentData[0].data(), answers: newAnswer})
        }

    }
    catch(e)
    {
        console.error(e)
    }
}