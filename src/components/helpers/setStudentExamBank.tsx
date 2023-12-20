import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentExamBank = async(studentId: string, examBankContentId: string) => {
    const studentExamBankRef = collection(db, 'studentExamBank')

    const newStudentExamBank = {
        studentId,
        examBankContentId
    }

    await addDoc(studentExamBankRef, newStudentExamBank)
}