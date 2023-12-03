import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getExamSession = async (studentId: string) => {
    const examSession = collection(db, 'examSession')
    const queryExamSession = query(examSession, where('studentId', '==', studentId))

    const examSessionDocs = await getDocs(queryExamSession)

    const examSessionData = examSessionDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return examSessionData
}