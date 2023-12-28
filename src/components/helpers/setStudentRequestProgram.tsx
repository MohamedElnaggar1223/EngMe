import { collection, addDoc, Timestamp, and, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getProgramsData } from "./getProgramsData"

//@ts-expect-error array
export const setStudentRequestProgram = async (studentRequest, studentId: string, programId: string) => {
    if(!studentRequest?.length)
    {
        const studentProgramRef = collection(db, 'studentProgram')
        const studentRequestRef = collection(db, 'studentRequestProgram')

        const queryStudentProgram = query(studentProgramRef, and(where('studentId', '==', studentId), where('programId', '==', programId)))

        const studentProgramDocs = await getDocs(queryStudentProgram)

        console.log(studentProgramDocs.docs)

        if(studentProgramDocs.docs.length) return

        const newRequest = {
            studentId,
            programId,
            status: 'accepted'
        }

        const programData = await getProgramsData([programId])

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