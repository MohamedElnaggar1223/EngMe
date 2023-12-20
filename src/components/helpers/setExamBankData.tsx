import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setExamBankData = async(examBank: { id: string, questions: [] }, questions: []) => {
    const examBankContentRef = doc(db, 'examBankContent', examBank.id)

    await updateDoc(examBankContentRef, { questions })
}