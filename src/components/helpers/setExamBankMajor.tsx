import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setExamBankMajor = async(major: string) => {
    const examBankRef = collection(db, 'examBank')
    
    const examBankAdded = {
        major,
        content: []
    }

    await addDoc(examBankRef, examBankAdded)
}