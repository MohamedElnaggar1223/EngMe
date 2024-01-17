import { collection, addDoc, Timestamp, and, query, where, getDocs, deleteDoc, getDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getProgramsData } from "./getProgramsData"
import { setNotification } from "./setNotification"

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
        const daysToAdd = programData[0].expiry.split(" ")[0]

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

        const studentDoc = doc(db, 'students', studentId)

        const studentData = await getDoc(studentDoc)

        const data = {
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_PUBLIC_ID,
            template_params: {
                'studentName': studentData.data()?.name,
                //@ts-expect-error name
                'programName': programData[0].name,
                'studentEmail': studentData.data()?.email,
            }
        }

        console.log(data)

        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        //@ts-expect-error name
        setNotification(`${studentData.data()?.name} just purchased ${programData[0].name}`, [programData[0].teacherId], [''], '/')
    }
}