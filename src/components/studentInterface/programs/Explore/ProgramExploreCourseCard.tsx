import { Suspense, lazy } from "react";
import { Accordion, AccordionSummary, SvgIcon, Typography, AccordionDetails } from "@mui/material";
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'))
import { Stack } from "@mui/system";

export default function ProgramExploreCourseCard() 
{
    return (
        <Suspense>
            <Accordion sx={{ '.css-o4b71y-MuiAccordionSummary-content': { margin: 0 } }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ paddingRight: 2, paddingLeft: 6 }} />}
                    sx={{
                        padding: 0,
                        margin: '0 !important',
                        boxShadow: 'none',
                        background: '#E8E8E8',
                    }}
                >
                    <Stack
                        justifyContent='space-between'
                        // px={4}
                        bgcolor='#E8E8E8'
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
                            <SvgIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path d="M12.5 25C14.9723 25 17.389 24.2669 19.4446 22.8934C21.5002 21.5199 23.1024 19.5676 24.0485 17.2835C24.9946 14.9995 25.2421 12.4861 24.7598 10.0614C24.2775 7.63661 23.087 5.40933 21.3388 3.66117C19.5907 1.91301 17.3634 0.722505 14.9386 0.24019C12.5139 -0.242126 10.0005 0.0054161 7.71645 0.951511C5.43238 1.89761 3.48015 3.49976 2.10663 5.55538C0.733112 7.61099 0 10.0277 0 12.5C0 15.8152 1.31696 18.9946 3.66116 21.3388C6.00537 23.683 9.18479 25 12.5 25ZM6.01136 12.8295C6.22427 12.6179 6.51229 12.4991 6.8125 12.4991C7.11271 12.4991 7.40072 12.6179 7.61363 12.8295L10.2273 15.4432L16.8068 8.86364C17.0242 8.67747 17.3038 8.58019 17.5898 8.59124C17.8758 8.60229 18.1471 8.72085 18.3495 8.92323C18.5519 9.12561 18.6704 9.3969 18.6815 9.6829C18.6925 9.96889 18.5953 10.2485 18.4091 10.4659L11.0227 17.8523C10.8098 18.0639 10.5218 18.1827 10.2216 18.1827C9.92138 18.1827 9.63336 18.0639 9.42045 17.8523L6.01136 14.4432C5.90485 14.3375 5.82031 14.2119 5.76262 14.0734C5.70493 13.9349 5.67523 13.7864 5.67523 13.6364C5.67523 13.4864 5.70493 13.3378 5.76262 13.1993C5.82031 13.0609 5.90485 12.9352 6.01136 12.8295Z" fill="white"/>
                                </svg>
                            </SvgIcon>
                            <Typography fontFamily='Inter' fontSize={16} fontWeight={700}>Course 1</Typography>
                        </Stack>
                        <Typography fontFamily='Inter' fontSize={16} fontWeight={700}>2 Lessons</Typography>
                        <Typography fontFamily='Inter' fontSize={16} fontWeight={700}>5 Hours</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ background: '#F8F8F8', paddingY: 0, paddingX: 0 }}>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        flex={1}
                        height='50px'
                        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                        alignItems='center'
                    >
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>Introductory Lesson</Typography>
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>This lesson is an explanation of the previous prerequisites because why not.</Typography>
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>1:55:00</Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        flex={1}
                        height='50px'
                        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                        alignItems='center'
                    >
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>Introductory Lesson</Typography>
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>This lesson is an explanation of the previous prerequisites because why not.</Typography>
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>1:55:00</Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        flex={1}
                        height='50px'
                        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                        alignItems='center'
                    >
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>Introductory Lesson</Typography>
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>This lesson is an explanation of the previous prerequisites because why not.</Typography>
                        <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>1:55:00</Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Suspense>
    )
}
