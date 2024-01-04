import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setDeleteTeacherRequest = async (requestId: string) => {
    const teacherRequestDoc = doc(db, 'teacherRequest', requestId)

    await deleteDoc(teacherRequestDoc)
}