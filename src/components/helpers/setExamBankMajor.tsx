import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setExamBankMajor = async(major: string, teacherId: string) => {
    const examBankRef = collection(db, 'examBank')
    
    const examBankAdded = {
        major,
        content: [],
        teacherId
    }

    await addDoc(examBankRef, examBankAdded)
}