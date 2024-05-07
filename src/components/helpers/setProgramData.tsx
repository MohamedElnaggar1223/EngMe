import { doc, updateDoc, collection, addDoc, query, where, getDocs, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import ProgramProps from "../../interfaces/ProgramProps"
import { setCourseData } from "./setCourseData"
import { setNotification } from "./setNotification"

export const setProgramData = async(teacherId: string, name: string, description: string, category: string, level: string, duration: string, expiry: string, price: string, paused: boolean, examBank: boolean, knowledgeBank: boolean, prereqName: string, program?: ProgramProps, image?: string, discount?: number) => {
    if(program)
    {
        const programDoc = doc(db, 'programs', program.id)

        let updatedProgram = {
            name,
            description,
            category,
            level,
            duration: duration.split(" ").length > 1 && duration.split(" ")[1] === "Hours" ? duration : `${duration} Hours`,
            expiry: expiry.split(" ").length > 1 && expiry.split(" ")[1] === "Days" ? expiry : `${expiry} Days`,
            paused,
            image,
            price,
            discount,
            examBank,
            knowledgeBank
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

        const studentProgramsRef = collection(db, 'studentProgram')

        const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', program.id))

        const studentProgramsData = await getDocs(studentProgramsQuery)

        const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

        const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

        const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', program.teacherId))

        const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

        const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)

        await updateDoc(programDoc, updatedProgram)
        await setNotification(`${program.name}'s details has been updated!`, [...studentPrograms, program.teacherId], [...studentFollowTeacher], `/programs/current/${program.id}`)
    }
    else
    {
        const programsRef = collection(db, 'programs')
        
        let newProgram = {
            name,
            description,
            category,
            level,
            duration: duration.split(" ").length > 1 && duration.split(" ")[1] === "Hours" ? duration : `${duration} Hours`,
            expiry: expiry.split(" ").length > 1 && expiry.split(" ")[1] === "Days" ? expiry : `${expiry} Days`,
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
            },
            discount: discount ?? 0,
            examBank,
            knowledgeBank
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