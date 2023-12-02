import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentProgramFavorite = async (studentId: string, programId: string) => {
    const docRef = doc(db, 'students', studentId)

    const studentData = await getDoc(docRef)
    //@ts-expect-error data
    const oldFavs = studentData?.data().favoritePrograms ?? []
    let newFavs
    if(oldFavs?.length)
    {
        //@ts-expect-error anytype
        newFavs = oldFavs.includes(programId) ? oldFavs.slice().filter(fav => fav !== programId) : [...oldFavs, programId]
    }
    else
    {
        newFavs = [programId]
    }

    const newStudent = {...studentData.data(), favoritePrograms: newFavs}

    await updateDoc(docRef, newStudent)
}