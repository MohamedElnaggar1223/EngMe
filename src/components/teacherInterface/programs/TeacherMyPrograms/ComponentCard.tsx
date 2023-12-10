import { memo, useState } from "react";
import { Accordion, AccordionSummary, Stack, SvgIcon, Typography, AccordionDetails } from "@mui/material";
// import { PageContext } from "../../../Layout";
import CourseProps from "../../../../interfaces/CourseProps";
import {  useQuery } from "@tanstack/react-query";
import { getAssessmentsData } from "../../../helpers/getAssessmentsData";
import { getLessonsData } from "../../../helpers/getLessonsData";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
// import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { ExpandMore } from "@mui/icons-material";
import ComponentCardEditLesson from "../ComponentCardEdit/ComponentCardEditLesson";
import ComponentCardEditQuiz from "../ComponentCardEdit/ComponentCardEditQuiz";
import ComponentCardEditAssessment from "../ComponentCardEdit/ComponentCardEditAssessment";

interface ComponentCard{
    index: number,
    course: CourseProps,
}

// eslint-disable-next-line react-refresh/only-export-components
function ComponentCard({index, course}: ComponentCard) 
{
    // const queryClient = useQueryClient()
    ////@ts-expect-error context
    // const { userData } = useContext(AuthContext)
    const [edited, setEdited] = useState('')

    const { data: assessments } = useQuery({
        queryKey: ['assessments', course.programId, course.id],
        queryFn: () => getAssessmentsData([course]),
        enabled: !!course,
        refetchOnMount: true
    })

    const { data: lessons } = useQuery({
        queryKey: ['lessons', course.programId, course.id],
        queryFn: () => getLessonsData([course]),
        enabled: !!course,
        refetchOnMount: true
    })

    const { data: quizzes } = useQuery({
        queryKey: ['quizzes', course.programId, course.id],
        queryFn: () => getQuizzesData([course]),
        enabled: !!course,
        refetchOnMount: true
    })

    const displayedLessons = lessons?.map(lesson => (
            <Stack
                direction='row'
                justifyContent='space-between'
                flex={1}
                height='50px'
                sx={{ borderBottom: edited === lesson.id ? '' : '1px solid rgba(0, 0, 0, 0.1)', paddingLeft: 8, paddingY: 0.5, paddingRight: 4 }}
                alignItems='center'
                bgcolor='#D0EBFC'
                border={edited === lesson.id ? '2px solid rgba(34,110,159,1)' : ''}
            >
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
                    <SvgIcon onClick={() => setEdited(lesson.id)} sx={{ cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                            <rect width="27" height="25" rx="5" fill="#D0EBFC"/>
                            <path d="M22.1835 11.238C21.7321 11.238 21.366 11.604 21.366 12.0554V19.5213C21.366 20.5377 20.5395 21.3651 19.5223 21.3651H6.47956C5.46231 21.3651 4.63579 20.5377 4.63579 19.5213V6.47866C4.63579 5.46231 5.46231 4.63488 6.47956 4.63488H14.0354C14.4868 4.63488 14.8529 4.26885 14.8529 3.81744C14.8529 3.36603 14.4868 3 14.0354 3H6.47956C4.56131 3 3 4.5604 3 6.47866V19.5213C3 21.4396 4.56131 23 6.47956 23H19.5223C21.4405 23 23.0018 21.4396 23.0018 19.5213V12.0554C23.0018 11.604 22.6349 11.238 22.1835 11.238Z" fill="#226E9F"/>
                            <path d="M17.4441 3.82134L10.1716 11.0938C9.61938 11.6451 9.35145 12.4281 9.44681 13.2019L9.42774 15.7487C9.42683 15.9676 9.51312 16.1783 9.66752 16.3327C9.82102 16.4862 10.029 16.5725 10.2461 16.5725C10.2479 16.5725 10.2506 16.5725 10.2524 16.5725L12.7992 16.5534C13.5694 16.6488 14.3551 16.3817 14.9064 15.8295L22.1798 8.55704C22.633 8.10381 22.8864 7.50345 22.8937 6.86676C22.9019 6.2237 22.6566 5.61971 22.2052 5.16921L20.8319 3.79682C19.9037 2.86857 18.3841 2.88129 17.4441 3.82134ZM21.2579 6.84677C21.2561 7.05386 21.1716 7.25004 21.0217 7.39991L13.7484 14.6724C13.5458 14.874 13.2615 14.9721 12.9736 14.9267C12.9318 14.9203 12.891 14.9176 12.8492 14.9176C12.8474 14.9176 12.8446 14.9176 12.8428 14.9176L11.0681 14.9312L11.0817 13.1556C11.0817 13.112 11.0781 13.0693 11.0717 13.0257C11.0281 12.7423 11.1235 12.4517 11.326 12.25L18.5985 4.97756C18.9037 4.67511 19.3851 4.6624 19.6757 4.95122L21.049 6.32361C21.1861 6.46167 21.2606 6.64696 21.2579 6.84677Z" fill="#226E9F"/>
                        </svg>
                    </SvgIcon>
                    {/*//@ts-expect-error lesson*/}
                    {lesson?.title}
                </Typography>
                {/*//@ts-expect-error lesson*/}
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson?.description}</Typography>
                <Stack
                    direction='row'
                    alignItems='center'
                    gap={1}
                    width='150px'
                >
                    {/*//@ts-expect-error lesson*/}
                    <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson?.duration.split(" ")[0]}:{lesson?.duration.split(" ")[2]}:00</Typography>
                    <SvgIcon  sx={{ fontSize: 18, marginLeft: 'auto' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <line y1="0.5" x2="11" y2="0.5" stroke="#226E9F"/>
                            <line y1="5.5" x2="11" y2="5.5" stroke="#226E9F"/>
                            <line y1="10.5" x2="11" y2="10.5" stroke="#226E9F"/>
                        </svg>
                    </SvgIcon>
                </Stack>
            </Stack>
        )
    )

    const displayedQuizzes = quizzes?.map((quiz, index: number) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            flex={1}
            height='50px'
            sx={{ borderBottom: edited === quiz.id ? '' : '1px solid rgba(0, 0, 0, 0.1)', paddingLeft: 8, paddingY: 0.5, paddingRight: 4 }}
            alignItems='center'
            bgcolor='#D0EBFC'
            border={edited === quiz.id ? '2px solid #226E9F' : ''}
        >

                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
                <SvgIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20.7431 0H3.25758C3.25758 0 0 0 0 3.25752V20.7422C0 20.7422 0 24 3.25758 24H20.7429C20.7429 24 24 24 24 20.7422V3.25752C24.0005 3.25752 24.0005 0 20.7431 0ZM13.0366 21.0787C12.6439 21.4668 12.0982 21.6614 11.3988 21.6614C10.6824 21.6614 10.127 21.4714 9.73483 21.0919C9.34194 20.7122 9.14658 20.177 9.14658 19.4861C9.14658 18.7697 9.33858 18.228 9.72211 17.861C10.1064 17.4946 10.6648 17.3112 11.3983 17.3112C12.1061 17.3112 12.654 17.4986 13.0428 17.8747C13.4307 18.2496 13.6248 18.787 13.6248 19.4868C13.6253 20.16 13.4287 20.6909 13.0366 21.0787ZM17.2595 9.41496C16.8332 10.098 16.0227 10.8653 14.8277 11.7187C14.0091 12.3245 13.4909 12.7848 13.2732 13.1011C13.0555 13.4162 12.9471 13.8305 12.9471 14.3426V15.1102H9.55555V14.1636C9.55555 13.3447 9.73051 12.6317 10.0804 12.0266C10.4304 11.4206 11.0702 10.7765 12.0002 10.0939C12.8959 9.45408 13.4863 8.93376 13.7727 8.53224C14.0583 8.13144 14.2011 7.68408 14.2011 7.18872C14.2011 6.63432 13.9964 6.21216 13.5867 5.922C13.1775 5.63208 12.6055 5.48712 11.8718 5.48712C10.5921 5.48712 9.1329 5.9052 7.49535 6.7416L6.10068 3.93864C8.00296 2.87232 10.0209 2.3388 12.1534 2.3388C13.9104 2.3388 15.3082 2.7612 16.3443 3.60552C17.3811 4.45032 17.8993 5.57616 17.8993 6.98424C17.8995 7.92192 17.6859 8.73264 17.2595 9.41496Z" fill="#226E9F"/>
                    </svg>
                </SvgIcon>
                Quiz {index + 1}
            </Typography>
            <Stack
                direction='row'
                alignItems='center'
                gap={1}
                width='150px'
            >
                {/*//@ts-expect-error lesson*/}
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{quiz?.duration}</Typography>
                <SvgIcon  sx={{ fontSize: 18, marginLeft: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <line y1="0.5" x2="11" y2="0.5" stroke="#226E9F"/>
                        <line y1="5.5" x2="11" y2="5.5" stroke="#226E9F"/>
                        <line y1="10.5" x2="11" y2="10.5" stroke="#226E9F"/>
                    </svg>
                </SvgIcon>
            </Stack>
        </Stack>
        )
    )

    const displayedAssessments = assessments?.map(assessment => (
        <Stack
            direction='row'
            justifyContent='space-between'
            flex={1}
            height='50px'
            sx={{ borderBottom: edited === assessment.id ? '' : '1px solid rgba(0, 0, 0, 0.1)', paddingLeft: 8, paddingY: 0.5, paddingRight: 4 }}
            alignItems='center'
            bgcolor='#FEF4EB'
            border={edited === assessment.id ? '2px solid #FF9F06' : ''}
        >
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
                <SvgIcon onClick={() => setEdited(assessment.id)} sx={{ cursor: 'pointer' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                        <rect width="27" height="25" rx="5" fill="white"/>
                        <path d="M22.1835 11.238C21.7321 11.238 21.366 11.604 21.366 12.0554V19.5213C21.366 20.5377 20.5395 21.3651 19.5223 21.3651H6.47956C5.46231 21.3651 4.63579 20.5377 4.63579 19.5213V6.47866C4.63579 5.46231 5.46231 4.63488 6.47956 4.63488H14.0354C14.4868 4.63488 14.8529 4.26885 14.8529 3.81744C14.8529 3.36603 14.4868 3 14.0354 3H6.47956C4.56131 3 3 4.5604 3 6.47866V19.5213C3 21.4396 4.56131 23 6.47956 23H19.5223C21.4405 23 23.0018 21.4396 23.0018 19.5213V12.0554C23.0018 11.604 22.6349 11.238 22.1835 11.238Z" fill="#FF9F06"/>
                        <path d="M17.4441 3.82134L10.1716 11.0938C9.61938 11.6451 9.35145 12.4281 9.44681 13.2019L9.42774 15.7487C9.42683 15.9676 9.51312 16.1783 9.66752 16.3327C9.82102 16.4862 10.029 16.5725 10.2461 16.5725C10.2479 16.5725 10.2506 16.5725 10.2524 16.5725L12.7992 16.5534C13.5694 16.6488 14.3551 16.3817 14.9064 15.8295L22.1798 8.55704C22.633 8.10381 22.8864 7.50345 22.8937 6.86676C22.9019 6.2237 22.6566 5.61971 22.2052 5.16921L20.8319 3.79682C19.9037 2.86857 18.3841 2.88129 17.4441 3.82134ZM21.2579 6.84677C21.2561 7.05386 21.1716 7.25004 21.0217 7.39991L13.7484 14.6724C13.5458 14.874 13.2615 14.9721 12.9736 14.9267C12.9318 14.9203 12.891 14.9176 12.8492 14.9176C12.8474 14.9176 12.8446 14.9176 12.8428 14.9176L11.0681 14.9312L11.0817 13.1556C11.0817 13.112 11.0781 13.0693 11.0717 13.0257C11.0281 12.7423 11.1235 12.4517 11.326 12.25L18.5985 4.97756C18.9037 4.67511 19.3851 4.6624 19.6757 4.95122L21.049 6.32361C21.1861 6.46167 21.2606 6.64696 21.2579 6.84677Z" fill="#FF9F06"/>
                    </svg>
                </SvgIcon>
                {/*//@ts-expect-error lesson*/}
                {assessment?.title}
            </Typography>
            {/*//@ts-expect-error lesson*/}
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{assessment?.description}</Typography>
            <Stack
                direction='row'
                alignItems='center'
                gap={1}
                width='150px'
            >
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}></Typography>
                <SvgIcon  sx={{ fontSize: 18, marginLeft: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <line y1="0.5" x2="11" y2="0.5" stroke="#226E9F"/>
                        <line y1="5.5" x2="11" y2="5.5" stroke="#226E9F"/>
                        <line y1="10.5" x2="11" y2="10.5" stroke="#226E9F"/>
                    </svg>
                </SvgIcon>
            </Stack>
        </Stack>
        )
    )

    return (
        
        <Accordion sx={{ width: '100%', flex: 1, '.css-o4b71y-MuiAccordionSummary-content': { margin: 0, boxShadow: 'none' }, boxShadow: 'none', '.css-1g92jzo-MuiPaper-root-MuiAccordion-root': { boxShadow: 'none' } }}>
            <AccordionSummary
                expandIcon={<ExpandMore sx={{ paddingRight: 2, paddingLeft: 6, color: '#fff' }} />}
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
                        alignItems='center'
                    >
                        <SvgIcon sx={{ fontSize: 32 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                <circle cx="14.5" cy="14.5" r="14.5" fill="white"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5398 7H15.6602C16.1455 7 16.5287 7.38319 16.5287 7.84303V12.6968H21.357C21.8168 12.6968 22.2 13.08 22.2 13.5398V15.6602C22.2 16.1455 21.8168 16.5287 21.357 16.5287H16.5287V21.357C16.5287 21.8168 16.1455 22.2 15.6602 22.2H13.5398C13.08 22.2 12.6968 21.8168 12.6968 21.357V16.5287H7.84303C7.38319 16.5287 7 16.1455 7 15.6602V13.5398C7 13.08 7.38319 12.6968 7.84303 12.6968H12.6968V7.84303C12.6968 7.38319 13.08 7 13.5398 7Z" fill="#226E9F"/>
                            </svg>
                        </SvgIcon>
                        <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>Course {index + 1}</Typography>
                    </Stack>
                    <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>{lessons?.length} Lessons</Typography>
                    <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>5 Hours</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ background: '#F8F8F8', paddingY: 0, paddingX: 0 }}>
                {displayedLessons}
                {displayedQuizzes}
                {displayedAssessments}
                {
                    edited !== '' &&
                    (
                        lessons?.find(lesson => lesson.id === edited) ?
                        <ComponentCardEditLesson course={course} setEdited={setEdited} lesson={lessons?.find(lesson => lesson.id === edited)} /> :
                        quizzes?.find(quiz => quiz.id === edited) ?
                        <ComponentCardEditQuiz course={course} setEdited={setEdited} quiz={quizzes?.find(quiz => quiz.id === edited)} /> :
                        <ComponentCardEditAssessment course={course} setEdited={setEdited} assessment={assessments?.find(assessment => assessment.id === edited)} />
                    )
                }
            </AccordionDetails>
        </Accordion>
)
}

const memoizedComponentCard = memo(ComponentCard)
export default memoizedComponentCard
