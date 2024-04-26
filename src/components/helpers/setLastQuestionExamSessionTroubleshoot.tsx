import { collection, query, and, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setLastQuestionExamSessionTroubleshoot = async (studentId: string, troubleshootId: string, index: number, answer: unknown) => {
    try
    {
        const examSessionRef = collection(db, 'examSession')
        const studentTroubleshootRef = collection(db, 'studentTroubleshoot')

        const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('troubleshootId', '==', troubleshootId)))
        const queryStudentTroubleshoot = query(studentTroubleshootRef, and(where('studentId', '==', studentId), where('troubleshootId', '==', troubleshootId)))

        const oldExamSessionData = await getDocs(queryExamSession)
        const oldStudentTroubleshootData = await getDocs(queryStudentTroubleshoot)

        const orderedOldStudentTroubleshootData = oldStudentTroubleshootData.docs.slice().sort((a, b) => {
            const dateA = a.data().createdAt.toDate();
            const dateB = b.data().createdAt.toDate();
            // Compare the dates for sorting
            return dateB - dateA;
        })

        const examSessionRefDoc = doc(db, 'examSession', oldExamSessionData.docs[0].id)
        const studentTroubleshootRefDoc = doc(db, 'studentTroubleshoot', orderedOldStudentTroubleshootData[0].id)
        
        await updateDoc(examSessionRefDoc, {...oldExamSessionData.docs[0].data(), lastQuestion: index + 1})
        if(Array.isArray(answer))
        {
            const newAnswerObject = answer.reduce((obj, value, index) => {
                obj[index] = value;
                return obj;
            }, {})

            const newAnswer = orderedOldStudentTroubleshootData[0].data().answers?.length > 0 ? [...orderedOldStudentTroubleshootData[0].data().answers, newAnswerObject] : [newAnswerObject]
            await updateDoc(studentTroubleshootRefDoc, {...orderedOldStudentTroubleshootData[0].data(), answers: newAnswer})
        }
        else
        {
            const newAnswer = orderedOldStudentTroubleshootData[0].data().answers?.length > 0 ? [...orderedOldStudentTroubleshootData[0].data().answers, answer] : [answer]
            await updateDoc(studentTroubleshootRefDoc, {...orderedOldStudentTroubleshootData[0].data(), answers: newAnswer})
        }

    }
    catch(e)
    {
        console.error(e)
    }
}