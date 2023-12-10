import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentData = async(studentId: string, updatedData: object) => {
    const studentDoc = doc(db, 'students', studentId)

    const newStudentData = {
        ...updatedData
    }

    await updateDoc(studentDoc, newStudentData)
}