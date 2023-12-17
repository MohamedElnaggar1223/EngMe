import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentKnowledgeBankContent = async(studentId: string) => {
    const studentKnowledgeBankContentRef = collection(db, 'studentKnowledgeBank')
    const queryStudentKnowledgeBankContent = query(studentKnowledgeBankContentRef, where('studentId', '==', studentId))

    const studentKnowledgeBankContentDocs = await getDocs(queryStudentKnowledgeBankContent)
    const studentKnowledgeBankContentData = studentKnowledgeBankContentDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentKnowledgeBankContentData
}