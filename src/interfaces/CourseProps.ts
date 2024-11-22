export default interface CourseProps {
    id: string,
    assessments?: string[],
    quizzes?: string[],
    lessons?: string[],
    createdAt: unknown,
    duration: number,
    programId: string
}