import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setTeacherRemovePrereq = async(programId: string, prereq: string) => {
    const programDoc = doc(db, 'programs', programId)

    const programData = await getDoc(programDoc)

    const oldPrereqs = programData.data()?.prerequisites

    //@ts-expect-error program
    const newPrereqs = oldPrereqs.slice().filter(program => program !== prereq)

    const newProgramData = {
        ...programData.data(),
        prerequisites: newPrereqs
    }

    await updateDoc(programDoc, newProgramData)
}