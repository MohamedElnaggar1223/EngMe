import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getStudentRecommendationLetters = async (studentId: string) => {
    const studentRecommendationLetters = collection(db, 'recommendationLetters')
    const queryStudentRecommendationLetters = query(studentRecommendationLetters, where('studentId', '==', studentId))

    const studentRecommendationLettersDocs = await getDocs(queryStudentRecommendationLetters)

    const studentRecommendationLettersData = studentRecommendationLettersDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    return studentRecommendationLettersData
}