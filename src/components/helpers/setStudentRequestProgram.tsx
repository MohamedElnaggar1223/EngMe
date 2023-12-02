import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getProgramsData } from "./getProgramsData"

//@ts-expect-error array
export const setStudentRequestProgram = async (studentRequest, studentId: string, programId: string) => {
    if(!studentRequest?.length)
    {
        const studentRequestRef = collection(db, 'studentRequestProgram')

        const newRequest = {
            studentId,
            programId,
            status: 'accepted'
        }

        const programData = await getProgramsData([programId])
        const studentProgramRef = collection(db, 'studentProgram')

        

        await addDoc(studentRequestRef, newRequest)
    }
}