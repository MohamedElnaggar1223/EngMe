import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ProgramProps from "../../interfaces/ProgramProps";

export const setDeleteFinalExam = async(version:string, program: ProgramProps, finalExam: unknown) => {
    //@ts-expect-error finalExam
    const finalExamDoc = doc(db, 'finalExams', finalExam.id)

    await deleteDoc(finalExamDoc)

    const programDoc = doc(db, 'programs', program.id)

    await updateDoc(programDoc, { finalExams: {...program.finalExams, [version]: ''} })
}