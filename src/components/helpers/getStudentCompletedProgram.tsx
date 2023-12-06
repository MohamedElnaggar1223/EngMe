import { collection, query, and, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentCompletedProgram = async (studentId: string, programId: string) => {
    const studentProgramCertificateRef = collection(db, 'studentProgramCertificate')
    const queryStudentProgramCertificate = query(studentProgramCertificateRef, and(where('studentId', '==', studentId), where('programId', '==', programId)))

    const studentProgramCertificateData = await getDocs(queryStudentProgramCertificate)
    
    if(studentProgramCertificateData.docs[0].exists())
    {
        return {...studentProgramCertificateData.docs[0].data(), id: studentProgramCertificateData.docs[0].id}
    }
}