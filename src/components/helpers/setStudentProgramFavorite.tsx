import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentProgramFavorite = async (studentId: string, programId: string) => {
    const docRef = doc(db, 'students', studentId)

    const studentData = await getDoc(docRef)
    //@ts-expect-error error
    const newFavs = [...studentData.data().favoritePrograms ?? [], programId]

    const newStudent = {...studentData.data(), favoritePrograms: newFavs}

    await updateDoc(docRef, newStudent)
}