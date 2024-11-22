import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setNotification } from "./setNotification"

export const setAssessmentData = async (questions: unknown, assessment?: unknown, course?: unknown, order?: number, duration?: number) => {
    if (!duration) {
        throw new Error('Duration is required');
    }

    //@ts-expect-error course
    const programDoc = doc(db, 'programs', course?.programId)

    const programData = await getDoc(programDoc)
    if (assessment) {
        //@ts-expect-error course
        const assessmentDoc = doc(db, 'assessments', assessment.id)

        const updatedAssessment = {
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

        // Convert assessment durations to seconds and update total
        const currentTotalSeconds: number = courseData.data()?.duration || 0;
        //@ts-expect-error assessment
        const oldAssessmentSeconds: number = parseInt(assessment.duration.split(' ')[0]) * 60; // Convert "XX Minutes" to seconds
        const newAssessmentSeconds: number = duration * 60; // Convert new duration to seconds
        const newTotalSeconds: number = currentTotalSeconds - oldAssessmentSeconds + newAssessmentSeconds;

        await updateDoc(courseDoc, { duration: newTotalSeconds })
        await updateDoc(assessmentDoc, updatedAssessment)
        await setNotification(`${programData.data()?.name}'s Assessments have been updated!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
        const updatedAssessmentData = await getDoc(assessmentDoc)
        return { ...updatedAssessmentData.data(), id: updatedAssessmentData.id }
    }
    else {
        if (course) {
            const assessmentsRef = collection(db, 'assessments')

            const newAssessment = {
                title: 'Assessment',
                order,
                questions,
                duration: `${duration} Minutes`,
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id
            }

            const addedAssessment = await addDoc(assessmentsRef, newAssessment)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)
            const courseData = await getDoc(courseDoc)

            // Add new assessment duration (in seconds) to course total
            const currentTotalSeconds: number = courseData.data()?.duration || 0;
            const newAssessmentSeconds: number = duration * 60; // Convert minutes to seconds
            const newTotalSeconds: number = currentTotalSeconds + newAssessmentSeconds;

            const studentProgramsRef = collection(db, 'studentProgram')

            const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

            const studentProgramsData = await getDocs(studentProgramsQuery)

            const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

            const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

            const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

            const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

            const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)

            await updateDoc(courseDoc, {
                assessments: arrayUnion(addedAssessment.id),
                duration: newTotalSeconds
            })
            await setNotification(`New Quiz has been uploaded for ${programData.data()?.name}!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
            const updatedAssessmentData = await getDoc(addedAssessment)
            return { ...updatedAssessmentData.data(), id: updatedAssessmentData.id }
        }
    }
}