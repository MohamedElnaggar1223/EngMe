import { collection, addDoc, Timestamp } from "firebase/firestore"
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

        //@ts-expect-error date
        const daysToAdd = programData[0].duration.split(" ")[0]

        const currentTime = Timestamp.now().toDate()
        currentTime.setDate(currentTime.getDate() + Number(daysToAdd))

        const endDate = Timestamp.fromDate(currentTime)

        const studentProgram = {
            studentId,
            programId,
            startDate: Timestamp.now(),
            endDate
        }

        await addDoc(studentRequestRef, newRequest)
        await addDoc(studentProgramRef, studentProgram)
    }
}