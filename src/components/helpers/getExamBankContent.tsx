import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getExamBankContent = async(majorId: string) => {
    const examBankContentRef = collection(db, 'examBankContent')
    const queryExamBankContent = query(examBankContentRef, where('majorId', '==', majorId))

    const examBankContentDocs = await getDocs(queryExamBankContent)

    const examBankContentData = examBankContentDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return examBankContentData
}