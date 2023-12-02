import { where, query, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'

export const getStudentCompletedPrograms = async (studentId: string) => {
    const studentCertificateRef = collection(db, 'studentProgramCertificate')
    const queryData = query(studentCertificateRef, where('studentId', '==', studentId))

    const studentCertificateData = await getDocs(queryData)
    const studentCertificateArray = studentCertificateData.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentCertificateArray
}