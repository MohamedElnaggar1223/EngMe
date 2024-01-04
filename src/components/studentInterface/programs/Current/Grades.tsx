import { Box } from "@mui/material";
import GradeCardQuiz from "./GradeCardQuiz";
import GradeCardAssessment from "./GradeCardAssessment";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
import { getStudentQuizzes } from "../../../helpers/getStudentQuizzes";
import { getAssessmentsData } from "../../../helpers/getAssessmentsData";
import { getStudentAssessments } from "../../../helpers/getStudentAssessments";

export default function Grades(program: ProgramProps) 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: quizzes } = useQuery({
        queryKey: ['quizzes', program.id, 'currentCard', userData.id],
        queryFn: () => getQuizzesData(program.courses),
        enabled: !!program.courses,
        refetchOnMount: true
    })

    const { data: assessments } = useQuery({
        queryKey: ['assessments', program.id, 'currentCard', userData.id],
        queryFn: () => getAssessmentsData(program.courses),
        enabled: !!program.courses,
        refetchOnMount: true
    })

    const { data: studentQuizzes } = useQuery({
        queryKey: ['studentQuizzes', userData?.id, 'currentCard', program.id],
        //@ts-expect-error lesson
        queryFn: () => getStudentQuizzes(userData?.id, quizzes?.map(quiz => quiz.id)),
        enabled: !!quizzes
    })

    const { data: studentAssessment } = useQuery({
        queryKey: ['studentAssessment', userData?.id, 'currentCard', program.id],
        //@ts-expect-error user
        queryFn: () => getStudentAssessments(userData?.id, assessments?.map(assessment => assessment.id)),
        enabled: !!assessments
    })

    //@ts-expect-error quiz
    function quizId({ quizId }){
        return quizId
    }

    //@ts-expect-error quiz
    function assessmentId({ assessmentId }){
        return assessmentId
    }

    //@ts-expect-error quiz
    const organizedQuizzes = Object.groupBy(studentQuizzes, quizId)
    //@ts-expect-error quiz
    const organizedAssessments = Object.groupBy(studentAssessment, assessmentId)

    //@ts-expect-error quiz
    const displayedQuizzes = Object.values(organizedQuizzes).map((quizzesArray, index) => <GradeCardQuiz index={index} quizzesArray={quizzesArray} />)
    //@ts-expect-error quiz
    const displayedAssessments = Object.values(organizedAssessments).map((assessmentsArray, index) => <GradeCardAssessment index={index} assessmentsArray={assessmentsArray} />)

    return (
        <Box
            display='flex'
            gap={4}
            flexWrap='wrap'
            justifyContent='space-between'
        >
            {displayedQuizzes}
            {displayedAssessments}
        </Box>
    )
}
