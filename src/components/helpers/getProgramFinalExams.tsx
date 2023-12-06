import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getProgramFinalExams = async (programId: string) => {
    const finalExamsRef = collection(db, 'finalExams')
    const queryFinalExams = query(finalExamsRef, where('programId', '==', programId))

    const finalExamsDocs = await getDocs(queryFinalExams)
    const finalExamsData = finalExamsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return finalExamsData
}