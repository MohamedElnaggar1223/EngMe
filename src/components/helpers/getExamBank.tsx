import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getExamBank = async ({ isAdmin, teacherId, teacherIds }: { isAdmin: boolean, teacherId?: string, teacherIds?: string[] }) => {
    const examBankRef = collection(db, 'examBank')
    if (isAdmin) {
        const examBankDocs = await getDocs(examBankRef)

        const examBankData = examBankDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        return examBankData
    }
    else if (teacherId) {
        const examBankQuery = query(examBankRef, where('teacherId', '==', teacherId))

        const examBankDocs = await getDocs(examBankQuery)

        const examBankData = examBankDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        return examBankData
    }
    else if (teacherIds?.length) {
        const examBankQuery = query(examBankRef, where('teacherId', 'in', teacherIds))

        const examBankDocs = await getDocs(examBankQuery)

        const examBankData = examBankDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        return examBankData
    }
}