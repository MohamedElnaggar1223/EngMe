import { doc, updateDoc, collection, addDoc, query, where, getDocs, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import ProgramProps from "../../interfaces/ProgramProps"

export const setProgramData = async(teacherId: string, name: string, description: string, category: string, level: string, duration: string, expiry: string, paused: boolean, prereqName: string, program?: ProgramProps) => {
    if(program?.id)
    {
        const programDoc = doc(db, 'programs', program.id)

        let updatedProgram = {
            name,
            description,
            category,
            level,
            duration,
            expiry,
            paused
        }

        if(prereqName.length > 0)
        {
            const prereqAdded = await getPreqReqId(prereqName)
            if(prereqAdded)
            {
                const newPrereqs = program.prerequisites?.length ? [...program.prerequisites, prereqAdded] : [prereqAdded]
    
                updatedProgram = {
                    ...updatedProgram,
                    //@ts-expect-error prereqs
                    prerequisites: newPrereqs
                }
            }
        }

        await updateDoc(programDoc, updatedProgram)
    }
    else
    {
        const programsRef = collection(db, 'programs')
        
        let newProgram = {
            name,
            description,
            category,
            level,
            duration,
            expiry,
            paused,
            averageRating: 5,
            totalFeedbacks: 0,
            courses: [],
            image: '',
            teacherId,
            prerequisites: ['']
        }

        if(prereqName.length > 0)
        {
            const prereqAdded = await getPreqReqId(prereqName)
            if(prereqAdded)
            {
                newProgram = {
                    ...newProgram,
                    prerequisites: [prereqAdded]
                }
            }
        }

        const addedProgram = await addDoc(programsRef, newProgram)
        
        const teacherDoc = doc(db, 'teachers', teacherId)

        await updateDoc(teacherDoc, { programs: arrayUnion(addedProgram.id) })
    }
}

const getPreqReqId = async(prereqName: string) => {
    const programsRef = collection(db, 'programs')
    const queryPrograms = query(programsRef, where('name', '==', prereqName))

    const prereqsData = await getDocs(queryPrograms)

    if(prereqsData.docs.length > 0)
    {
        const prereqAdded = prereqsData.docs[0].id
        return prereqAdded
    }
    return null
}