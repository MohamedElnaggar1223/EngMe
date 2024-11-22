import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setNotification } from "./setNotification"

export const setQuizData = async (questions: unknown, quiz?: unknown, course?: unknown, order?: number, duration?: number) => {
    //@ts-expect-error course
    const programDoc = doc(db, 'programs', course?.programId)

    const programData = await getDoc(programDoc)
    if (quiz) {
        //@ts-expect-error course
        const quizDoc = doc(db, 'quizzes', quiz.id)

        const updatedQuiz = {
            duration: `${duration} Minutes`,
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

        //@ts-expect-error course
        const courseDoc = doc(db, 'courses', course.id)
        const courseData = await getDoc(courseDoc)

        // Convert quiz durations to seconds and update total
        if (duration) {
            const currentTotalSeconds = courseData.data()?.duration || 0;
            //@ts-expect-error quiz
            const oldQuizSeconds = parseInt(quiz.duration.split(' ')[0]) * 60; // Convert "XX Minutes" to seconds
            const newQuizSeconds = duration * 60; // Convert new duration to seconds
            const newTotalSeconds = currentTotalSeconds - oldQuizSeconds + newQuizSeconds;

            await updateDoc(courseDoc, { duration: newTotalSeconds })
        }

        await updateDoc(quizDoc, updatedQuiz)
        await setNotification(`${programData.data()?.name}'s Quizzes have been updated!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
        const updatedQuizData = await getDoc(quizDoc)
        return { ...updatedQuizData.data(), id: updatedQuizData.id }
    }
    else {
        if (course) {
            const quizzesRef = collection(db, 'quizzes')

            const newQuiz = {
                title: 'Quiz',
                order,
                questions,
                duration: `${duration} Minutes`,
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id
            }

            const addedQuiz = await addDoc(quizzesRef, newQuiz)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)
            const courseData = await getDoc(courseDoc)

            // Add new quiz duration (in seconds) to course total
            //@ts-expect-error course duration is now in seconds
            let newTotalSeconds = course?.duration || 0;
            if (duration) {
                const currentTotalSeconds = courseData.data()?.duration || 0;
                console.log(currentTotalSeconds)
                const newQuizSeconds = duration * 60; // Convert minutes to seconds
                console.log(newQuizSeconds)
                newTotalSeconds = currentTotalSeconds + newQuizSeconds;
                console.log(newTotalSeconds)
            }

            const studentProgramsRef = collection(db, 'studentProgram')

            const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

            const studentProgramsData = await getDocs(studentProgramsQuery)

            const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

            const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

            const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

            const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

            const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)


            await updateDoc(courseDoc, {
                quizzes: arrayUnion(addedQuiz.id),
                duration: newTotalSeconds
            })
            await setNotification(`New Quiz has been uploaded for ${programData.data()?.name}!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
            const updatedQuizData = await getDoc(addedQuiz)
            return { ...updatedQuizData.data(), id: updatedQuizData.id }
        }
    }
}