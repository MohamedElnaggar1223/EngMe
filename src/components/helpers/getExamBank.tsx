import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getExamBank = async() => {
    const examBankRef = collection(db, 'examBank')

    const examBankDocs = await getDocs(examBankRef)

    const examBankData = examBankDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return examBankData
}