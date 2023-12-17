import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentKnowledgeBankContent = async(studentId:string, knowledgeBankContentId: string) => {
    const studentKnowledgeBankContentRef = collection(db, 'studentKnowledgeBank')

    const studentKnowledgeBankCreated = {
        studentId,
        knowledgeBankContentId
    }

    await addDoc(studentKnowledgeBankContentRef, studentKnowledgeBankCreated)
}