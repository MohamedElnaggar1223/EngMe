import { collection, query, and, where, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ProgramProps from "../../interfaces/ProgramProps";

export const setStudentRepurchaseProgram = async(studentId: string, program: ProgramProps) => {
    const studentProgramRef = collection(db, 'studentProgram')
    const queryStudentProgram = query(studentProgramRef, and(where('studentId', '==', studentId), where('programId', '==', program.id)))

    const studentProgramDocs = await getDocs(queryStudentProgram)

    if(studentProgramDocs.docs.length)
    {
        //@ts-expect-error date
        const daysToAdd = program.duration.split(" ")[0]
    
        const currentTime = Timestamp.now().toDate()
        currentTime.setDate(currentTime.getDate() + Number(daysToAdd))
    
        const endDate = Timestamp.fromDate(currentTime)
    
        const studentProgramUpdated = {
            startDate: Timestamp.now(),
            endDate
        }
    
        await updateDoc(studentProgramDocs.docs[0].ref, studentProgramUpdated)
    }

}