import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setTeacherShareProgram = async (teacherShare: string, programId: string) => {
    const programDoc = doc(db, 'programs', programId)

    await updateDoc(programDoc, { teacherShare })
}