import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ProgramProps from "../../interfaces/ProgramProps";

export const setProgramFinalExam = async(version: string, program: ProgramProps, finalExam?: string, questions?: unknown, duration?: number) => {
    if(finalExam)
    {
        const finalExamDoc = doc(db, 'finalExams', finalExam)

        await updateDoc(finalExamDoc, { questions, duration: `${duration} Minutes`})
    }
    else
    {
        const finalExamsRef = collection(db, 'finalExams')
    
        const newFinalExam = {
            duration: `${duration} Minutes`,
            programId: program.id,
            questions: []
        }
    
        const addedFinalExam = await addDoc(finalExamsRef, newFinalExam)

        const programDoc = doc(db, 'programs', program.id)

        await updateDoc(programDoc, { finalExams: {...program.finalExams, [version]: addedFinalExam.id} })
    }
}