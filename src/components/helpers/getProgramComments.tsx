import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getProgramComments = async (programId: string) => {
    const programCommentsRef = collection(db, 'programComments')
    const queryProgramComments = query(programCommentsRef, where('programId', '==', programId))

    const programCommentsDocs = await getDocs(queryProgramComments)
    const programCommentsData = programCommentsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    const orderedProgramComments = programCommentsData.slice().sort((a, b) => {
        //@ts-expect-error createdAt
        const dateA = a.createdAt.toDate();
        //@ts-expect-error createdAt
        const dateB = b.createdAt.toDate();
        
        // Compare the dates for sorting
        return dateA - dateB;
    })

    return orderedProgramComments
}