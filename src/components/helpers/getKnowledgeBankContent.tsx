import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getKnowledgeBankContent = async(majorId: string) => {
    const knowledgeBankContentRef = collection(db, 'knowledgeBankContent')
    const queryKnowledgeBankContent = query(knowledgeBankContentRef, where('majorId', '==', majorId))

    const knowledgeBankContentDocs = await getDocs(queryKnowledgeBankContent)

    const knowledgeBankContentData = knowledgeBankContentDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return knowledgeBankContentData
}