interface FinalExamProps{
    'Version 1'?: string,
    'Version 2'?: string,
    'Version 3'?: string,
}

export default interface ProgramProps{
    id: string,
    category?: string,
    courses?: string[],
    description?: string,
    duration?: string,
    finalExams?: FinalExamProps,
    image?: string,
    name?: string,
    teacherId?: string,
    totalFeedbacks?: number,
    averageRating?: number,
    prerequisites?: string[],
    paused?: boolean
}

