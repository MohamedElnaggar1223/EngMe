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

        const examSessionRefDoc = doc(db, 'examSession', oldExamSessionData.docs[0].id)
        const studentAssessmentRefDoc = doc(db, 'studentAssessment', oldStudentAssessmentData.docs[0].id)

        await updateDoc(examSessionRefDoc, {...oldExamSessionData.docs[0].data(), lastQuestion: index + 1})
        const newAnswer = oldStudentAssessmentData.docs[0].data().answers?.length > 0 ? [...oldStudentAssessmentData.docs[0].data().answers, answer] : [answer]
        await updateDoc(studentAssessmentRefDoc, {...oldStudentAssessmentData.docs[0].data(), answers: newAnswer})
    }
    catch(e)
    {
        console.error(e)
    }
}