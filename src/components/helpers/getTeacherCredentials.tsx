import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherCredentials = async(teacherId: string) => {
    const teacherCredentialsRef = collection(db, 'teacherCredentials')
    const queryTeacherCredentials = query(teacherCredentialsRef, where('teacherId', '==', teacherId))

    const teacherCredentialsDocs = await getDocs(queryTeacherCredentials)
    const teacherCredentialsData = teacherCredentialsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return teacherCredentialsData
}