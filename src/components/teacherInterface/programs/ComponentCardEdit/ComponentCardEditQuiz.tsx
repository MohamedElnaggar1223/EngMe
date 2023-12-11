import { Box, Stack, Button, SvgIcon, Typography } from "@mui/material";
import { useMemo, memo, lazy, createContext, Suspense } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setQuizData } from "../../../helpers/setQuizData";
const EditOptionQuestion = lazy(() => import("./EditOptionQuestionQuiz"))
const EditSelectQuestion = lazy(() => import("./EditSelectQuestionQuiz"))

//@ts-expect-error context
export const EditQuizContext = createContext()

//@ts-expect-error anytype
function ComponentCardEditQuiz({ order, course, setEdited, quiz, setAdded }) 
{
    const queryClient = useQueryClient()

    console.log('Quiz')

    const { data: questions } = useQuery({
        queryKey: ['quizEdit', quiz?.id ?? '', course.id],
        queryFn: () => {
            return quiz?.questions.slice()
        }
    })

    // const memoizedSetQuestions = useCallback((data) => {
    //     setQuestions(data)
    // }, [])

    // const handleQuestionChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: string, option?: number, order?: number) => 
    // {
    //     // const newQuestions = [...questions]
    //     // const oldQuestion = questions[index]
    //     if(order !== undefined && option !== undefined)
    //     {
    //         if(type === 'question')
    //         {
    //             if(questions[index])
    //             {
    //                 // newQuestions[index] = {...oldQuestion, question: e.target.value}
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     const oldQuestion = newData[index]
    //                     newData[index] = {...oldQuestion, question: e.target.value}
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'option')
    //         {
    //             if(order === 0)
    //             {
    //                 // newQuestions[index].firstOptions[option] = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].firstOptions[option] = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 1)
    //             {
    //                 // newQuestions[index].secondOptions[option] = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].secondOptions[option] = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 2)
    //             {
    //                 // newQuestions[index].thirdOptions[option] = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].thirdOptions[option] = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 3)
    //             {
    //                 // newQuestions[index].fourthOptions[option] = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].fourthOptions[option] = e.target.value
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'label')
    //         {
    //             if(order === 0)
    //             {
    //                 // newQuestions[index].firstLabel = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].firstLabel = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 1)
    //             {
    //                 // newQuestions[index].secondLabel = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].secondLabel = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 2)
    //             {
    //                 // newQuestions[index].thirdLabel = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].thirdLabel = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 3)
    //             {
    //                 // newQuestions[index].fourthLabel = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].fourthLabel = e.target.value
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'correctOption')
    //         {
    //             if(order === 0)
    //             {
    //                 // newQuestions[index].firstCorrect = option.toString()
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].firstCorrect = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 1)
    //             {
    //                 // newQuestions[index].secondCorrect = option.toString()
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].secondCorrect = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 2)
    //             {
    //                 // newQuestions[index].thirdCorrect = option.toString()
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].thirdCorrect = e.target.value
    //                     return newData
    //                 })
    //             }
    //             else if(order === 3)
    //             {
    //                 // newQuestions[index].fourthCorrect = option.toString()
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].fourthCorrect = e.target.value
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'type')
    //         {
    //             // newQuestions[index] = { question: oldQuestion.question, correctOption: '0', options: [oldQuestion.firstOptions[oldQuestion.firstCorrect], oldQuestion.secondOptions[oldQuestion.secondCorrect], oldQuestion.thirdOptions[oldQuestion.thirdCorrect], oldQuestion.fourthOptions[oldQuestion.fourthCorrect]], type: 'options' }
    //             queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                 //@ts-expect-error oldata
    //                 const newData = [...oldData]
    //                 const oldQuestion = newData[index]
    //                 newData[index] = { question: oldQuestion.question, correctOption: '0', options: [oldQuestion.firstOptions[oldQuestion.firstCorrect], oldQuestion.secondOptions[oldQuestion.secondCorrect], oldQuestion.thirdOptions[oldQuestion.thirdCorrect], oldQuestion.fourthOptions[oldQuestion.fourthCorrect]], type: 'options' }
    //                 return newData
    //             })
    //         }
    //     }
    //     else
    //     {
    //         if(type === 'question')
    //         {
    //             if(questions[index])
    //             {
    //                 // newQuestions[index] = {...oldQuestion, question: e.target.value}
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     const oldQuestion = newData[index]
    //                     newData[index] = {...oldQuestion, question: e.target.value}
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'option')
    //         {
    //             if(questions[index] && option !== undefined)
    //             {
    //                 // newQuestions[index].options[option] = e.target.value
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].options[option] = e.target.value
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'correctOption')
    //         {
    //             if(questions[index] && option !== undefined)
    //             {
    //                 // newQuestions[index]
    //                 queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                     //@ts-expect-error oldata
    //                     const newData = [...oldData]
    //                     newData[index].correctOption = option.toString()
    //                     return newData
    //                 })
    //             }
    //         }
    //         else if(type === 'type')
    //         {
    //             // newQuestions[index] = { question: oldQuestion.question, firstCorrect: '0', secondCorrect: '0', thirdCorrect: '0', fourthCorrect: '0', firstLabel: '', secondLabel: '', thirdLabel: '', fourthLabel: '', firstOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], secondOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], thirdOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], fourthOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], type: 'dropdowns' }
    //             queryClient.setQueryData(['quizEdit', quiz.id, course.id], (oldData: unknown) => {
    //                 //@ts-expect-error oldata
    //                 const newData = [...oldData]
    //                 const oldQuestion = newData[index]
    //                 newData[index] = { question: oldQuestion.question, firstCorrect: '0', secondCorrect: '0', thirdCorrect: '0', fourthCorrect: '0', firstLabel: '', secondLabel: '', thirdLabel: '', fourthLabel: '', firstOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], secondOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], thirdOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], fourthOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], type: 'dropdowns' }
    //                 return newData
    //             })
    //         }
    //     }
    //     // memoizedSetQuestions(newQuestions)
    // }, [questions])

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['quizzes', course.programId, course.id])

            queryClient.setQueryData(['quizzes', course.programId, course.id], (oldData: []) => {
                //@ts-expect-error lesson
                const filteredArray = oldData.slice().filter(quizData => quizData.id !== quiz?.id)
                const newArray = [...filteredArray, quiz ? {...quiz, questions} : { title: 'Quiz', questions }]

                return newArray
            })

            return () => queryClient.setQueryData(['quizzes', course.programId, course.id], previousData)
        },
        mutationFn: () => setQuizData(questions, quiz, course, (order + 1))
    })

    // const memoizedQuestions = useMemo(() => questions, [questions])

    //@ts-expect-error question
    const displayedQuestions = useMemo(() => questions?.map((question, index) => (
        question.type === 'options' ?
        <Suspense>
            <EditOptionQuestion course={course} quiz={quiz} index={index} question={question} key={index} />
        </Suspense>
        :
        <Suspense>
            <EditSelectQuestion course={course} quiz={quiz} index={index} question={question} key={index} />
        </Suspense>
        //eslint-disable-next-line
    )), [questions])

    // const contextValue = useMemo(() => ({ handleQuestionChange }), [handleQuestionChange]);

    return (
        
            <Box
                display='flex'
                flexDirection='column' 
                bgcolor='#fff'
                py={2}
                flex={1}
            >
                {displayedQuestions}
                <Button
                    sx={{
                        background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                            opacity: 1
                        },
                        paddingY: 1.95,
                        paddingX: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '160px',
                        alignSelf: 'flex-end'
                    }}
                    onClick={() => {
                        queryClient.setQueryData(['quizEdit', quiz?.id ?? '', course.id], (oldData: unknown) => {
                            //@ts-expect-error oldata
                            const newData = oldData ? [...oldData, { correctOption: '0', question: '', options: ['', '', '', ''], type: 'options' }] : [{ correctOption: '0', question: '', options: ['', '', '', ''], type: 'options' }]
                            return newData
                        })
                    }}
                >
                    <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    <Typography noWrap fontFamily='Inter' fontSize={14}>Add Question</Typography>
                </Button>
                <Stack
                    flex={1}
                    justifyContent='flex-end'
                    direction='row'
                    mt={3}
                    pb={6}
                    alignItems='center'
                >
                    <Stack
                        gap={1.5}
                        flex={1}
                        minHeight='75px'
                    >
                        
                    </Stack>
                    <Stack
                        direction='row'
                        gap={3}
                        mt='auto'
                    >
                        <Button
                            sx={{
                                width: '120px',
                                height: '35px',
                                background: '#fff',
                                color: '#226E9F',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 500,
                                border: '1px solid #226E9F',
                                borderRadius: '8px',
                                '&:hover': {
                                    background: '#fff',
                                    opacity: 1
                                },
                            }}
                            onClick={() => {
                                setAdded('')
                                setEdited('')
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{
                                width: '120px',
                                height: '35px',
                                background: '#6A9DBC',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 500,
                                border: '1px solid #6A9DBC',
                                borderRadius: '8px',
                                '&:hover': {
                                    background: '#6A9DBC',
                                    opacity: 1
                                },
                            }}
                            onClick={() => {
                                setEdited('')
                                setAdded('')
                                mutate()
                            }}
                        >
                            Confirm
                        </Button>
                    </Stack>
                </Stack>
            </Box>
    )
}

const memoizedComponentCardEditQuiz = memo(ComponentCardEditQuiz)
export default memoizedComponentCardEditQuiz