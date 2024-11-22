import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getKnowledgeBank = async ({ isAdmin, teacherId, teacherIds }: { isAdmin: boolean, teacherId?: string, teacherIds?: string[] }) => {
    const knowledgeBankRef = collection(db, 'knowledgeBank')

    if (isAdmin) {
        const knowledgeBankDocs = await getDocs(knowledgeBankRef)

        const knowledgeBankData = knowledgeBankDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        return knowledgeBankData
    }
    else if (teacherId) {
        const knowledgeBankQuery = query(knowledgeBankRef, where('teacherId', '==', teacherId))
        const knowledgeBankDocs = await getDocs(knowledgeBankQuery)

        const knowledgeBankData = knowledgeBankDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        return knowledgeBankData
    }
    else if (teacherIds?.length) {
        const knowledgeBankQuery = query(knowledgeBankRef, where('teacherId', 'in', teacherIds))

        const knowledgeBankDocs = await getDocs(knowledgeBankQuery)

        const knowledgeBankData = knowledgeBankDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        return knowledgeBankData
    }
}