import { collection, Timestamp, and, query, where, getDocs, doc, runTransaction } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getProgramsData } from "./getProgramsData"
import { setNotification } from "./setNotification"

export const setStudentRequestProgram = async (studentRequest: string, studentId: string, programId: string) => {
    if (!studentRequest?.length) {
        try {
            // Generate a unique ID for this purchase
            const uniquePurchaseId = `${studentId}_${programId}_${Date.now()}`

            await runTransaction(db, async (transaction) => {
                // Check if student already has this program
                const studentProgramRef = collection(db, 'studentProgram')
                const studentRequestRef = collection(db, 'studentRequestProgram')

                const studentDoc = doc(db, 'students', studentId)
                const studentData = await transaction.get(studentDoc)

                // Get program data for expiry calculation
                const programData = await getProgramsData([programId])
                if (!programData?.[0]) {
                    throw new Error('Program data not found')
                }

                // Use transaction.get() with getDocs() result
                const queryStudentProgram = query(
                    studentProgramRef,
                    and(
                        where('studentId', '==', studentId),
                        where('programId', '==', programId)
                    )
                )
                const studentProgramDocs = await getDocs(queryStudentProgram)
                const existingDocs = await Promise.all(
                    studentProgramDocs.docs.map(doc => transaction.get(doc.ref))
                )

                // If student already has the program, exit early
                if (existingDocs.some(doc => doc.exists())) {
                    console.log('Student already has this program')
                    return
                }

                // Calculate expiry date
                // @ts-expect-error tserror
                const daysToAdd = parseInt(programData[0]?.expiry?.split(" ")[0])
                const currentTime = Timestamp.now().toDate()
                currentTime.setDate(currentTime.getDate() + daysToAdd)
                const endDate = Timestamp.fromDate(currentTime)

                // Create the new program and request documents with idempotency key
                const newRequest = {
                    studentId,
                    programId,
                    status: 'accepted',
                    purchaseId: uniquePurchaseId,
                    createdAt: Timestamp.now(),
                    idempotencyKey: `${studentId}_${programId}` // Add idempotency key
                }

                const studentProgram = {
                    studentId,
                    programId,
                    startDate: Timestamp.now(),
                    endDate,
                    extended: false,
                    purchaseId: uniquePurchaseId,
                    idempotencyKey: `${studentId}_${programId}` // Add idempotency key
                }

                // Add documents within the transaction
                const requestDocRef = doc(studentRequestRef, uniquePurchaseId)
                const programDocRef = doc(studentProgramRef, uniquePurchaseId)

                transaction.set(requestDocRef, newRequest)
                transaction.set(programDocRef, studentProgram)

                if (!studentData.exists()) {
                    throw new Error('Student data not found')
                }

                // Return early to avoid external API calls within transaction
                return { studentData, programData }
            }).then(async (result) => {
                if (!result) return; // Transaction was aborted due to existing program

                const { studentData, programData } = result;

                // Handle external operations outside transaction
                const emailData = {
                    service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    user_id: import.meta.env.VITE_EMAILJS_PUBLIC_ID,
                    template_params: {
                        'studentName': studentData.data()?.name,
                        // @ts-expect-error tserror
                        'programName': programData[0].name,
                        'studentEmail': studentData.data()?.email,
                    }
                }

                await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emailData)
                })

                await setNotification(
                    // @ts-expect-error tserror
                    `${studentData.data()?.name} just purchased ${programData[0].name}`,
                    // @ts-expect-error tserror
                    [programData[0].teacherId],
                    [''],
                    '/'
                )
            })
        } catch (error) {
            console.error('Error in setStudentRequestProgram:', error)
            throw error
        }
    }
}