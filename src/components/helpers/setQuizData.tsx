import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setNotification } from "./setNotification"

export const setQuizData = async(questions: unknown, quiz?: unknown, course?: unknown, order?: number) => {
    //@ts-expect-error course
    const programDoc = doc(db, 'programs', course?.programId)

    const programData = await getDoc(programDoc)
    if(quiz)
    {
        //@ts-expect-error course
        const quizDoc = doc(db, 'quizzes', quiz.id)

        const updatedQuiz = {
            questions
        }

        const studentProgramsRef = collection(db, 'studentProgram')

        const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

        const studentProgramsData = await getDocs(studentProgramsQuery)

        const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

        const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

        const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

        const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

        const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)
        
        await updateDoc(quizDoc, updatedQuiz)
        await setNotification(`${programData.data()?.name}'s Quizzes have been updated!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
    }
    else
    {
        if(course)
        {
            const quizzesRef = collection(db, 'quizzes')

            const newQuiz = {
                title: 'Quiz',
                order,
                questions,
                duration: '30 Minutes',
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id
            }

            const addedQuiz = await addDoc(quizzesRef, newQuiz)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)

            //@ts-expect-error duration
            const courseMinutes = (Number(course?.duration?.split(' ')[0]) * 60) + (Number(course?.duration?.split(' ')[4]) / 60) + Number(course?.duration?.split(' ')[2]) + 30
 
            const mins_num = parseFloat(courseMinutes.toFixed(2))
            const hours   = Math.floor(mins_num / 60);
            const minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
            const seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));

            const Hours   = String(hours).length   > 1 ? hours.toString()   : '0' + hours
            const Minutes = String(minutes).length > 1 ? minutes.toString() : '0' + minutes
            const Seconds = String(seconds).length > 1 ? seconds.toString() : '0' + seconds

            const durationAdded = `${Hours} Hours ${Minutes} Minutes ${Seconds} Seconds`

            const studentProgramsRef = collection(db, 'studentProgram')

            const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

            const studentProgramsData = await getDocs(studentProgramsQuery)

            const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

            const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

            const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

            const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

            const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)
            
            await updateDoc(courseDoc, { quizzes: arrayUnion(addedQuiz.id), duration: `${durationAdded}` })
            await setNotification(`New Quiz has been uploaded for ${programData.data()?.name}!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
        }
    }
}