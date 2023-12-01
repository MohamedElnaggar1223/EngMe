import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"

//@ts-expect-error dadd
export const getTeacherDataFromProgram = async (program) => {
    const teacherRef = doc(db, 'teachers', program.teacherId ?? '')
    const teacherData = await getDoc(teacherRef)
    const teacherDetails = {...teacherData.data(), id: teacherData.id}
    return teacherDetails
}