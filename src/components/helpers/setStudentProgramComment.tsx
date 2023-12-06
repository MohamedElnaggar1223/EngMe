import { collection, Timestamp, addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentProgramComment = async (studentId: string, programId: string, comment: string, rating?: number) => {
    const programCommentsRef = collection(db, 'programComments')
    if(rating)
    {
        const programDoc = doc(db, 'programs', programId)
        const programData = await getDoc(programDoc)

        if(programData.exists())
        {
            const currentTotalFeedbacks = programData?.data().totalFeedbacks
            const currentAverageRating = programData?.data().averageRating
            const newTotalFeedbacks = currentTotalFeedbacks + 1
            const newAverageRating = ((currentAverageRating * currentTotalFeedbacks) + rating) / newTotalFeedbacks
    
            const newProgramData = {
                ...programData.data(),
                totalFeedbacks: newTotalFeedbacks,
                averageRating: newAverageRating
            }
    
            await updateDoc(programDoc, newProgramData)
        }
    }
    const newComment = {
        studentId,
        programId,
        createdAt: Timestamp.now(),
        comment,
        rating
    }

    await addDoc(programCommentsRef, newComment)
}