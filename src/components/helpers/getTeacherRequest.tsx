import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherRequest = async(email?: string) => {
    const teacherRequestRef = collection(db, 'teacherRequest')

    if(email)
    {
        const queryTeacherRequest = query(teacherRequestRef, where('email', '==', email))

        const teacherRequestDocs = await getDocs(queryTeacherRequest)

        if(teacherRequestDocs.docs.length)
        {
            const teacherRequestData = {...teacherRequestDocs.docs[0].data(), id: teacherRequestDocs.docs[0].id }
    
            return teacherRequestData
        }
        else return null

    }
    else
    {
        const teacherRequestDocs = await getDocs(teacherRequestRef)

        const teacherRequestData = teacherRequestDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

        return teacherRequestData
    }
}