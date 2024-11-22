import { collection, doc, Timestamp, addDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ProgramProps from "../../interfaces/ProgramProps";

export const setCourseData = async (program: ProgramProps) => {
    const coursesRef = collection(db, 'courses')
    const programDoc = doc(db, 'programs', program.id)

    const newCourse = {
        assessments: [],
        lessons: [],
        quizzes: [],
        duration: 0,
        programId: program.id,
        createdAt: Timestamp.now()
    }

    const addedCourse = await addDoc(coursesRef, newCourse)

    await updateDoc(programDoc, { courses: arrayUnion(addedCourse.id) })

    const updatedCourseSnapshot = await getDoc(addedCourse)

    const updatedCourse = { ...updatedCourseSnapshot.data(), id: updatedCourseSnapshot.id }

    return updatedCourse
}