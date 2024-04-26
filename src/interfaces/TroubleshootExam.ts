export type TroubleshootExam = {
    id: string
    studentId: string
    questions: {
        question: string
        type: string
        options: string[]
        correctOption: string | string[]
        image?: string
    }[] & {
        question: string
        type: string
        firstCorrect: string
        secondCorrect: string
        thirdCorrect: string
        fourthCorrect: string
        firstLabel: string
        secondLabel: string
        thirdLabel: string
        fourthLabel: string
        image?: string
    }[]
}