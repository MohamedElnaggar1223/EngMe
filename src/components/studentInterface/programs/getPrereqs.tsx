import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"

//@ts-expect-error err
export const getPrereqs = async (program) => {
    const programsDisplay = program.prerequisites?.map(async (prereq: string) => {
        const programRef = doc(db, 'programs', prereq)
        const programData = await getDoc(programRef)
        const programName = {name: programData.data()?.name ?? '', id: programData?.id ?? ''}
        return programName
    })
    const finalDisplay = await Promise.all(programsDisplay || [])
    return finalDisplay
}