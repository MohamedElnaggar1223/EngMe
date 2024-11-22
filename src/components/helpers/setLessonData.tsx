import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion, getDocs, query, where, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setNotification } from "./setNotification";

export const setLessonData = async (title: string, description: string, lesson?: unknown, course?: unknown, file?: unknown, fileType?: unknown, duration?: number, order?: number) => {
    const storagePath = fileType === 'video/mp4' ? 'Videos/' : 'Pdfs/';
    // const storageRef = ref(storage, storagePath + file.name);

    //@ts-expect-error course
    const programDoc = doc(db, 'programs', course?.programId)

    const programData = await getDoc(programDoc)

    if (lesson) {
        //@ts-expect-error course
        const lessonDoc = doc(db, 'lessons', lesson.id)

        //@ts-expect-error course
        if (lesson?.duration !== duration) {
            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)
            const courseData = await getDoc(courseDoc)

            // Convert and calculate in seconds
            const currentTotalSeconds: number = courseData.data()?.duration || 0;
            //@ts-expect-error duration
            const oldDurationSeconds: number = lesson?.duration || 0;
            const newDurationSeconds: number = duration || 0;
            const newTotalSeconds: number = currentTotalSeconds - oldDurationSeconds + newDurationSeconds;

            await updateDoc(courseDoc, { duration: newTotalSeconds });
        }

        // await uploadBytes(storageRef, file)

        const updatedLesson = {
            title,
            description,
            content: {
                type: storagePath,
                //@ts-expect-error file
                content: file.name
            },
            duration
        }

        const studentProgramsRef = collection(db, 'studentProgram')

        const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

        const studentProgramsData = await getDocs(studentProgramsQuery)

        const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

        const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

        const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

        const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

        const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)

        await updateDoc(lessonDoc, updatedLesson)
        await setNotification(`${programData.data()?.name}'s Lesson(s) have been updated!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
        const lessonDataUpdated = await getDoc(lessonDoc)
        return { ...lessonDataUpdated.data(), id: lessonDataUpdated.id }
    }
    else {
        if (course) {
            const lessonsRef = collection(db, 'lessons')

            const newLesson = {
                title,
                order,
                description,
                duration,
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id,
                content: {
                    type: storagePath,
                    //@ts-expect-error file
                    content: file.name
                }
            }

            // await uploadBytes(storageRef, file)

            const addedLesson = await addDoc(lessonsRef, newLesson)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)
            const courseData = await getDoc(courseDoc)

            if (duration) {
                // Add new lesson duration (in seconds) to course total
                const currentTotalSeconds: number = courseData.data()?.duration || 0;
                const newTotalSeconds: number = currentTotalSeconds + duration;

                await updateDoc(courseDoc, {
                    lessons: arrayUnion(addedLesson.id),
                    duration: newTotalSeconds
                });
            }
            else {
                await updateDoc(courseDoc, { lessons: arrayUnion(addedLesson.id) })
            }

            const studentProgramsRef = collection(db, 'studentProgram')

            const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

            const studentProgramsData = await getDocs(studentProgramsQuery)

            const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

            const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

            const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

            const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

            const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)

            await setNotification(`New Lesson has been uploaded for ${programData.data()?.name}!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
            const lessonRef = doc(db, 'lessons', addedLesson.id)
            const lessonDataUpdated = await getDoc(lessonRef)
            return { ...lessonDataUpdated.data(), id: lessonDataUpdated.id }
        }
    }
}