import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setExamSessionTime = async (examSessionId: string) => {
    const examSessionDoc = doc(db, 'examSession', examSessionId)

    await deleteDoc(examSessionDoc)
}