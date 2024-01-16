import { collection, query, and, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ProgramProps from "../../interfaces/ProgramProps";

export const setStudentRepurchaseProgram = async(studentId: string, program: ProgramProps) => {
    const studentProgramRef = collection(db, 'studentProgram')
    const studentRequestProgramRef = collection(db, 'studentRequestProgram')
    const queryStudentProgram = query(studentProgramRef, and(where('studentId', '==', studentId), where('programId', '==', program.id)))
    const queryStudentReuqestProgram = query(studentRequestProgramRef, and(where('studentId', '==', studentId), where('programId', '==', program.id)))

    const studentProgramDocs = await getDocs(queryStudentProgram)
    const studentReuqestProgramDocs = await getDocs(queryStudentReuqestProgram)

    if(studentProgramDocs.docs.length) await deleteDoc(studentProgramDocs.docs[0].ref)
    if(studentReuqestProgramDocs.docs.length) await deleteDoc(studentReuqestProgramDocs.docs[0].ref)
}