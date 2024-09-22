import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getExamBank = async ({ isAdmin, teacherId }: { isAdmin: boolean, teacherId: string }) => {
    const examBankRef = collection(db, 'examBank')
    if(isAdmin)
    {
        const examBankDocs = await getDocs(examBankRef)

        const examBankData = examBankDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

        return examBankData
    }
    else
    {
        const examBankQuery = query(examBankRef, where('teacherId', '==', teacherId))

        const examBankDocs = await getDocs(examBankQuery)

        const examBankData = examBankDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

        return examBankData
    }
}