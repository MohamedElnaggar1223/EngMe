import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getPrograms = async () => {
    const programsRef = collection(db, 'programs')

    const programsDocs = await getDocs(programsRef)

    const programsData = programsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return programsData
}