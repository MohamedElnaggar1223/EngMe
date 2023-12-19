import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentGraduatedTeacherPrograms = async(programsId: string[]) => {
    const studentProgramCertificateRef = collection(db, 'studentProgramCertificate')

    const queryStudentProgramCertificate = query(studentProgramCertificateRef, where('programId', 'in', programsId))

    const studentProgramCertificateDocs = await getDocs(queryStudentProgramCertificate)

    return studentProgramCertificateDocs.docs.length
}