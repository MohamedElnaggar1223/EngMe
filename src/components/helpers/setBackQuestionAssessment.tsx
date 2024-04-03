import { collection, query, and, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setBackQuestionAssessment = async (studentId: string, assessmentId: string, index: number) => {
    try
    {
        const examSessionRef = collection(db, 'examSession')

        const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)))

        const oldExamSessionData = await getDocs(queryExamSession)

        const examSessionRefDoc = doc(db, 'examSession', oldExamSessionData.docs[0].id)
        
        await updateDoc(examSessionRefDoc, {...oldExamSessionData.docs[0].data(), lastQuestion: index - 1})
    }
    catch(e)
    {
        console.error(e)
    }
}