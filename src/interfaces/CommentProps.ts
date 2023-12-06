import { Timestamp } from "firebase/firestore";

export default interface CommentProps{
    id: string,
    studentId: string,
    programId: string,
    createdAt: Timestamp,
    comment: string
}