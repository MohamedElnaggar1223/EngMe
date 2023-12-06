import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";
import ExamQuestionOptions from "./ExamQuestionOptions";
// import ExamQuestionSelects from "./ExamQuestionSelects";
// import ExamQuestionPic from "./ExamQuestionPic";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { getExamSession } from "../../../helpers/getExamSession";
import { setExamSessionTime } from "../../../helpers/setExamSessionTime";

export default function Assessment() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const [timeDifference, setTimeDifference] = useState<number>()

    const { data: examSession, isLoading } = useQuery({
        queryKey: ['examSession'],
        queryFn: () => getExamSession(userData.id)
    })

    const handleSetExamSessionTime = async () => {
        //@ts-expect-error session
        await setExamSessionTime(examSession[0]?.id ?? '')
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

    // const [index, setIndex] = useState(Number(localStorage.getItem('index')) || 0)
    // const [questions, setQuestions] = useState<number[]>([])
    

    const { id } = useParams()

    const getAssessment = async (id: string) => {
        const assessmentRef = doc(db, 'assessments', id)
        const assessmentDoc = await getDoc(assessmentRef)

        const assessmentData = {...assessmentDoc.data(), id: assessmentDoc.id}

        return assessmentData
    }

    const { data: assessment } = useQuery({
        queryKey: ['examSessionAssessment'],
        queryFn: () => getAssessment(id ?? '')
    })

    // console.log(assessment)

    useEffect(() => {
        const interval = setInterval(() => {
            if(startTime && endTime)
            {
                const difference = endTime - Timestamp.now().toMillis()
                if(difference > 0)
                {
                    setTimeDifference(difference)
                }
                else
                {
                    mutateSession()
                    navigate('/')
                }
            }
        }, 1000)

        return () => clearInterval(interval)
        //eslint-disable-next-line
    }, [startTime, endTime, timeDifference])

    // useEffect(() => {

    // }, [])

    // useEffect(() => {
    //     setQuestions([1, 2, 3, 4])
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('index', JSON.stringify(index))
    // }, [index])

    //@ts-expect-error errrrr
    const displayedQuestions = assessment?.questions?.map((question, index) => 
        question.type === 'options' ?
        //@ts-expect-error errrrr
        <ExamQuestionOptions assessmentId={assessment.id} question={question} index={index} total={assessment?.questions?.length} /> :
        //@ts-expect-error errrrr
        <ExamQuestionSelects assessmentId={assessment.id} question={question} index={index} total={assessment?.questions?.length} />
    )

    if(isLoading) return <></>
    else return (
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
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={800}>Assessment</Typography>
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={600}>Course 9</Typography>
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

                    // <ExamQuestionOptions 
                    //     number={questions[index]} 
                    //     setIndex={setIndex}
                    //     total={questions.length}
                    // />
                    // : index === 1 ?
                    // <ExamQuestionSelects
                    //     number={questions[index]} 
                    //     setIndex={setIndex}
                    //     total={questions.length}
                    // />
                    // : index === 2 ?
                    // <ExamQuestionPic
                    //     number={questions[index]} 
                    //     setIndex={setIndex}
                    //     total={questions.length}
                    // />
                    // :
                    // <ExamQuestionOptions 
                    //     number={questions[index]} 
                    //     setIndex={setIndex}
                    //     total={questions.length}
                    // />
                    //@ts-expect-error lastQuestion
                    displayedQuestions?.length && displayedQuestions[Number(examSession[0]?.lastQuestion)]
                }
            </Box>
        </Box>
    )
}
