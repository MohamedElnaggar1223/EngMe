import { Accordion, AccordionSummary, Box, Stack, Typography, SvgIcon, AccordionDetails, Avatar } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { useContext, useMemo, useState } from 'react'
import star from '../../../../assets/Star 4.png'
import ProgramProps from '../../../../interfaces/ProgramProps'
import { setStudentProgramFavorite } from '../../../helpers/setStudentProgramFavorite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../../authentication/auth/AuthProvider'
import { getTeacherDataFromProgram } from '../../../helpers/getTeacherDataFromProgram'
import { getAssessmentsData } from '../../../helpers/getAssessmentsData'
import { getCoursesData } from '../../../helpers/getCoursesData'
import { getLessonsData } from '../../../helpers/getLessonsData'
import { getQuizzesData } from '../../../helpers/getQuizzesData'
import { getProgramFinalExams } from '../../../helpers/getProgramFinalExams'
import { getStudentProgramFinalExams } from '../../../helpers/getStudentProgramFinalExams'
import { getStudentQuizzes } from '../../../helpers/getStudentQuizzes'
import { getStudentAssessments } from '../../../helpers/getStudentAssessments'
import { getStudentLessons } from '../../../helpers/getStudentLessons'
import { useNavigate } from 'react-router-dom'

export default function CurrentCourseCard(program: ProgramProps) 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    function handleExpand(e: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if(e.target instanceof HTMLInputElement ||  e.target instanceof HTMLButtonElement || e.target instanceof HTMLParagraphElement || e.target instanceof SVGElement)
        {
            return
        }
        else
        {
            setOpen(prev => !prev)
        }
    }

    const handleStudentFavoriteProgram = async () => {
        await setStudentProgramFavorite(userData.id, program.id)
        queryClient.invalidateQueries({
            queryKey: ['userData'],
        })
    }

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['userData'])

            queryClient.setQueryData(['userData'], (oldData: unknown) => {
                //@ts-expect-error ddddataold
                const oldFavs = oldData.favoritePrograms
                let newFavs
                if(oldFavs.length)
                {
                    //@ts-expect-error favs
                    newFavs = oldFavs.includes(program.id) ? oldFavs.slice().filter(fav => fav !== program.id) : [...oldFavs, program.id]
                }
                else
                {
                    newFavs = [program.id]
                }

                //@ts-expect-error ddddataold
                return {...oldData, favoritePrograms: newFavs}
            })

            return () => queryClient.setQueryData(['userData'], previousData)
        },
        mutationFn: () => handleStudentFavoriteProgram()
    })

    const { data: teacherData } = useQuery({
        queryKey: ['teacherData', program.id],
        queryFn: () => getTeacherDataFromProgram(program),
        refetchOnMount: false,
        enabled: open
    })

    const {data: prereqs } = useQuery({
        queryKey: ['preReqData', program.id],
        //@ts-expect-error erro
        queryFn: () => getProgramsData(program.prerequisites),
        enabled: !!open
    })

    const { data: courses } = useQuery({
        queryKey: ['courses', program?.id, 'currentCard'],
        queryFn: () => getCoursesData(program),
        refetchOnMount: true,
        enabled: !!open
    })

    const { data: assessments } = useQuery({
        queryKey: ['assessments', program.id, 'currentCard'],
        queryFn: () => getAssessmentsData(courses),
        enabled: !!courses,
        refetchOnMount: true
    })
    //console.log(program.id, program.courses)
    const { data: lessons } = useQuery({
        queryKey: ['lessons', program.id, 'currentCard'],
        queryFn: () => getLessonsData(courses),
        enabled: !!courses,
        refetchOnMount: true
    })
    //console.log(lessons)
    const { data: quizzes } = useQuery({
        queryKey: ['quizzes', program.id, 'currentCard'],
        queryFn: () => getQuizzesData(courses),
        enabled: !!courses,
        refetchOnMount: true
    })

    const { data: studentLesson } = useQuery({
        queryKey: ['studentLesson', userData?.id, 'currentCard', program.id],
        //@ts-expect-error lesson
        queryFn: () => getStudentLessons(userData?.id, lessons?.map(lesson => lesson.id)),
        enabled: !!lessons
    })

    ////console.log(lessons)

    const { data: studentAssessment } = useQuery({
        queryKey: ['studentAssessment', userData?.id, 'currentCard', program.id],
        //@ts-expect-error lesson
        queryFn: () => getStudentAssessments(userData?.id, assessments?.map(assessment => assessment.id)),
        enabled: !!assessments
    })

    const { data: studentQuizzes } = useQuery({
        queryKey: ['studentQuizzes', userData?.id, 'currentCard', program.id],
        //@ts-expect-error lesson
        queryFn: () => getStudentQuizzes(userData?.id, quizzes?.map(quiz => quiz.id)),
        enabled: !!quizzes
    })

    const { data: finalExams } = useQuery({
		queryKey: ['finalExams', program.id],
		queryFn: () => getProgramFinalExams(program.id),
        enabled: open
	})

	const { data: studentFinalExams } = useQuery({
		queryKey: ['finalExams', program.id, userData.id],
		queryFn: () => getStudentProgramFinalExams(userData.id, Object.values(program?.finalExams ?? [''])),
        enabled: open
	})

    const heighestPercentage = useMemo(() => {
        if(program?.finalExams)
        {
            const sortedVersions = Object.keys(program?.finalExams)?.sort((a, b) => Number(a.split(" ")[1]) - Number(b.split(" ")[1]))
            const foundStudentExams = sortedVersions.map((version: string) => {
                //@ts-expect-error program
                const versionExam = finalExams?.find(exam => exam.id === program?.finalExams[version])
                //@ts-expect-error program
                return studentFinalExams?.find(studentFinalExam => (finalExams?.map(exam => exam.id))?.includes(studentFinalExam.finalExamId) && versionExam?.id === studentFinalExam.finalExamId)
            })
            //@ts-expect-error finals
            foundStudentExams.sort((a, b) => Number(b?.grade) - Number(a?.grade))
            return foundStudentExams[0]
        }
    }
    , [finalExams, studentFinalExams, program])

    console.log(studentAssessment, assessments)

    const materialCount = useMemo(() => {if(open) return(assessments?.length ?? [].length) + (lessons?.length ?? [].length) + (quizzes?.length ?? [].length)}, [assessments, lessons, quizzes, open])
    const materialFinished = useMemo(() => {
        if(open)
        {
                const newStudentAssessment = studentAssessment?.slice().reduce((result, currentAssessment) => {
                    //@ts-expect-error reduction
                    const { assessmentId, createdAt } = currentAssessment
        
                    //@ts-expect-error reduction
                    const index = result.findIndex(obj => obj.assessmentId === assessmentId)
        
                    if(index === -1)
                    {
                        //@ts-expect-error reduction
                        result.push(currentAssessment)
                    }
                    else
                    {
                        //@ts-expect-error reduction
                        const existingDate = result[index].createdAt;
        
                        if (new Date(createdAt) > new Date(existingDate)) 
                        {
                            //@ts-expect-error reduction
                            result[index] = currentAssessment;
                        }
                    }
        
                    return result
                }, [])
               
                const newStudentQuiz = studentQuizzes?.slice().reduce((result, currentQuiz) => {
                    //@ts-expect-error reduction
                    const { quizId, createdAt } = currentQuiz
        
                    //@ts-expect-error reduction
                    const index = result.findIndex(obj => obj.quizId === quizId)
        
                    if(index === -1)
                    {
                        //@ts-expect-error reduction
                        result.push(currentQuiz)
                    }
                    else
                    {
                        //@ts-expect-error reduction
                        const existingDate = result[index].createdAt;
        
                        if (new Date(createdAt) > new Date(existingDate)) 
                        {
                            //@ts-expect-error reduction
                            result[index] = currentQuiz;
                        }
                    }
        
                    return result
                }, [])
                return (newStudentAssessment?.length ?? 0) + (studentLesson?.length ?? 0) + (newStudentQuiz?.length ?? 0)
            }
        }, [studentAssessment, studentLesson, studentQuizzes, open])

        //@ts-expect-error reduction
    const progress = useMemo(() => materialCount !== 0 ? ((materialFinished/materialCount)*100).toFixed() : 0, [materialCount, materialFinished])

    //@ts-expect-error prereq
    const displayedPrereqs = prereqs?.map(prereq => <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>{prereq?.name}</Typography>) 
    
    const icon = userData.favoritePrograms.length && userData.favoritePrograms.includes(program.id) ? 
    (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M6.14963 19.1713C4.44636 20.0668 2.90407 18.9476 3.22957 17.0498L3.99423 12.5915L0.755079 9.43408C-0.622893 8.09089 -0.0350361 6.27823 1.87044 6.00135L6.34684 5.35089L8.34874 1.2946C9.20037 -0.431002 11.106 -0.432061 11.9581 1.2946L13.96 5.35089L18.4364 6.00135C20.3407 6.27806 20.9306 8.09007 19.5518 9.43408L16.3126 12.5915L17.0773 17.0498C17.4026 18.9464 15.8616 20.0673 14.1572 19.1713L10.1534 17.0664L6.14963 19.1713Z" fill="#FF7E00"/>
        </svg>
        
    ) :
    (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M6.14963 19.1713C4.44636 20.0668 2.90407 18.9476 3.22957 17.0498L3.99423 12.5915L0.755079 9.43408C-0.622893 8.09089 -0.0350361 6.27823 1.87044 6.00135L6.34684 5.35089L8.34874 1.2946C9.20037 -0.431002 11.106 -0.432061 11.9581 1.2946L13.96 5.35089L18.4364 6.00135C20.3407 6.27806 20.9306 8.09007 19.5518 9.43408L16.3126 12.5915L17.0773 17.0498C17.4026 18.9464 15.8616 20.0673 14.1572 19.1713L10.1534 17.0664L6.14963 19.1713ZM9.22844 15.0107C9.77849 14.7215 10.5263 14.7204 11.0784 15.0107L14.7783 16.9559L14.0717 12.836C13.9667 12.2235 14.1967 11.5119 14.6434 11.0765L17.6367 8.15877L13.5001 7.55768C12.8851 7.46832 12.2795 7.02965 12.0034 6.47029L10.1534 2.72187L8.30348 6.47029C8.02846 7.02755 7.4241 7.46799 6.80681 7.55768L2.67018 8.15877L5.66347 11.0765C6.10847 11.5103 6.3406 12.2211 6.23515 12.836L5.52853 16.9559L9.22844 15.0107Z" fill="#FF7E00"/>
        </svg>
    )
    
    return (
        <Accordion expanded={open} TransitionProps={{ unmountOnExit: true }} sx={{ '.css-97ovai': { }, marginY: 4, border: '0px', boxShadow: 'none', background: '#FFFBF8', '.css-o4b71y-MuiAccordionSummary-content': { margin: 0 }, '.css-1bh1d34-MuiPaper-root-MuiAccordion-root': { borderRadius: '20px' } }}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon sx={{ color: '#FFFBF8' }} />}
                        sx={{
                            padding: 0,
                            margin: '0 !important',
                            boxShadow: 'none'
                        }}
                    >
                        <Box
                            p={3}
                            display='flex'
                            flexDirection='row'
                            justifyContent='space-between'
                            alignItems='center'
                            bgcolor='#FFFBF8'
                            m={0}
                            width='100%'
                            onClick={(e) => handleExpand(e)}
                        >
                            <Stack
                                direction='column'
                                gap={2}
                                bgcolor='#FFFBF8'
                                width={{xs: '40%', sm: '40%', lg: '30%'}}
                            >
                                <Stack
                                    alignItems='center'
                                    justifyContent='space-between'
                                    direction='row'
                                >
                                    <Typography
                                        fontSize={26}
                                        fontWeight={900}
                                        fontFamily='Inter'
                                    >
                                        {program?.name}
                                    </Typography>
                                    <SvgIcon onClick={() => mutate()} sx={{ fontSize: 24 }}>
                                        {icon}
                                    </SvgIcon>
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Typography fontSize={16} fontWeight={400} fontFamily='Inter'>{program.category}</Typography>
                                    <Stack
                                        direction='row'
                                        gap={1}
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <SvgIcon sx={{ fontSize: 20 }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path d="M7.72751 0.779696C7.89978 0.258006 8.63774 0.258004 8.81001 0.779694L10.2205 5.05112C10.2976 5.28465 10.5158 5.44239 10.7618 5.44239H15.3064C15.8608 5.44239 16.0889 6.15367 15.6379 6.47609L11.9772 9.09309C11.7741 9.23822 11.6891 9.49854 11.7674 9.73552L13.1694 13.9812C13.3423 14.5047 12.7452 14.9443 12.2967 14.6236L8.60025 11.9811C8.40198 11.8394 8.13554 11.8394 7.93727 11.9811L4.24085 14.6236C3.79234 14.9443 3.19523 14.5047 3.36811 13.9812L4.77012 9.73552C4.84837 9.49854 4.76337 9.23822 4.56036 9.09309L0.899615 6.47609C0.448606 6.15367 0.676701 5.44239 1.2311 5.44239H5.77575C6.02168 5.44239 6.23988 5.28465 6.317 5.05112L7.72751 0.779696Z" fill="#FF9F06"/>
                                            </svg>
                                        </SvgIcon>
                                        <Typography
                                            fontSize={16}
                                            fontFamily='Poppins'
                                            fontWeight={700}
                                            sx={{ color: '#004643' }}
                                        >
                                            {program.averageRating}
                                        </Typography>
                                        <Typography
                                            fontFamily='Inter'
                                            fontSize={16}
                                            fontWeight={400}
                                            ml={0.5}
                                        >
                                            ({program.totalFeedbacks})
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                width={{xs: '40%', sm: '40%', lg: '30%'}}
                            >
                                <Typography
                                    fontSize={18}
                                    fontWeight={400}
                                    fontFamily='Inter'
                                >
                                    {program.description}
                                </Typography>
                            </Stack>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                        <Box
                            mt={4}
                        >
                            <Stack
                                flexWrap='wrap'
                                gap={{ xs: 2, sm: 2, lg: 6}}
                                direction='row'
                                pl={6}
                                pb={2}
                            >
                                <Typography fontSize={18} fontFamily='Inter' fontWeight={600}>Prerequisites:</Typography>
                                {displayedPrereqs}
                            </Stack>
                            <Box
                                px={6}
                                pl={10}
                                bgcolor='#fff'
                                py={4}
                                // width='100%'
                            >
                                <Typography fontSize={18} fontFamily='Inter' fontWeight={600}>Taught By:</Typography>
                            
                                <Stack
                                    ml={2}
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Stack
                                        direction='row'
                                        gap={2}
                                        mt={4}
                                        alignItems='center'
                                        // mr={7}
                                    >
                                        {/*//@ts-expect-error reduction */}
                                        <Avatar onClick={() => navigate(`/teacherprofile/${teacherData?.id}`)} src={teacherData?.image} sx={{ width: '70px', height: '70px', cursor: 'pointer' }} />
                                        <Stack
                                            direction='column'
                                            justifyContent='center'
                                            gap={0.5}
                                        >
                                            {/*//@ts-expect-error reduction */}
                                            <Typography onClick={() => navigate(`/teacherprofile/${teacherData?.id}`)} sx={{ color: '#000', cursor: 'pointer' }} fontFamily='Inter' fontSize={12} fontWeight={600}>{teacherData?.name} | {teacherData?.title}</Typography>
                                            <Stack
                                                direction='row'
                                                justifyContent='space-between'
                                                gap={1}
                                            >
                                                {/*//@ts-expect-error reduction */}
                                                <Typography fontFamily='Inter' fontSize={12} fontWeight={500}>{teacherData?.university}</Typography>
                                                <Stack
                                                    direction='row'
                                                    alignItems='center'
                                                    gap={0.5}
                                                >
                                                    <SvgIcon sx={{ fontSize: 12 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                            <path d="M5.98199 1.22337C6.11981 0.806014 6.71018 0.806015 6.84799 1.22337L7.9764 4.64051C8.03809 4.82733 8.21265 4.95352 8.4094 4.95352H12.0451C12.4886 4.95352 12.6711 5.52254 12.3103 5.78048L9.38171 7.87408C9.2193 7.99018 9.1513 8.19844 9.2139 8.38802L10.3355 11.7846C10.4738 12.2034 9.99612 12.555 9.63731 12.2985L6.68018 10.1845C6.52157 10.0711 6.30841 10.0711 6.1498 10.1845L3.19268 12.2985C2.83387 12.555 2.35618 12.2034 2.49448 11.7846L3.61609 8.38802C3.67869 8.19844 3.61069 7.99018 3.44828 7.87408L0.519688 5.78048C0.158882 5.52254 0.341356 4.95352 0.784878 4.95352H4.42058C4.61733 4.95352 4.79189 4.82733 4.85359 4.64051L5.98199 1.22337Z" fill="#FF9F06"/>
                                                        </svg>
                                                    </SvgIcon>
                                                    {/*//@ts-expect-error reduction */}
                                                    <Typography fontSize={11} fontWeight={700} fontFamily='Poppins'>{teacherData?.averageRating}</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction='column'
                                    >
                                        {
                                            heighestPercentage &&
                                            <Box
                                                sx={{ position: 'relative' }}
                                                alignSelf='flex-end'
                                            >
                                                <ReactApexChart
                                                    options={{
                                                        chart: { type: "donut" },
                                                        colors: ['#fff', '#FF9F06'],
                                                        legend: { show: false },
                                                        dataLabels: { enabled: false },
                                                        // fill: { image: { src: star, height: 100, width: 100 } }
                                                    }}
                                                    //@ts-expect-error grade
                                                    series={[100 - Number(heighestPercentage.grade), Number(heighestPercentage.grade)]}
                                                    type="donut"
                                                    width="120px"
                                                />
                                                <img src={star} width='40px' height='40px' style={{ position: 'absolute', top: 18, left: 40.5 }} />
                                                {/*//@ts-expect-error grade*/}
                                                <Typography fontSize={12} style={{ position: 'absolute', top: 30, left: 45 }} sx={{ color: '#fff' }}>{Number(heighestPercentage?.grade) !== 100 ? Number(heighestPercentage?.grade).toFixed(1) : Number(heighestPercentage?.grade).toFixed(0)}%</Typography>
                                            </Box>
                                        }
                                        <Stack
                                            direction='column'
                                            alignItems='flex-start'
                                            width='510px'
                                            gap={1}
                                        >
                                            <Typography fontSize={10} fontWeight={500} fontFamily='Inter'>Progress Bar</Typography>
                                            <Box
                                                border='1px solid #6A9DBC'
                                                height='15px'
                                                width='80%'
                                                bgcolor='#D0EBFC'
                                                position='relative'
                                            >
                                                <Box
                                                    width={`${progress}%`} //grade
                                                    height='100%'
                                                    bgcolor='#6A9DBC'
                                                    position='relative'
                                                    display='flex'
                                                    justifyContent='flex-end'
                                                    alignSelf='center'
                                                >
                                                    <Box
                                                        height='22px'
                                                        width='5px'
                                                        bgcolor='#FF7E00'
                                                        mt='-3.5px'
                                                        position='relative'
                                                    >
                                                        {/* grade */}<Typography sx={{ color: '#FF7E00' }} position='absolute' top='98%' left='-100%' fontSize={12} fontFamily='Inter' fontWeight={600} >{progress}%</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Stack
                                        direction='row'
                                        gap={1}
                                        flexWrap='wrap'
                                        mt={7}
                                        ml={-6}
                                    >
                                        <Box
                                            bgcolor='#D0EBFC'
                                            sx={{
                                                border: '1.5px solid',
                                                borderRadius: '20px', 
                                                borderColor: '#6A9DBC'
                                            }}
                                            px={1.5}
                                            py={0.5}
                                        >
                                            <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>{program.expiry}</Typography>
                                        </Box>
                                        <Box
                                            bgcolor='#D0EBFC'
                                            sx={{
                                                border: '1.5px solid',
                                                borderRadius: '20px', 
                                                borderColor: '#6A9DBC'
                                            }}
                                            px={1.5}
                                            py={0.5}
                                        >
                                            <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>Completion Certificate</Typography>
                                        </Box>
                                        <Box
                                            bgcolor='#D0EBFC'
                                            sx={{
                                                border: '1.5px solid',
                                                borderRadius: '20px', 
                                                borderColor: '#6A9DBC'
                                            }}
                                            px={1.5}
                                            py={0.5}
                                        >
                                            <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>Intermediate</Typography>
                                        </Box>
                                        <Box
                                            bgcolor='#D0EBFC'
                                            sx={{
                                                border: '1.5px solid',
                                                borderRadius: '20px', 
                                                borderColor: '#6A9DBC'
                                            }}
                                            px={1.5}
                                            py={0.5}
                                        >
                                            <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>2 months</Typography>
                                        </Box>
                                        <Box
                                            bgcolor='#D0EBFC'
                                            sx={{
                                                border: '1.5px solid',
                                                borderRadius: '20px', 
                                                borderColor: '#6A9DBC'
                                            }}
                                            px={1.5}
                                            py={0.5}
                                        >
                                            <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>Completion Certificate</Typography>
                                        </Box>
                                    </Stack>

                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
    )
}
