
import { Accordion, AccordionSummary, Stack, Typography, AccordionDetails } from "@mui/material";
import { Suspense, lazy } from "react";
import AssessmentProps from "../../../../interfaces/AssessmentProps";
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'));

interface GradeCard{
    assessmentsArray?: AssessmentProps[],
    index: number
    setQuestions: React.Dispatch<React.SetStateAction<string>>,
    setSelectedAssessment: React.Dispatch<React.SetStateAction<string>>,
    questions: string
}

export default function GradeCardAssessment({assessmentsArray, index, questions, setQuestions, setSelectedAssessment}: GradeCard) 
{
const displayedAssessments = assessmentsArray?.map((assessment, index) => (
    <Stack
        direction='row'
        justifyContent='space-between'
        flex={1}
        height='50px'
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingY: 0 }}
        alignItems='center'
        bgcolor='rgba(0, 0, 0, 0.05)'
    >
        {/* <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
            <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.2759 0H16.1379H7.86207H3.72414C1.67172 0 0 1.67172 0 3.72414V6.62069V17.3793V20.2759C0 22.3283 1.67172 24 3.72414 24H7.86207H16.1379H20.2759C22.3283 24 24 22.3283 24 20.2759V17.3793V6.62069V3.72414C24 1.67172 22.3283 0 20.2759 0ZM8.27586 0.827586H15.7241V6.2069H8.27586V0.827586ZM0.827586 3.72414C0.827586 2.1269 2.1269 0.827586 3.72414 0.827586H7.44828V6.2069H0.827586V3.72414ZM7.44828 23.1724H3.72414C2.1269 23.1724 0.827586 21.8731 0.827586 20.2759V17.7931H7.44828V23.1724ZM15.7241 23.1724H8.27586V17.7931H15.7241V23.1724ZM23.1724 20.2759C23.1724 21.8731 21.8731 23.1724 20.2759 23.1724H16.5517V17.7931H23.1724V20.2759ZM23.1724 16.9655H0.827586V7.03448H23.1724V16.9655ZM23.1724 6.2069H16.5517V0.827586H20.2759C21.8731 0.827586 23.1724 2.1269 23.1724 3.72414V6.2069Z" fill="#226E9F"/>
                    <path d="M8.94209 15.5255C9.15726 15.6579 9.39726 15.72 9.63726 15.72C9.84829 15.72 10.0552 15.6703 10.2497 15.571L15.0455 13.0924C15.4635 12.8772 15.7242 12.4593 15.7242 12C15.7242 11.5407 15.4635 11.1227 15.0455 10.9076L10.2497 8.42896C9.83174 8.21378 9.34347 8.23033 8.94209 8.47447C8.52416 8.72689 8.27588 9.17378 8.27588 9.67034V14.3296C8.27588 14.8262 8.52416 15.2731 8.94209 15.5255ZM9.10347 9.67034C9.10347 9.46758 9.20278 9.28137 9.37243 9.18206C9.45519 9.1324 9.54622 9.10758 9.63726 9.10758C9.71588 9.10758 9.7945 9.12827 9.87312 9.16551L14.669 11.6441C14.8759 11.7476 14.8966 11.9296 14.8966 12C14.8966 12.0703 14.8759 12.2524 14.6648 12.36L9.86898 14.8386C9.7076 14.9214 9.52553 14.9172 9.37243 14.8221C9.20691 14.7186 9.10347 14.5365 9.10347 14.3338V9.67034Z" fill="#226E9F"/>
                </svg>
            </SvgIcon>
            Introductory Lesson
        </Typography> */}
        <Stack
            bgcolor='#FEF4EB'
            height='100%'
            textAlign='center'
            alignItems='center'
            justifyContent='center'
            pr={4}
            flex={1}
        >
            <Typography fontFamily='Inter' fontSize={16} fontWeight={500}>{index === 0 ? 'First Take' : 'Retake'}</Typography>
        </Stack>
        <Stack
            bgcolor='rgba(255, 255, 255, 0.80)'
            height='100%'
            textAlign='center'
            alignItems='center'
            direction='row'
            justifyContent='space-between'
            flex={1}
            px={1.5}
            gap={1}
            sx={{
                borderRight: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            maxWidth='55%'
            minWidth='55%'
        >
            {/*//@ts-expect-error assessment */}
            <Typography fontFamily='Inter' fontSize={16} fontWeight={500}>{assessment?.grade}%</Typography>
            <button 
                onClick={() => {
                    if(questions)
                    {
                        setSelectedAssessment('')
                        setQuestions('')
                    }
                    else
                    {
                        setQuestions(assessment.id)
                        //@ts-expect-error assessment
                        setSelectedAssessment(assessment.assessmentId)
                    }
                }} 
                className='px-2 ml-auto text-nowrap w-fit py-1.5 rounded-lg h-fit font-semibold max-h-8 text-xs outline-none text-black font-[Inter] bg-[#226E9F]'
            >
                {questions === assessment.id ? "Hide Report" : "Show Report"}
            </button>
        </Stack>
    </Stack>
))
return (
    <Suspense>
    <Accordion sx={{ '.css-o4b71y-MuiAccordionSummary-content': { margin: 0, boxShadow: 'none' }, boxShadow: 'none', '.css-1g92jzo-MuiPaper-root-MuiAccordion-root': { boxShadow: 'none' } }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ paddingRight: 2, paddingLeft: 6, color: '#fff' }} />}
                sx={{
                    padding: 0,
                    margin: '0 !important',
                    boxShadow: 'none',
                    background: '#FF9F06',
                }}
            >
                <Stack
                    justifyContent='space-between'
                    // px={4}
                    bgcolor='#FF9F06'
                    direction='row'
                    flex={1}
                    height='100%'
                    pl={10}
                    minWidth= '300px'
                >
                    <Stack
                        justifyContent='space-between'
                        direction='row'
                        gap={8}
                        // px={8}
                    >
                        <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>Assessment {index + 1}</Typography>
                    </Stack>
                    <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>Grade</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ background: '#F8F8F8', paddingY: 0, paddingX: 0 }}>
                {displayedAssessments}
            </AccordionDetails>
        </Accordion>
    </Suspense>
)
}
