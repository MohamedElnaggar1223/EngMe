import { doc, deleteDoc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ProgramProps from "../../interfaces/ProgramProps";

export const setDeleteFinalExam = async(version:string, program: ProgramProps, finalExam: unknown) => {
    //@ts-expect-error finalExam
    const finalExamDoc = doc(db, 'finalExams', finalExam.id)
    const studentFinalExam = collection(db, 'studentFinalExam')
    //@ts-expect-error finalExam
    const queryStudentFinalExam = query(studentFinalExam, where('finalExamId', '==', finalExam.id))

    const studentFinalExamDocs = await getDocs(queryStudentFinalExam)

    const deletePromises = studentFinalExamDocs.docs.map(async (doc) => await deleteDoc(doc.ref))

    await Promise.all(deletePromises)

    await deleteDoc(finalExamDoc)

    const programDoc = doc(db, 'programs', program.id)

    await updateDoc(programDoc, { finalExams: {...program.finalExams, [version]: ''} })
}