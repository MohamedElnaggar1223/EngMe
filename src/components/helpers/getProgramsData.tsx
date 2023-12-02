import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getProgramsData = async (programs: string[]) => {
    const programsDisplay = programs.map(async (prereq: string) => {
        const programRef = doc(db, 'programs', prereq)
        const programData = await getDoc(programRef)
        const programName = {...programData.data(), id: programData?.id ?? ''}
        return programName
    })
    const finalDisplay = await Promise.all(programsDisplay || [])
    return finalDisplay
}