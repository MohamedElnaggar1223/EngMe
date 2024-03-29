import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { AuthContext } from "../../../authentication/auth/AuthProvider"
import { setLastQuestionExamSessionAssessment } from "../../../helpers/setLastQuestionExamSessionAssessment"
import { setSubmitExamSessionAssessment } from "../../../helpers/setSubmitExamSessionAssessment"
import { useNavigate } from "react-router-dom"
import { setLastQuestionExamSessionQuiz } from "../../../helpers/setLastQuestionExamSessionQuiz"
import { setSubmitExamSessionQuiz } from "../../../helpers/setSubmitExamSessionQuiz"
import Box from "@mui/material/Box"
import { setLastQuestionExamSessionFinalExam } from "../../../helpers/setLastQuestionExamSessionFinalExam"
import { setSubmitExamSessionFinalExam } from "../../../helpers/setSubmitExamSessionFinalExam"

interface Question{
    options: string[],
    question: string,
    image?: string
}

interface ExamQuestionProps{
    question: Question,
    index: number,
    total: number,
    assessmentId?: string,
    quizId?: string,
    finalExamId?: string
}

export default function ExamQuestionOptions({ finalExamId, quizId, assessmentId, question, index, total }: ExamQuestionProps)
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState(0)

    const navigate = useNavigate()

    const handleSetLastQuestionExamSession = async () => {
        if(assessmentId)
        {
            await setLastQuestionExamSessionAssessment(userData.id, assessmentId, index, selectedOption)
        }
        else if(quizId)
        {
            await setLastQuestionExamSessionQuiz(userData.id, quizId, index, selectedOption)
        }
        else if(finalExamId)
        {
            await setLastQuestionExamSessionFinalExam(userData.id, finalExamId, index, selectedOption)
        }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
    }

    const handleSubmitExamSession = async () => {
        if(assessmentId)
        {
            await setLastQuestionExamSessionAssessment(userData.id, assessmentId, index, selectedOption)
            await setSubmitExamSessionAssessment(userData.id, assessmentId)
        }
        else if(quizId)
        {
            await setLastQuestionExamSessionQuiz(userData.id, quizId, index, selectedOption)
            await setSubmitExamSessionQuiz(userData.id, quizId)
        }
        else if(finalExamId)
        {
            await setLastQuestionExamSessionFinalExam(userData.id, finalExamId, index, selectedOption)
            await setSubmitExamSessionFinalExam(userData.id, finalExamId)
        }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
        navigate('/')
    }

    const { mutate: mutateLastQuestionSession } = useMutation({
        onMutate: () => {
            // const previousData = queryClient.getQueryData(['examSession'])

            // queryClient.setQueryData(['examSession'], (oldData: unknown) => {
            //     //@ts-expect-error unknown
            //     const oldDataArray = oldData[0]
            //     return {...oldDataArray, lastQuestion: oldDataArray.lastQuestion + 1}
            // })

            // return () => queryClient.setQueryData(['examSession'], previousData)
        },
        mutationFn: () => handleSetLastQuestionExamSession()
    })

    const { mutate: mutateSubmitExamSession } = useMutation({
        onSuccess: async () => {
            await queryClient.setQueryData(['examSession'], [])
        },
        mutationFn: () => handleSubmitExamSession()
    })

    const displayedOptions = question.options.map((option, index) => (
        <Box
            boxShadow={selectedOption === index ? '0px 0px 0px 5px rgba(255,126,0,1)' :'0px 0px 0px 1px rgba(0,0,0,1)'}
            borderRadius='10px'
            sx={{
                textIndent: '25px',
                cursor: 'pointer'
            }}
            width='790px'
            py={2}
            onClick={selectedOption === index ? () => setSelectedOption(-1) : () => setSelectedOption(index)}
        >
            <Typography>{option}</Typography>
        </Box>
    ))

    return (
        <Stack
            direction='column'
            gap={4}
            flex={1}
            alignItems='center'
            mt={6}
        >
            {
                question?.image &&
                <img src={question?.image} height='225px' />
            }
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                // alignSelf='stretch'
                // mx={14}
                width='760px'
            >
                <Typography></Typography>
                <Typography>Q{index + 1}: {question.question}</Typography>
                <Typography sx={{ justifySelf: 'flex-end' }}>{index + 1}/{total}</Typography>
            </Stack>
            <Stack 
                flex={1}
                gap={4}
            >
               {displayedOptions}
            </Stack>
            <Stack
                direction='row'
                gap={2}
            >
                <Button
                    sx={{
                        width: '180px',
                        height: '54px',
                        background: '#FEF4EB',
                        color: '#000',
                        fontFamily: 'Inter',
                        fontSize: 14,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '0px',
                        borderRadius: '15px',
                        '&:hover': {
                            background: '#FEF4EB',
                            opacity: 1
                        },
                        marginBottom: 3
                    }}
                    disabled={true}
                    // disabled={end}
                >
                    Skip
                </Button>
                {
                    index + 1 === total ?
                    <Button
                        sx={{
                            width: '180px',
                            height: '54px',
                            background: '#9D9D9D',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '0px',
                            borderRadius: '15px',
                            '&:hover': {
                                background: '#9D9D9D',
                                opacity: 1
                            },
                            marginBottom: 3
                        }}
                        onClick={() => mutateSubmitExamSession()}
                    >
                        Submit
                    </Button>
                    :
                    <Button
                        sx={{
                            width: '180px',
                            height: '54px',
                            background: '#9D9D9D',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '0px',
                            borderRadius: '15px',
                            '&:hover': {
                                background: '#9D9D9D',
                                opacity: 1
                            },
                            marginBottom: 3
                        }}
                        onClick={() => mutateLastQuestionSession()}
                    >
                        Next
                    </Button>
                }
            </Stack>
        </Stack>
    )
}
