import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setRemoveTeacherCredential = async(id: string) => {
    const teacherCredentialRef = doc(db, 'teacherCredentials', id)
    
    await deleteDoc(teacherCredentialRef)
}