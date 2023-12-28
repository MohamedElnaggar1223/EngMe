import { doc, updateDoc, collection, addDoc, query, where, getDocs, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import ProgramProps from "../../interfaces/ProgramProps"
import { setCourseData } from "./setCourseData"

export const setProgramData = async(teacherId: string, name: string, description: string, category: string, level: string, duration: string, expiry: string, price: string, paused: boolean, prereqName: string, program?: ProgramProps, image?: string) => {
    if(program)
    {
        const programDoc = doc(db, 'programs', program.id)

        let updatedProgram = {
            name,
            description,
            category,
            level,
            duration,
            expiry,
            paused,
            price
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
            price,
            averageRating: 5,
            totalFeedbacks: 0,
            courses: [],
            teacherId,
            teacherShare: '50',
            prerequisites: [],
            image: image ?? '',
            finalExams: {
                'Version 1': '',
                'Version 2': '',
                'Version 3': ''
            }
        }

        if(prereqName.length > 0)
        {
            const prereqAdded = await getPreqReqId(prereqName)
            if(prereqAdded)
            {
                newProgram = {
                    ...newProgram,
                    //@ts-expect-error never
                    prerequisites: [prereqAdded]
                }
            }
        }

        const addedProgram = await addDoc(programsRef, newProgram)

        await setCourseData(addedProgram)
        
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