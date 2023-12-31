import { collection, addDoc, Timestamp, and, query, where, getDocs, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getProgramsData } from "./getProgramsData"

//@ts-expect-error array
export const setStudentRequestProgram = async (studentRequest, studentId: string, programId: string) => {
    if(!studentRequest?.length)
    {
        const studentProgramRef = collection(db, 'studentProgram')
        const studentRequestRef = collection(db, 'studentRequestProgram')
        const ordersRef = collection(db, 'orders')

        const queryOrders = query(ordersRef, and(where('studentId', '==', studentId), where('programId', '==', programId)))
        
        const ordersDocs = await getDocs(queryOrders)

        ordersDocs.docs.length && await deleteDoc(ordersDocs.docs[0].ref)

        const queryStudentProgram = query(studentProgramRef, and(where('studentId', '==', studentId), where('programId', '==', programId)))

        const studentProgramDocs = await getDocs(queryStudentProgram)

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