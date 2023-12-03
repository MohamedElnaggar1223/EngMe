import { Suspense, lazy, memo, useEffect } from "react";
import { Accordion, AccordionSummary, Stack, SvgIcon, Typography, AccordionDetails, Button } from "@mui/material";
// import { PageContext } from "../../../Layout";
import { useNavigate } from "react-router-dom";
import CourseProps from "../../../../interfaces/CourseProps";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssessmentsData } from "../../../helpers/getAssessmentsData";
import { getLessonsData } from "../../../helpers/getLessonsData";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
import { getStudentAssessments } from "../../../helpers/getStudentAssessments";
import { getStudentLessons } from "../../../helpers/getStudentLessons";
import { getStudentQuizzes } from "../../../helpers/getStudentQuizzes";
// eslint-disable-next-line react-refresh/only-export-components
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'));

// eslint-disable-next-line react-refresh/only-export-components
function ComponentCard(course: CourseProps) 
{
    const queryClient = useQueryClient()

    //PREFETCHING FOR LATER
    // useEffect(() => {
    //     const prefetchData = async () => {
    //         await queryClient.prefetchQuery({
    //             queryKey: ['lessons', ]
    //         })
    //     }

    //     prefetchData()
    // }, [])
    
    //@ts-expect-error created
    // const lessons = (queryClient.getQueryData(['lessons', course?.programId]))?.filter(lesson => (course?.lessons)?.includes(lesson.id)) as LessonProps[]
    // //@ts-expect-error created
    // const assessments = (queryClient.getQueryData(['assessments', course?.programId]))?.filter(assessment => (course?.assessments)?.includes(assessment.id)) as AssessmentProps[]
    // //@ts-expect-error created
    // const quizzes = (queryClient.getQueryData(['quizzes', course?.programId]))?.filter(quiz => (course?.quizzes)?.includes(quiz.id))

    // const

    const userData = queryClient.getQueryData(['userData'])

    const { data: assessments } = useQuery({
        queryKey: ['assessments', course.programId],
        queryFn: () => getAssessmentsData([course]),
        enabled: !!course,
        refetchOnMount: true
    })

    const { data: lessons } = useQuery({
        queryKey: ['lessons', course.programId],
        queryFn: () => getLessonsData([course]),
        enabled: !!course,
        refetchOnMount: true
    })

    const { data: quizzes } = useQuery({
        queryKey: ['quizzes', course.programId],
        queryFn: () => getQuizzesData([course]),
        enabled: !!course,
        refetchOnMount: true
    })

    const { data: studentLesson } = useQuery({
        //@ts-expect-error user
        queryKey: ['studentLesson', userData?.id],
        //@ts-expect-error user
        queryFn: () => getStudentLessons(userData?.id, lessons),
        enabled: !!lessons
    })

    const { data: studentAssessment } = useQuery({
        //@ts-expect-error user
        queryKey: ['studentAssessment', userData?.id],
        //@ts-expect-error user
        queryFn: () => getStudentAssessments(userData?.id, assessments),
        enabled: !!assessments
    })

    const { data: studentQuizzes } = useQuery({
        //@ts-expect-error user
        queryKey: ['studentQuizzes', userData?.id],
        //@ts-expect-error user
        queryFn: () => getStudentQuizzes(userData?.id, quizzes),
        enabled: !!quizzes
    })

    const displayedLessons = lessons?.map(lesson => (
            <Stack
                direction='row'
                justifyContent='space-between'
                flex={1}
                height='50px'
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                alignItems='center'
                bgcolor='#D0EBFC'
            >
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
                    <SvgIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.2759 0H16.1379H7.86207H3.72414C1.67172 0 0 1.67172 0 3.72414V6.62069V17.3793V20.2759C0 22.3283 1.67172 24 3.72414 24H7.86207H16.1379H20.2759C22.3283 24 24 22.3283 24 20.2759V17.3793V6.62069V3.72414C24 1.67172 22.3283 0 20.2759 0ZM8.27586 0.827586H15.7241V6.2069H8.27586V0.827586ZM0.827586 3.72414C0.827586 2.1269 2.1269 0.827586 3.72414 0.827586H7.44828V6.2069H0.827586V3.72414ZM7.44828 23.1724H3.72414C2.1269 23.1724 0.827586 21.8731 0.827586 20.2759V17.7931H7.44828V23.1724ZM15.7241 23.1724H8.27586V17.7931H15.7241V23.1724ZM23.1724 20.2759C23.1724 21.8731 21.8731 23.1724 20.2759 23.1724H16.5517V17.7931H23.1724V20.2759ZM23.1724 16.9655H0.827586V7.03448H23.1724V16.9655ZM23.1724 6.2069H16.5517V0.827586H20.2759C21.8731 0.827586 23.1724 2.1269 23.1724 3.72414V6.2069Z" fill="#226E9F"/>
                            <path d="M8.94209 15.5255C9.15726 15.6579 9.39726 15.72 9.63726 15.72C9.84829 15.72 10.0552 15.6703 10.2497 15.571L15.0455 13.0924C15.4635 12.8772 15.7242 12.4593 15.7242 12C15.7242 11.5407 15.4635 11.1227 15.0455 10.9076L10.2497 8.42896C9.83174 8.21378 9.34347 8.23033 8.94209 8.47447C8.52416 8.72689 8.27588 9.17378 8.27588 9.67034V14.3296C8.27588 14.8262 8.52416 15.2731 8.94209 15.5255ZM9.10347 9.67034C9.10347 9.46758 9.20278 9.28137 9.37243 9.18206C9.45519 9.1324 9.54622 9.10758 9.63726 9.10758C9.71588 9.10758 9.7945 9.12827 9.87312 9.16551L14.669 11.6441C14.8759 11.7476 14.8966 11.9296 14.8966 12C14.8966 12.0703 14.8759 12.2524 14.6648 12.36L9.86898 14.8386C9.7076 14.9214 9.52553 14.9172 9.37243 14.8221C9.20691 14.7186 9.10347 14.5365 9.10347 14.3338V9.67034Z" fill="#226E9F"/>
                        </svg>
                    </SvgIcon>
                    {lesson.title}
                </Typography>
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson.description}</Typography>
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson.duration.split(" ")[0]}:{lesson.duration.split(" ")[2]}:00</Typography>
            </Stack>
        )
    )
    
    const displayedQuizzes = quizzes?.map((quiz, index: number) => (
            <Stack
                direction='row'
                justifyContent='space-between'
                flex={1}
                height='50px'
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                alignItems='center'
                bgcolor='#D0EBFC'
            >

                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
                    <SvgIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.7431 0H3.25758C3.25758 0 0 0 0 3.25752V20.7422C0 20.7422 0 24 3.25758 24H20.7429C20.7429 24 24 24 24 20.7422V3.25752C24.0005 3.25752 24.0005 0 20.7431 0ZM13.0366 21.0787C12.6439 21.4668 12.0982 21.6614 11.3988 21.6614C10.6824 21.6614 10.127 21.4714 9.73483 21.0919C9.34194 20.7122 9.14658 20.177 9.14658 19.4861C9.14658 18.7697 9.33858 18.228 9.72211 17.861C10.1064 17.4946 10.6648 17.3112 11.3983 17.3112C12.1061 17.3112 12.654 17.4986 13.0428 17.8747C13.4307 18.2496 13.6248 18.787 13.6248 19.4868C13.6253 20.16 13.4287 20.6909 13.0366 21.0787ZM17.2595 9.41496C16.8332 10.098 16.0227 10.8653 14.8277 11.7187C14.0091 12.3245 13.4909 12.7848 13.2732 13.1011C13.0555 13.4162 12.9471 13.8305 12.9471 14.3426V15.1102H9.55555V14.1636C9.55555 13.3447 9.73051 12.6317 10.0804 12.0266C10.4304 11.4206 11.0702 10.7765 12.0002 10.0939C12.8959 9.45408 13.4863 8.93376 13.7727 8.53224C14.0583 8.13144 14.2011 7.68408 14.2011 7.18872C14.2011 6.63432 13.9964 6.21216 13.5867 5.922C13.1775 5.63208 12.6055 5.48712 11.8718 5.48712C10.5921 5.48712 9.1329 5.9052 7.49535 6.7416L6.10068 3.93864C8.00296 2.87232 10.0209 2.3388 12.1534 2.3388C13.9104 2.3388 15.3082 2.7612 16.3443 3.60552C17.3811 4.45032 17.8993 5.57616 17.8993 6.98424C17.8995 7.92192 17.6859 8.73264 17.2595 9.41496Z" fill="#226E9F"/>
                        </svg>
                    </SvgIcon>
                    Quiz {index}
                </Typography>
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{quiz.duration}</Typography>
                <Button
                    sx={{
                        width: '100px',
                        height: '30px',
                        background: '#fff',
                        color: '#226E9F',
                        fontFamily: 'Inter',
                        fontSize: 14,
                        textTransform: 'none',
                        fontWeight: 400,
                        border: '1px solid #226E9F',
                        borderRadius: '5px',
                        '&:hover': {
                            background: '#fff',
                            opacity: 1
                        }
                    }}
                    onClick={() => {
                        // setPage('quiz')
                        navigate('/quiz')
                    }}
                    >
                    Retake
                </Button>
            </Stack>
        )
    )

    const displayedAssessments = assessments?.map(assessment => (
            <Stack
                direction='row'
                justifyContent='space-between'
                flex={1}
                height='50px'
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                alignItems='center'
                bgcolor='#FEF4EB'
            >
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{assessment.title}</Typography>
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{assessment.description}</Typography>
                <Typography sx={{ color: '#FF7E00' }} fontFamily='Inter' fontSize={14} fontWeight={700}>80%</Typography>
            </Stack>
        )
    )

    const navigate = useNavigate()
    return (
        <Suspense>
            <Accordion sx={{ width: '100%', flex: 1, '.css-o4b71y-MuiAccordionSummary-content': { margin: 0, boxShadow: 'none' }, boxShadow: 'none', '.css-1g92jzo-MuiPaper-root-MuiAccordion-root': { boxShadow: 'none' } }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ paddingRight: 2, paddingLeft: 6, color: '#fff' }} />}
                    sx={{
                        padding: 0,
                        margin: '0 !important',
                        boxShadow: 'none',
                        background: '#226E9F',
                    }}
                >
                    <Stack
                        justifyContent='space-between'
                        // px={4}
                        bgcolor='#226E9F'
                        direction='row'
                        flex={1}
                        height='100%'
                        pl={2}
                    >
                        <Stack
                            justifyContent='space-between'
                            direction='row'
                            gap={8}
                        >
                            <SvgIcon sx={{ background: '#00C342', borderRadius: '50%' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 25C14.9723 25 17.389 24.2669 19.4446 22.8934C21.5002 21.5199 23.1024 19.5676 24.0485 17.2835C24.9946 14.9995 25.2421 12.4861 24.7598 10.0614C24.2775 7.63661 23.087 5.40933 21.3388 3.66117C19.5907 1.91301 17.3634 0.722505 14.9386 0.24019C12.5139 -0.242126 10.0005 0.0054161 7.71645 0.951511C5.43238 1.89761 3.48015 3.49976 2.10663 5.55538C0.733112 7.61099 0 10.0277 0 12.5C0 15.8152 1.31696 18.9946 3.66116 21.3388C6.00537 23.683 9.18479 25 12.5 25ZM6.01136 12.8295C6.22427 12.6179 6.51229 12.4991 6.8125 12.4991C7.11271 12.4991 7.40072 12.6179 7.61363 12.8295L10.2273 15.4432L16.8068 8.86364C17.0242 8.67747 17.3038 8.58019 17.5898 8.59124C17.8758 8.60229 18.1471 8.72085 18.3495 8.92323C18.5519 9.12561 18.6704 9.3969 18.6815 9.6829C18.6925 9.96889 18.5953 10.2485 18.4091 10.4659L11.0227 17.8523C10.8098 18.0639 10.5218 18.1827 10.2216 18.1827C9.92138 18.1827 9.63336 18.0639 9.42045 17.8523L6.01136 14.4432C5.90485 14.3375 5.82031 14.2119 5.76262 14.0734C5.70493 13.9349 5.67523 13.7864 5.67523 13.6364C5.67523 13.4864 5.70493 13.3378 5.76262 13.1993C5.82031 13.0609 5.90485 12.9352 6.01136 12.8295Z" fill="white"/>
                                </svg>
                            </SvgIcon>
                            <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>Course 1</Typography>
                        </Stack>
                        <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>2 Lessons</Typography>
                        <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>5 Hours</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ background: '#F8F8F8', paddingY: 0, paddingX: 0 }}>
                    {displayedLessons}
                    {displayedQuizzes}
                    {displayedAssessments}
                </AccordionDetails>
            </Accordion>
        </Suspense>
    )
}

const memoizedComponentCard = memo(ComponentCard)
export default memoizedComponentCard