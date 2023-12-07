import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherTestimonials = async(teacherId: string) => {
    const teacherTestimonialsRef = collection(db, 'studentTeacherTestimonial')
    const queryTeacherTestimonials = query(teacherTestimonialsRef, where('teacherId', '==', teacherId))

    const teacherTestimonialsDocs = await getDocs(queryTeacherTestimonials)
    const teacherTestimonialsData = teacherTestimonialsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return teacherTestimonialsData
}