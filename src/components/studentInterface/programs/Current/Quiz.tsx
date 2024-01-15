import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import ExamQuestionOptions from "./ExamQuestionOptions";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebaseConfig";
import { getExamSession } from "../../../helpers/getExamSession";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import ExamQuestionSelects from "./ExamQuestionSelects";
import ExamQuestionTwoOptions from "./ExamQuestionTwoOptions";

export default function Quiz() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: examSession, isLoading } = useQuery({
        queryKey: ['examSession'],
        queryFn: () => getExamSession(userData.id)
    })

    const { id } = useParams()

    const getQuiz = async (id: string) => {
        const quizRef = doc(db, 'quizzes', id)
        const quizDoc = await getDoc(quizRef)

        const quizData = {...quizDoc.data(), id: quizDoc.id}

        return quizData
    }

    const { data: quiz } = useQuery({
        queryKey: ['examSessionQuiz'],
        queryFn: () => getQuiz(id ?? '')
    })
    //@ts-expect-error errrrr
    const displayedQuestions = quiz?.questions?.map((question, index) => 
        question.type === 'options' ?
        question.correctOption.length > 1 ?
        //@ts-expect-error errrrr
        <ExamQuestionTwoOptions quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} /> :
        //@ts-expect-error errrrr
        <ExamQuestionOptions quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} /> :
        //@ts-expect-error errrrr
        <ExamQuestionSelects quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} />
    )

    if(isLoading) return <></>

    return (
        <Box
            width='100%'
        >
            <Stack
                justifyContent='space-between'
                direction='row'
            >
                <Stack
                    direction='column'
                    bgcolor='#D0EBFC'
                    px={12}
                    py={4}
                >
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={800}>Quiz</Typography>
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={600}>Course 3</Typography>
                </Stack>
            </Stack>
            <Box
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                {
                    //@ts-expect-error lastQuestion
                    displayedQuestions?.length && displayedQuestions[Number(examSession[0]?.lastQuestion)]
                }
            </Box>
        </Box>
    )
}
