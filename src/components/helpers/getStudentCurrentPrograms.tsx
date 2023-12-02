import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getProgramsData } from "./getProgramsData"

export const getStudentCurrentPrograms = async (studentId: string) => {
    const studentProgramRef = collection(db, 'studentProgram')
    const queryStudentProgram = query(studentProgramRef, where('studentId', '==', studentId))

    const studentProgramData = await getDocs(queryStudentProgram)
    const programsIdsArray = studentProgramData.docs.map(doc => doc.data().programId)

    const programsArray = await getProgramsData(programsIdsArray)

    const finalArray = programsArray.map(program => {
        const studentProgram = studentProgramData.docs.find(doc => doc.data().programId === program.id)
        return new Date() > studentProgram?.data().endDate.toDate() ? {...program, expired: true} : {...program, expired: false}
    })
    
    return finalArray
}