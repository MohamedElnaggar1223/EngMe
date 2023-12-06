import { Timestamp } from "firebase/firestore";

export default interface QuizProps{
    answers: [],
    createdAt: Timestamp,
    id: string,
    quizId: string,
    studentId: string,
    grade: number
}