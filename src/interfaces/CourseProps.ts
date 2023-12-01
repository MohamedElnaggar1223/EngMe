export default interface CourseProps{
    id: string,
    assessments?: string[],
    quizzes?: string[],
    lessons?: string[],
    createdAt: unknown,
    duration: string,
    programId: string
}