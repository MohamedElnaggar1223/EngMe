import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setKnowledgeBankMajor = async(major: string) => {
    const knowledgeBankRef = collection(db, 'knowledgeBank')
    
    const knowledgeBankAdded = {
        major,
        content: []
    }

    await addDoc(knowledgeBankRef, knowledgeBankAdded)
}