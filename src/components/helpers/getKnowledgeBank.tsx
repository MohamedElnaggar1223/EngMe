import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getKnowledgeBank = async() => {
    const knowledgeBankRef = collection(db, 'knowledgeBank')

    const knowledgeBankDocs = await getDocs(knowledgeBankRef)

    const knowledgeBankData = knowledgeBankDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return knowledgeBankData
}