import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentProgramFinalExams = async (studentId: string, finalExams: string[]) => {
    const studentFinalExamRef = collection(db, 'studentFinalExam')
    const queryStudentFinalExam = query(studentFinalExamRef, and(where('studentId', '==', studentId), where('finalExamId', 'in', finalExams)))

    const studentFinalExamDocs = await getDocs(queryStudentFinalExam)
    const studentFinalExamData = studentFinalExamDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentFinalExamData
}