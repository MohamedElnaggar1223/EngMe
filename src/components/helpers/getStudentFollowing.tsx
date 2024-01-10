import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentFollowing = async (studentId: string) => {
    const studentFollowing = collection(db, 'studentFollowTeacher')
    const queryStudentFollowing = query(studentFollowing, where('studentId', '==', studentId))

    const studentFollowingDocs = await getDocs(queryStudentFollowing)

    const studentFollowingData = studentFollowingDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentFollowingData
}