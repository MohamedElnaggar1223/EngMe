import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

//@ts-expect-error iderr
export const getStudentCount = async (id) => {
    const studentProgramRef = collection(db, 'studentProgram')
    const queryRef = query(studentProgramRef, where('programId', '==', id))

    const programsDocs = await getDocs(queryRef)
    const studentCount = programsDocs.docs.length ?? 0
    return studentCount
}