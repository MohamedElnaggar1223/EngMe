import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentData = async(studentId: string, updatedData: object) => {
    const studentDoc = doc(db, 'students', studentId)

    const studentData = await getDoc(studentDoc)

    const newStudentData = {
        ...studentData.data(),
        ...updatedData
    }

    await updateDoc(studentDoc, newStudentData)
}