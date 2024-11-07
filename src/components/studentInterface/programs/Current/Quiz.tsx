import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";
import ExamQuestionOptions from "./ExamQuestionOptions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebaseConfig";
import { getExamSession } from "../../../helpers/getExamSession";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import ExamQuestionSelects from "./ExamQuestionSelects";
import ExamQuestionTwoOptions from "./ExamQuestionTwoOptions";
import ExamFiveQuestionThreeOptions from "./ExamFiveQuestionThreeOptions";
import { setExamSessionTime } from "../../../helpers/setExamSessionTime";

export default function Quiz() {
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: examSession, isLoading } = useQuery({
        queryKey: ['examSession'],
        queryFn: () => getExamSession(userData.id)
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { id } = useParams()

    const [timeDifference, setTimeDifference] = useState<number>()

    const getQuiz = async (id: string) => {
        const quizRef = doc(db, 'quizzes', id)
        const quizDoc = await getDoc(quizRef)

        const quizData = { ...quizDoc.data(), id: quizDoc.id }

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
            question.type === 'fiveOptions' ?
                question.correctOption.length > 2 ?
                    //@ts-expect-error errrrr
                    <ExamFiveQuestionThreeOptions quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} /> :
                    question.correctOption.length > 1 ?
                        //@ts-expect-error errrrr
                        <ExamQuestionTwoOptions quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} /> :
                        //@ts-expect-error errrrr
                        <ExamQuestionOptions quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} /> :
                //@ts-expect-error errrrr
                <ExamQuestionSelects quizId={quiz.id} question={question} index={index} total={quiz?.questions?.length} />
    )

    const handleSetExamSessionTime = async () => {
        //@ts-expect-error course
        const courseDoc = doc(db, 'courses', quiz?.courseId)
        const courseData = await getDoc(courseDoc)
        //@ts-expect-error course
        await setExamSessionTime(examSession[0]?.id ?? '', userData.id, `/programs/current/${courseData.data()?.programId}`)
        //await queryClient.invalidateQueries({ queryKey: ['examSession'] })
    }

    const { mutate: mutateSession } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['examSession'])

            queryClient.setQueryData(['examSession'], () => {
                return []
            })

            return () => queryClient.setQueryData(['examSession'], previousData)
        },
        mutationFn: () => handleSetExamSessionTime()
    })

    //@ts-expect-error test
    const startTime = (examSession[0]?.startTime)?.toDate()
    //@ts-expect-error test
    const endTime = (examSession[0]?.endTime)?.toDate()

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime && endTime) {
                const difference = endTime - Timestamp.now().toMillis()
                if (difference > 0) {
                    setTimeDifference(difference)
                }
                else {
                    mutateSession()
                    navigate('/')
                }
            }
        }, 1000)

        return () => clearInterval(interval)
        //eslint-disable-next-line
    }, [startTime, endTime, timeDifference])

    if (isLoading) return <></>

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
                <Box
                    boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                    textAlign='center'
                    borderRadius='15px'
                    mr={14}
                    mt={4}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='60px'
                    width='180px'
                >
                    <Typography fontSize={16} fontFamily='Inter' fontWeight={500}>
                        {timeDifference ? Math.floor(timeDifference / (1000 * 60 * 60)).toString().length > 1 ? Math.floor(timeDifference / (1000 * 60 * 60)) : `0${timeDifference && Math.floor(timeDifference / (1000 * 60 * 60))}` : '00'}:{timeDifference ? Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().length > 1 ? Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)) : `0${timeDifference && Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))}` : '00'}:{timeDifference ? Math.floor((timeDifference % (1000 * 60)) / 1000).toString().length > 1 ? Math.floor((timeDifference % (1000 * 60)) / 1000) : `0${timeDifference && Math.floor((timeDifference % (1000 * 60)) / 1000)}` : '00'}
                    </Typography>
                </Box>
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
