import { where, query, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { getProgramsData } from './getProgramsData'

export const getStudentCompletedPrograms = async (studentId: string) => {
    const studentCertificateRef = collection(db, 'studentProgramCertificate')
    const queryData = query(studentCertificateRef, where('studentId', '==', studentId))

    const studentCertificateData = await getDocs(queryData)
    const studentCertificateProgramsArray = studentCertificateData.docs.map(doc => doc.data().programId)

    const programsData = await getProgramsData(studentCertificateProgramsArray)

    return programsData
}