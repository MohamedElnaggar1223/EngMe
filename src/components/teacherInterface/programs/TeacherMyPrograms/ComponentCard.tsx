import { memo, useMemo, useRef, useState } from "react";
import { Accordion, AccordionSummary, Stack, SvgIcon, Typography, AccordionDetails, Dialog, CircularProgress } from "@mui/material";
// import { PageContext } from "../../../Layout";
import CourseProps from "../../../../interfaces/CourseProps";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssessmentsData } from "../../../helpers/getAssessmentsData";
import { getLessonsData } from "../../../helpers/getLessonsData";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
// import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { Delete, ExpandMore } from "@mui/icons-material";
import ComponentCardEditLesson from "../ComponentCardEdit/ComponentCardEditLesson";
import ComponentCardEditQuiz from "../ComponentCardEdit/ComponentCardEditQuiz";
import ComponentCardEditAssessment from "../ComponentCardEdit/ComponentCardEditAssessment";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

interface ComponentCard{
    index: number,
    course: CourseProps,
    courses: string[],
}

// eslint-disable-next-line react-refresh/only-export-components
function ComponentCard({index, course, courses}: ComponentCard) 
{
    const queryClient = useQueryClient()
    
    // const queryClient = useQueryClient()
    ////@ts-expect-error context
    // const { userData } = useContext(AuthContext)
    const [edited, setEdited] = useState('')
    const [added, setAdded] = useState('')
    const [expand, setExpand] = useState(false)
    const [loading, setLoading] = useState(false)

    const testRef = useRef<HTMLDivElement>(null)

    console.log(course)

    const { data: assessments } = useQuery({
        queryKey: ['assessments', course.programId, course.id],
        queryFn: () => getAssessmentsData([course.id]),
        enabled: !!course,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    
    const { data: lessons } = useQuery({
        queryKey: ['lessons', course.programId, course.id],
        queryFn: () => getLessonsData([course]),
        enabled: !!course,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    
    const { data: quizzes } = useQuery({
        queryKey: ['quizzes', course.programId, course.id],
        queryFn: () => getQuizzesData([course.id]),
        enabled: !!course,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
    
    function handleExpand(e: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if(e.target instanceof HTMLInputElement ||  e.target instanceof HTMLButtonElement || e.target instanceof HTMLParagraphElement)
        {
            return
        }
        else
        {
            setExpand(prev => !prev)
            !expand && testRef.current?.scrollIntoView({ behavior: 'smooth', block: !expand ? 'center' : 'end', inline: !expand ? 'center' : 'end' })
        }
    }

    const handleDeleteCourse = async () => {
        setLoading(true)
        const assessmentsToDelete = course.assessments
        const lessonsToDelete = course.lessons
        const quizzesToDelete = course.quizzes

        const assessmentsCollection = collection(db, 'assessments')
        const lessonsCollection = collection(db, 'lessons')
        const quizzesCollection = collection(db, 'quizzes')
        const courseCollection = collection(db, 'courses')
        const programCollection = collection(db, 'programs')
        const programDoc = doc(programCollection, course.programId)

        await Promise.all([
            assessmentsToDelete?.map(async(assessment) => {
                const assessmentDoc = doc(assessmentsCollection, assessment)
                await deleteDoc(assessmentDoc)
            }),
            lessonsToDelete?.map(async(lesson) => {
                const lessonDoc = doc(lessonsCollection, lesson)
                await deleteDoc(lessonDoc)
            }),
            quizzesToDelete?.map(async(quiz) => {
                const quizDoc = doc(quizzesCollection, quiz)
                await deleteDoc(quizDoc)
            }),
            deleteDoc(doc(courseCollection, course.id)),
            updateDoc(programDoc, {
                courses: courses.filter(c => c !== course.id)
            })
        ])
        await queryClient.invalidateQueries({
            queryKey: ['courses', course.programId]
        })
        setLoading(false)
    }

    const editedComponent = useMemo(() => (
        lessons?.find(lesson => lesson.id === edited) ?
            <ComponentCardEditLesson order={lessons?.length ?? 0} course={course} setEdited={setEdited} setAdded={setAdded} lesson={lessons?.find(lesson => lesson.id === edited)} /> :
        quizzes?.find(quiz => quiz.id === edited) ?
            <ComponentCardEditQuiz course={course} setEdited={setEdited} setAdded={setAdded} quiz={quizzes?.find(quiz => quiz.id === edited)} order={quizzes?.length ?? 0} /> :
        <ComponentCardEditAssessment order={assessments?.length ?? 0} course={course} setEdited={setEdited} setAdded={setAdded} assessment={assessments?.find(assessment => assessment.id === edited)} />
    ), [edited, assessments, quizzes, course, lessons])

    const displayedLessons = 
    (lessons?.length && lessons?.length > 0) ?
    lessons?.map(lesson => {
        let finalDuration
        //@ts-expect-error duration
        if(lesson?.duration)
        {
            //@ts-expect-error duration
            const sec_num = parseInt(lesson?.duration, 10)
            const hours_duration = Math.floor(sec_num / 3600);
            const minutes_duration = Math.floor((sec_num - (hours_duration * 3600)) / 60)
            const seconds_duration = sec_num - (hours_duration * 3600) - (minutes_duration * 60);
    
            finalDuration = `${hours_duration}:${minutes_duration}:${seconds_duration}`
        }
        return (
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
                    <SvgIcon 
                        onClick={(e) => {
                            e.stopPropagation()
                            setAdded('')
                            setEdited(lesson.id)
                        }} 
                        sx={{ cursor: 'pointer' }}
                    >
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
                    <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson?.duration ? finalDuration : ''}</Typography>
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
    }
    )
    :
    <Stack
        direction='row'
        justifyContent='center'
        flex={1}
        height='50px'
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingLeft: 8, paddingY: 0.5, paddingRight: 4 }}
        alignItems='center'
        bgcolor='#D0EBFC'
    >
        <SvgIcon 
            onClick={(e) => {
                e.stopPropagation()
                setEdited('')
                setAdded('lesson')
            }} 
            sx={{ fontSize: 32, cursor: 'pointer', alignSelf: 'center' }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                <circle cx="14.5" cy="14.5" r="14.5" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5398 7H15.6602C16.1455 7 16.5287 7.38319 16.5287 7.84303V12.6968H21.357C21.8168 12.6968 22.2 13.08 22.2 13.5398V15.6602C22.2 16.1455 21.8168 16.5287 21.357 16.5287H16.5287V21.357C16.5287 21.8168 16.1455 22.2 15.6602 22.2H13.5398C13.08 22.2 12.6968 21.8168 12.6968 21.357V16.5287H7.84303C7.38319 16.5287 7 16.1455 7 15.6602V13.5398C7 13.08 7.38319 12.6968 7.84303 12.6968H12.6968V7.84303C12.6968 7.38319 13.08 7 13.5398 7Z" fill="#226E9F"/>
            </svg>
        </SvgIcon>
    </Stack>

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
                <SvgIcon 
                    onClick={(e) => {
                        e.stopPropagation()
                        setEdited(quiz.id)
                    }} 
                    sx={{ cursor: 'pointer' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                        <rect width="27" height="25" rx="5" fill="#D0EBFC"/>
                        <path d="M22.1835 11.238C21.7321 11.238 21.366 11.604 21.366 12.0554V19.5213C21.366 20.5377 20.5395 21.3651 19.5223 21.3651H6.47956C5.46231 21.3651 4.63579 20.5377 4.63579 19.5213V6.47866C4.63579 5.46231 5.46231 4.63488 6.47956 4.63488H14.0354C14.4868 4.63488 14.8529 4.26885 14.8529 3.81744C14.8529 3.36603 14.4868 3 14.0354 3H6.47956C4.56131 3 3 4.5604 3 6.47866V19.5213C3 21.4396 4.56131 23 6.47956 23H19.5223C21.4405 23 23.0018 21.4396 23.0018 19.5213V12.0554C23.0018 11.604 22.6349 11.238 22.1835 11.238Z" fill="#226E9F"/>
                        <path d="M17.4441 3.82134L10.1716 11.0938C9.61938 11.6451 9.35145 12.4281 9.44681 13.2019L9.42774 15.7487C9.42683 15.9676 9.51312 16.1783 9.66752 16.3327C9.82102 16.4862 10.029 16.5725 10.2461 16.5725C10.2479 16.5725 10.2506 16.5725 10.2524 16.5725L12.7992 16.5534C13.5694 16.6488 14.3551 16.3817 14.9064 15.8295L22.1798 8.55704C22.633 8.10381 22.8864 7.50345 22.8937 6.86676C22.9019 6.2237 22.6566 5.61971 22.2052 5.16921L20.8319 3.79682C19.9037 2.86857 18.3841 2.88129 17.4441 3.82134ZM21.2579 6.84677C21.2561 7.05386 21.1716 7.25004 21.0217 7.39991L13.7484 14.6724C13.5458 14.874 13.2615 14.9721 12.9736 14.9267C12.9318 14.9203 12.891 14.9176 12.8492 14.9176C12.8474 14.9176 12.8446 14.9176 12.8428 14.9176L11.0681 14.9312L11.0817 13.1556C11.0817 13.112 11.0781 13.0693 11.0717 13.0257C11.0281 12.7423 11.1235 12.4517 11.326 12.25L18.5985 4.97756C18.9037 4.67511 19.3851 4.6624 19.6757 4.95122L21.049 6.32361C21.1861 6.46167 21.2606 6.64696 21.2579 6.84677Z" fill="#226E9F"/>
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

    const displayedAssessments = 
    (assessments?.length && assessments.length > 0) ?
    assessments?.map(assessment => (
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
                <SvgIcon 
                    onClick={(e) => {
                        e.stopPropagation()
                        setEdited(assessment.id)
                    }} 
                    sx={{ cursor: 'pointer' }}
                >
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
    :
    <Stack
        direction='row'
        justifyContent='space-between'
        flex={1}
        height='50px'
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingLeft: 8, paddingY: 0.5, paddingRight: 4 }}
        alignItems='center'
        bgcolor='#D9D9D9'
    >
        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>Assessment</Typography>
        <SvgIcon 
            onClick={(e) => {
                e.stopPropagation()
                setAdded('assessment')
            }} 
            sx={{ cursor: 'pointer', mr: 10.5, fontSize: 32 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                <circle cx="14.5" cy="14.5" r="14.5" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5398 7H15.6602C16.1455 7 16.5287 7.38319 16.5287 7.84303V12.6968H21.357C21.8168 12.6968 22.2 13.08 22.2 13.5398V15.6602C22.2 16.1455 21.8168 16.5287 21.357 16.5287H16.5287V21.357C16.5287 21.8168 16.1455 22.2 15.6602 22.2H13.5398C13.08 22.2 12.6968 21.8168 12.6968 21.357V16.5287H7.84303C7.38319 16.5287 7 16.1455 7 15.6602V13.5398C7 13.08 7.38319 12.6968 7.84303 12.6968H12.6968V7.84303C12.6968 7.38319 13.08 7 13.5398 7Z" fill="#9B9B9B"/>
            </svg>
        </SvgIcon>
        <Stack
            direction='row'
            alignItems='center'
            gap={1}
        >
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}></Typography>
        </Stack>
    </Stack>

    return (
        <>
        <Accordion expanded={expand} sx={{ width: '100%', flex: 1, '.css-o4b71y-MuiAccordionSummary-content': { margin: 0, boxShadow: 'none' }, boxShadow: 'none', '.css-1g92jzo-MuiPaper-root-MuiAccordion-root': { boxShadow: 'none' } }}>
            <AccordionSummary
                expandIcon={<ExpandMore sx={{ paddingRight: 2, paddingLeft: 6, color: '#fff' }} />}
                sx={{
                    padding: 0,
                    margin: '0 !important',
                    boxShadow: 'none',
                    background: '#226E9F',
                }}
                onClick={(e) => handleExpand(e)}
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
                        <SvgIcon 
                            onClick={(e) => {
                                e.stopPropagation()
                                setEdited('')
                                setAdded('lesson')
                                setExpand(true)
                                !expand && testRef.current?.scrollIntoView({ behavior: 'smooth', block: !expand ? 'center' : 'end', inline: !expand ? 'center' : 'end' })
                            }} 
                            sx={{ fontSize: 32 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                <circle cx="14.5" cy="14.5" r="14.5" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5398 7H15.6602C16.1455 7 16.5287 7.38319 16.5287 7.84303V12.6968H21.357C21.8168 12.6968 22.2 13.08 22.2 13.5398V15.6602C22.2 16.1455 21.8168 16.5287 21.357 16.5287H16.5287V21.357C16.5287 21.8168 16.1455 22.2 15.6602 22.2H13.5398C13.08 22.2 12.6968 21.8168 12.6968 21.357V16.5287H7.84303C7.38319 16.5287 7 16.1455 7 15.6602V13.5398C7 13.08 7.38319 12.6968 7.84303 12.6968H12.6968V7.84303C12.6968 7.38319 13.08 7 13.5398 7Z" fill="#226E9F"/>
                            </svg>
                        </SvgIcon>
                        <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>Course {index + 1}</Typography>
                    </Stack>
                    <Typography sx={{ color: '#fff', textAlign: 'center' }} fontFamily='Inter' fontSize={16} fontWeight={500}>{lessons?.length} Lessons</Typography>
                    <Typography sx={{ color: '#fff', textAlign: 'center' }} fontFamily='Inter' fontSize={16} fontWeight={500}>
                        {course.duration.split(" ")[0] === '00' ? '0' : course.duration.split(" ")[0]} Hours
                        <SvgIcon onClick={() => handleDeleteCourse()} sx={{ fontSize: 18, marginLeft: '2rem', cursor: 'pointer' }}>
                            <Delete />
                        </SvgIcon>
                    </Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ background: '#F8F8F8', paddingY: 0, paddingX: 0 }}>
                {displayedLessons}
                {displayedQuizzes}
                {displayedAssessments}
                {
                    edited !== '' && added === '' &&
                    editedComponent
                }
                {
                    edited === '' && added !== '' &&
                    (
                        added === 'lesson' ?
                        <ComponentCardEditLesson order={lessons?.length ?? 0} course={course} setEdited={setEdited} setAdded={setAdded} lesson={undefined} /> :
                        added === 'quiz' ?
                        <ComponentCardEditQuiz course={course} setEdited={setEdited} setAdded={setAdded} quiz={undefined} order={quizzes?.length ?? 0} /> :
                        <ComponentCardEditAssessment order={assessments?.length ?? 0} course={course} setEdited={setEdited} setAdded={setAdded} assessment={undefined} />
                    )
                }
            </AccordionDetails>
        </Accordion>
        {!expand && <div ref={testRef} style={{ marginTop: 'auto', height: '1px' }}></div>}
        <Dialog open={loading} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
            <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
        </Dialog>
        </>
)
}

const memoizedComponentCard = memo(ComponentCard)
export default memoizedComponentCard
