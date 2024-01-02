import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setTeacherData = async (teacherId: string, name: string, title: string, university: string, image: string) => {
    const teacherDoc = doc(db, 'teachers', teacherId)

    await updateDoc(teacherDoc, {
        name,
        title,
        university,
        image
    })
}