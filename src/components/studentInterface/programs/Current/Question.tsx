import { Suspense, lazy } from "react";
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'));
import { Accordion, AccordionSummary, Stack, SvgIcon, Typography, AccordionDetails } from "@mui/material";

interface Question{
    question: unknown,
    answer: unknown,
    index: number
}

export default function Question({ question, answer, index }: Question) 
{
    //@ts-expect-error question
    const icon = Number(question?.correctOption) === answer ?
    (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M12.5 25C14.9723 25 17.389 24.2669 19.4446 22.8934C21.5002 21.5199 23.1024 19.5676 24.0485 17.2835C24.9946 14.9995 25.2421 12.4861 24.7598 10.0614C24.2775 7.63661 23.087 5.40933 21.3388 3.66117C19.5907 1.91301 17.3634 0.722505 14.9386 0.24019C12.5139 -0.242126 10.0005 0.0054161 7.71645 0.951511C5.43238 1.89761 3.48015 3.49976 2.10663 5.55538C0.733112 7.61099 0 10.0277 0 12.5C0 15.8152 1.31696 18.9946 3.66116 21.3388C6.00537 23.683 9.18479 25 12.5 25ZM6.01136 12.8295C6.22427 12.6179 6.51229 12.4991 6.8125 12.4991C7.11271 12.4991 7.40072 12.6179 7.61363 12.8295L10.2273 15.4432L16.8068 8.86364C17.0242 8.67747 17.3038 8.58019 17.5898 8.59124C17.8758 8.60229 18.1471 8.72085 18.3495 8.92323C18.5519 9.12561 18.6704 9.3969 18.6815 9.6829C18.6925 9.96889 18.5953 10.2485 18.4091 10.4659L11.0227 17.8523C10.8098 18.0639 10.5218 18.1827 10.2216 18.1827C9.92138 18.1827 9.63336 18.0639 9.42045 17.8523L6.01136 14.4432C5.90485 14.3375 5.82031 14.2119 5.76262 14.0734C5.70493 13.9349 5.67523 13.7864 5.67523 13.6364C5.67523 13.4864 5.70493 13.3378 5.76262 13.1993C5.82031 13.0609 5.90485 12.9352 6.01136 12.8295Z" fill="white"/>
        </svg>
    ) 
    :
    (
        
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M18.0324 16.2672C18.1538 16.3907 18.2219 16.5569 18.2219 16.73C18.2219 16.9032 18.1538 17.0694 18.0324 17.1929L17.1929 18.0324C17.0694 18.1538 16.9032 18.2218 16.7301 18.2218C16.5569 18.2218 16.3907 18.1538 16.2672 18.0324L12.5 14.2724L8.73278 18.0396C8.60932 18.161 8.4431 18.229 8.26995 18.229C8.09681 18.229 7.93059 18.161 7.80712 18.0396L6.96757 17.2001C6.84618 17.0766 6.77815 16.9104 6.77815 16.7372C6.77815 16.5641 6.84618 16.3979 6.96757 16.2744L10.7276 12.5L6.96039 8.73278C6.839 8.60931 6.77098 8.44309 6.77098 8.26995C6.77098 8.0968 6.839 7.93058 6.96039 7.80712L7.79995 6.96756C7.92341 6.84617 8.08963 6.77815 8.26278 6.77815C8.43592 6.77815 8.60214 6.84617 8.72561 6.96756L12.5 10.7276L16.2672 6.96039C16.3907 6.839 16.5569 6.77097 16.7301 6.77097C16.9032 6.77097 17.0694 6.839 17.1929 6.96039L18.0324 7.79994C18.1538 7.92341 18.2219 8.08962 18.2219 8.26277C18.2219 8.43592 18.1538 8.60213 18.0324 8.7256L14.2724 12.5L18.0324 16.2672ZM12.5 0C10.0277 0 7.61099 0.733112 5.55538 2.10663C3.49976 3.48015 1.89761 5.43238 0.951511 7.71645C0.00541608 10.0005 -0.242126 12.5139 0.24019 14.9386C0.722505 17.3634 1.91301 19.5907 3.66117 21.3388C5.40933 23.087 7.63661 24.2775 10.0614 24.7598C12.4861 25.2421 14.9995 24.9946 17.2835 24.0485C19.5676 23.1024 21.5199 21.5002 22.8934 19.4446C24.2669 17.389 25 14.9723 25 12.5C25 9.18479 23.683 6.00537 21.3388 3.66116C18.9946 1.31696 15.8152 0 12.5 0Z" fill="white"/>
        </svg>
    )

    //@ts-expect-error question
    const displayedOptions = question?.options.map((option, index) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            flex={1}
            minHeight='50px'
            height='auto'
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
            alignItems='center'
            //@ts-expect-error question
            bgcolor={index === Number(question?.correctOption) ? '#A0F4BD' : index === answer ? '#FCD0D0' : '#fff'}
            key={option}
        >
            <Typography fontFamily='Inter' fontSize={14} fontWeight={500}>{option}</Typography>
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
                            {/*//@ts-expect-error question*/}
                            <SvgIcon sx={{ background: Number(question?.correctOption) === answer ? '#00C342' : '#E80505', borderRadius: '50%' }}>
                                {icon}
                            </SvgIcon>
                            <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>Question {index + 1}</Typography>
                        </Stack>
                        <Typography sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>1 Mark</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ background: '#F8F8F8', paddingY: 0, paddingX: 0 }}>
                    <Stack
                        direction='row'
                        justifyContent='center'
                        flex={1}
                        height='50px'
                        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingX: 8, paddingY: 0.5 }}
                        alignItems='center'
                        bgcolor='#D0EBFC'
                    >       
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: -5 }} fontFamily='Inter' fontSize={14} fontWeight={500}>
                            {/*//@ts-expect-error question*/}
                            {question?.question}?
                        </Typography>
                    </Stack>
                    {displayedOptions}
                </AccordionDetails>
            </Accordion>
        </Suspense>
    )
}
