import { memo } from "react";
import { Accordion, AccordionSummary, Stack, SvgIcon, Typography, AccordionDetails } from "@mui/material";
// import { PageContext } from "../../../Layout";
import CourseProps from "../../../../interfaces/CourseProps";
import {  useQuery } from "@tanstack/react-query";
import { getAssessmentsData } from "../../../helpers/getAssessmentsData";
import { getLessonsData } from "../../../helpers/getLessonsData";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
// import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { ExpandMore } from "@mui/icons-material";

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
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5, cursor: 'pointer' }}
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
                    {/*//@ts-expect-error lesson*/}
                    {lesson?.title}
                </Typography>
                {/*//@ts-expect-error lesson*/}
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson?.description}</Typography>
                {/*//@ts-expect-error lesson*/}
                <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{lesson?.duration.split(" ")[0]}:{lesson?.duration.split(" ")[2]}:00</Typography>
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
                Quiz {index + 1}
            </Typography>
            {/*//@ts-expect-error lesson*/}
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{quiz?.duration}</Typography>
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
            {/*//@ts-expect-error lesson*/}
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{assessment?.title}</Typography>
            {/*//@ts-expect-error lesson*/}
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{assessment?.description}</Typography>
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}></Typography>
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
            </AccordionDetails>
        </Accordion>
)
}

const memoizedComponentCard = memo(ComponentCard)
export default memoizedComponentCard
