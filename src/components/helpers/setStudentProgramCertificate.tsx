import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentProgramCertificate = async(studentProgramCertificateId: string) => {
    const studentProgramCertificateDoc = doc(db, 'studentProgramCertificate', studentProgramCertificateId)

    const updatedCertificate = {
        status: 'accepted'
    }

    await updateDoc(studentProgramCertificateDoc, updatedCertificate)
}