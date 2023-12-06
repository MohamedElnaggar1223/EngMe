import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentProgramCertificate = async(studentId: string) => {
    const studentProgramCertificateRef = collection(db, 'studentProgramCertificate')
    const queryStudentProgramCertificate = query(studentProgramCertificateRef, where('studentId', '==', studentId))

    const studentProgramCertificateDocs = await getDocs(queryStudentProgramCertificate)

    const studentProgramCertificateData = studentProgramCertificateDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentProgramCertificateData
}