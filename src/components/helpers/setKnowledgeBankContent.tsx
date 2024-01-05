import { doc, collection, addDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../firebase/firebaseConfig"
import { setNotification } from "./setNotification"

export const setKnowledgeBankContent = async(majorId: string, title: string, file: unknown, kbContentId?: string) => {
    if(kbContentId)
    {
        const knowledgeBankRef = doc(db, 'knowledgeBank', majorId)
        const knowledgeBankContentRef = doc(db, 'knowledgeBankContent', kbContentId)

        await updateDoc(knowledgeBankRef, { content: arrayRemove(kbContentId) })
        await deleteDoc(knowledgeBankContentRef)
    }
    else
    {
        const knowledgeBankRef = doc(db, 'knowledgeBank', majorId)
        const knowledgeBankContentRef = collection(db, 'knowledgeBankContent')
    
        const storage = getStorage()
        //@ts-expect-error file
        const storageRef = ref(storage, 'KnowledgeBank/' + file.name)
    
        //@ts-expect-error file
        await uploadBytes(storageRef, file)
    
        const knowledgeBankContentCreated = {
            majorId,
            title,
            type: 'KnowledgeBank/',
            //@ts-expect-error file
            content: file.name
        }
    
        const newknowledgeBankContent = await addDoc(knowledgeBankContentRef, knowledgeBankContentCreated)
    
        await setNotification(`${title} has been added to the Knowledge Bank!`, ['all'])
        await updateDoc(knowledgeBankRef, { content: arrayUnion(newknowledgeBankContent.id) })
    }
}