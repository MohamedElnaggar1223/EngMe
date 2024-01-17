import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setEditKnowledgeBankMajor = async (major: string, majorId: string, deleted?: boolean) => {
    const knowledgeBankRef = doc(db, 'knowledgeBank', majorId)

    if(deleted) {
        const knowledgeBankContentRef = collection(db, 'knowledgeBankContent')
        const knowledgeBankContentQuery = query(knowledgeBankContentRef, where('majorId', '==', majorId))
        const knowledgeBankContentSnapshot = await getDocs(knowledgeBankContentQuery)
        const knowledgeBankContentDocs = knowledgeBankContentSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))
        await Promise.all(knowledgeBankContentDocs)
        await deleteDoc(knowledgeBankRef)
    }
    else
    {
        await updateDoc(knowledgeBankRef, {
            major: major
        })
    }
}