import { collection, documentId, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getProgramsData = async (programs: string[]) => {
    const programsRef = collection(db, 'programs')
    const programQueryRef = query(programsRef, where(documentId(), 'in', programs))
    const programsData = await getDocs(programQueryRef)

    const programsArray = programsData.docs.map(doc => ({...doc.data(), id: doc.id}))

    return programsArray
}