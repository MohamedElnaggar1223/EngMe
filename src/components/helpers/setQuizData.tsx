import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setQuizData = async(questions: unknown, quiz?: unknown, course?: unknown, order?: number) => {
    if(quiz)
    {
        //@ts-expect-error course
        const quizDoc = doc(db, 'quizzes', quiz.id)

        const updatedQuiz = {
            questions
        }

        await updateDoc(quizDoc, updatedQuiz)
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
            const durationAdded = ((30 / 60) + Number(course?.duration?.split(' ')[0])).toFixed(0)

            await updateDoc(courseDoc, { quizzes: arrayUnion(addedQuiz.id), duration: `${durationAdded} Hours` })
        }
    }
}