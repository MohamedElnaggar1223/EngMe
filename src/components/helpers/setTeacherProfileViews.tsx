import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setTeacherProfileViews = async(teacherId: string) => {
    const teacherDoc = doc(db, 'teachers', teacherId)

    const teacherData = await getDoc(teacherDoc)

    const updatedTeacher = {
        ...teacherData.data(),
        profileViews: teacherData.data()?.profileViews + 1
    }

    await updateDoc(teacherDoc, updatedTeacher)
}