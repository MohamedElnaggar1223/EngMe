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

    const { data: questions } = useQuery({
        queryKey: ['quizEdit', quiz?.id ?? '', course.id],
        queryFn: () => {
            return quiz?.questions.slice()
        }
    })

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