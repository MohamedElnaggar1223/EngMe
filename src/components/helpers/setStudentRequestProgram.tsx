import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

//@ts-expect-error array
export const setStudentRequestProgram = async (studentRequest, studentId: string, programId: string) => {
    if(!studentRequest?.length)
    {
        const studentRequestRef = collection(db, 'studentRequestProgram')

        const newRequest = {
            studentId,
            programId,
            status: 'pending'
        }

        await addDoc(studentRequestRef, newRequest)
    }
}