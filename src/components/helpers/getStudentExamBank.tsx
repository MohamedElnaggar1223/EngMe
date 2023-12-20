import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentExamBank = async(studentId: string) => {
    const studentExamBankRef = collection(db, 'studentExamBank')
    const queryStudentExamBank = query(studentExamBankRef, where('studentId', '==', studentId))

    const studentExamBankDocs = await getDocs(queryStudentExamBank)

    const studentExamBankData = studentExamBankDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentExamBankData
}