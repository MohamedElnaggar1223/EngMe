import { collection, query, and, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setLastQuestionExamSessionFinalExam = async (studentId: string, finalExamId: string, index: number, answer: unknown) => {
    try
    {
        const examSessionRef = collection(db, 'examSession')
        const studentFinalExamRef = collection(db, 'studentFinalExam')

        const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('finalExamId', '==', finalExamId)))
        const queryStudentFinalExam = query(studentFinalExamRef, and(where('studentId', '==', studentId), where('finalExamId', '==', finalExamId)))

        const oldExamSessionData = await getDocs(queryExamSession)
        const oldStudentFinalExamData = await getDocs(queryStudentFinalExam)

        const orderedOldStudentFinalExamData = oldStudentFinalExamData.docs.slice().sort((a, b) => {
            const dateA = a.data().createdAt.toDate();
            const dateB = b.data().createdAt.toDate();
          
            // Compare the dates for sorting
            return dateB - dateA;
          })

        const examSessionRefDoc = doc(db, 'examSession', oldExamSessionData.docs[0].id)
        const studentFinalExamRefDoc = doc(db, 'studentFinalExam', orderedOldStudentFinalExamData[0].id)

        await updateDoc(examSessionRefDoc, {...oldExamSessionData.docs[0].data(), lastQuestion: index + 1})
        if(Array.isArray(answer))
        {
            const newAnswerObject = answer.reduce((obj, value, index) => {
                obj[index] = value;
                return obj;
            }, {})

            const newAnswer = orderedOldStudentFinalExamData[0].data().answers?.length > 0 ? [...orderedOldStudentFinalExamData[0].data().answers, newAnswerObject] : [newAnswerObject]
            await updateDoc(studentFinalExamRefDoc, {...orderedOldStudentFinalExamData[0].data(), answers: newAnswer})
        }
        else
        {
            const newAnswer = orderedOldStudentFinalExamData[0].data().answers?.length > 0 ? [...orderedOldStudentFinalExamData[0].data().answers, answer] : [answer]
            await updateDoc(studentFinalExamRefDoc, {...orderedOldStudentFinalExamData[0].data(), answers: newAnswer})
        }
    }
    catch(e)
    {
        console.error(e)
    }
}