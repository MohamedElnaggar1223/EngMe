import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentRequest = async (studentId: string, programId: string) => {
    try
    {
        const studentRequestRef = collection(db, 'studentRequestProgram')
        const queryRef = query(studentRequestRef, and(where('studentId', '==', studentId), where('programId', '==', programId)))
    
        const studentRequestData = await getDocs(queryRef)
        const studentRequest = studentRequestData.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    
        return studentRequest
    }
    catch(e)
    {
        return []
    }
}