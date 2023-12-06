import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentProgramCertificate = async(studentProgramCertificateId: string) => {
    const studentProgramCertificateDoc = doc(db, 'studentProgramCertificate', studentProgramCertificateId)

    const studentProgramCertificateData = await getDoc(studentProgramCertificateDoc)

    const updatedCertificate = {
        ...studentProgramCertificateData.data(),
        status: 'accepted'
    }

    await updateDoc(studentProgramCertificateDoc, updatedCertificate)
}