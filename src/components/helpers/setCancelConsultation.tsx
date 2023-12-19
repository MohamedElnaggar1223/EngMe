import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setCancelConsultation = async(consultationId: string) => {
    const consultationDoc = doc(db, 'consultationSessions', consultationId)

    await deleteDoc(consultationDoc)
}