import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setEditExamBankMajor = async (major: string, majorId: string, deleted?: boolean) => {
    const examBankRef = doc(db, 'examBank', majorId)
    
    if(deleted) {
        console.log(majorId)
        const examBankContentRef = collection(db, 'examBankContent')
        const examBankContentQuery = query(examBankContentRef, where('majorId', '==', majorId))
        const examBankContentSnapshot = await getDocs(examBankContentQuery)
        const examBankContentDocs = examBankContentSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))
        await Promise.all(examBankContentDocs)
        await deleteDoc(examBankRef)
    }
    else
    {
        await updateDoc(examBankRef, {
            major: major
        })
    }
}