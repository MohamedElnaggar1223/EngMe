import { doc, deleteDoc, addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setExamSessionTime = async (examSessionId: string, studentId: string, path: string) => {
    console.log("examSessionId: ", examSessionId)
    console.log("studentId: ", studentId)
    console.log("path: ", path)
    const examSessionDoc = doc(db, 'examSession', examSessionId)
    const addedRedirect = {
        studentId,
        path
    } 

    await deleteDoc(examSessionDoc)
    const redirectCollection = collection(db, 'redirect')
    await addDoc(redirectCollection, addedRedirect)
}