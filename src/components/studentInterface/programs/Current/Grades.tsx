import { Box } from "@mui/material";
import GradeCard from "./GradeCard";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
import { getStudentQuizzes } from "../../../helpers/getStudentQuizzes";

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

    const { data: studentQuizzes } = useQuery({
        queryKey: ['studentQuizzes', userData?.id, 'currentCard', program.id],
        //@ts-expect-error lesson
        queryFn: () => getStudentQuizzes(userData?.id, quizzes?.map(quiz => quiz.id)),
        enabled: !!quizzes
    })

    //@ts-expect-error quiz
    function quizId({ quizId }){
        return quizId
    }

    //@ts-expect-error quiz
    const organizedQuizzes = Object.groupBy(studentQuizzes, quizId)

    //@ts-expect-error quiz
    const displayedQuizzes = Object.values(organizedQuizzes).map((quizzesArray, index) => <GradeCard index={index} quizzesArray={quizzesArray} />)

    return (
        <Box
            display='flex'
            gap={4}
            flexWrap='wrap'
            justifyContent='space-between'
        >
            {displayedQuizzes}
        </Box>
    )
}
