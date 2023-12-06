import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentProgramComment = async (studentId: string, programId: string) => {
    const studentProgramComment = collection(db, 'programComments')
    const queryStudentProgramComment = query(studentProgramComment, and(where('studentId', '==', studentId), where('programId', '==', programId)))

    const studentProgramCommentDocs = await getDocs(queryStudentProgramComment)

    const studentProgramCommentData = studentProgramCommentDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentProgramCommentData
}