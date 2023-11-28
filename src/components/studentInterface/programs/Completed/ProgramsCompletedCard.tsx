import { Accordion, AccordionSummary, Box, Stack, Typography, SvgIcon, Avatar, Button, AccordionDetails, Input } from "@mui/material"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import Discussions from "../Current/Discussions"
import FinalExams from "../Current/FinalExams"
import Grades from "../Current/Grades"
import Components from "../Current/Components"
import avatar from '../../../../assets/Ellipse 3.png'
import star from '../../../../assets/Star 4.png'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarRateIcon from '@mui/icons-material/StarRate';

export default function ProgramsCompletedCard() 
{
    const [programPage, setProgramPage] = useState('Components')
    const [expand, setExpand] = useState(false)
    const [selectedStars, setSelectedStars] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [submitFeedback, setSubmitFeedback] = useState(false)
    const [disappear, setDisappear] = useState(false)

    useEffect(() => {
        if(submitFeedback) setTimeout(() => setDisappear(true), 1500)
    }, [submitFeedback])

    function handleExpand(e: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if(e.target instanceof HTMLInputElement ||  e.target instanceof HTMLButtonElement || e.target instanceof HTMLParagraphElement || e.target instanceof SVGElement)
        {
            return
        }
        else
        {
            setExpand(prev => !prev)
        }
    }

    return (
        <Accordion expanded={expand} sx={{ width: 'auto', '.css-o4b71y-MuiAccordionSummary-content': { margin: 0 }, padding: 0, height: 'auto' , borderRadius: '20px', overflow: 'hidden'}} 
            TransitionProps={{ 
                style: { 
                    borderRadius: '20px',
                } 
            }}
        >
            <AccordionSummary
                sx={{
                    padding: 0,
                    margin: '0 !important',
                    boxShadow: 'none',
                    height: 'auto',
                    overflow: 'hidden',
                    flex: 1,
                    width: '100% !important',
                    // background: '#E8E8E8',
                }}
            >
                <Box
                    maxWidth='100%'
                    flex={1}
                    onClick={(e) => handleExpand(e)}
                >
                    <Box
                        p={3}
                        display='flex'
                        flexDirection={{xs: 'column', sm: 'column', lg: 'row'}}
                        justifyContent='space-between'
                        alignItems='center'
                        bgcolor='#FFFBF8'
                        m={0}
                        width='auto'
                        flexWrap='wrap'
                        flex={1}
                    >
                        <Stack
                            direction='column'
                            gap={2}
                            bgcolor='#FFFBF8'
                            width={{xs: '40%', sm: '40%', lg: '35%'}}
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
                                    Data Engineering with AWS
                                </Typography>
                                <SvgIcon sx={{ fontSize: 24 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path d="M6.14963 19.1713C4.44636 20.0668 2.90407 18.9476 3.22957 17.0498L3.99423 12.5915L0.755079 9.43408C-0.622893 8.09089 -0.0350361 6.27823 1.87044 6.00135L6.34684 5.35089L8.34874 1.2946C9.20037 -0.431002 11.106 -0.432061 11.9581 1.2946L13.96 5.35089L18.4364 6.00135C20.3407 6.27806 20.9306 8.09007 19.5518 9.43408L16.3126 12.5915L17.0773 17.0498C17.4026 18.9464 15.8616 20.0673 14.1572 19.1713L10.1534 17.0664L6.14963 19.1713ZM9.22844 15.0107C9.77849 14.7215 10.5263 14.7204 11.0784 15.0107L14.7783 16.9559L14.0717 12.836C13.9667 12.2235 14.1967 11.5119 14.6434 11.0765L17.6367 8.15877L13.5001 7.55768C12.8851 7.46832 12.2795 7.02965 12.0034 6.47029L10.1534 2.72187L8.30348 6.47029C8.02846 7.02755 7.4241 7.46799 6.80681 7.55768L2.67018 8.15877L5.66347 11.0765C6.10847 11.5103 6.3406 12.2211 6.23515 12.836L5.52853 16.9559L9.22844 15.0107Z" fill="#FF7E00"/>
                                    </svg>
                                </SvgIcon>
                            </Stack>
                            <Stack
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Typography fontSize={16} fontWeight={400} fontFamily='Inter'>Nanodegree Program</Typography>
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
                                        4.3
                                    </Typography>
                                    <Typography
                                        fontFamily='Inter'
                                        fontSize={16}
                                        fontWeight={400}
                                        ml={0.5}
                                    >
                                        {'(1290)'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            width={{xs: '40%', sm: '40%', lg: '35%'}}
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={400}
                                fontFamily='Inter'
                            >
                                Learn to design data models, build data 
                                warehouses and data lakes, automate data 
                                pipelines, and work with massive datasets.
                            </Typography>
                        </Stack>
                    </Box>
                    <Box
                    >
                        <Stack
                            flexWrap='wrap'
                            gap={{ xs: 2, sm: 2, lg: 6}}
                            direction='row'
                            pl={6}
                            pb={2}
                            pt={4}
                            bgcolor='#FFFBF8'
                        >
                            <Typography fontSize={18} fontFamily='Inter' fontWeight={600}>Prerequisites:</Typography>
                            <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>Intermediate Python</Typography>
                            <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>Intermediate SQL</Typography>
                            <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>Intermediate SQL</Typography>
                            <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>Intermediate SQL</Typography>
                        </Stack>
                        <Box
                            px={6}
                            pl={10}
                            bgcolor='#FEF4EB'
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
                                    <Avatar src={avatar} sx={{ width: '70px', height: '70px' }} />
                                    <Stack
                                        direction='column'
                                        justifyContent='center'
                                        gap={0.5}
                                    >
                                        <Typography sx={{ color: '#000' }} fontFamily='Inter' fontSize={12} fontWeight={600}>Dr. Ahmed El Adl | Professor in Human Biology</Typography>
                                        <Stack
                                            direction='row'
                                            justifyContent='space-between'
                                            gap={1}
                                        >
                                            <Typography fontFamily='Inter' fontSize={12} fontWeight={500}>The German University in Cairo</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction='column'
                                    position='relative'
                                >
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
                                            series={[20, 83]}
                                            type="donut"
                                            width="120px"
                                        />
                                        <img src={star} width='40px' height='40px' style={{ position: 'absolute', top: 18, left: 40.5 }} />
                                        <Typography fontSize={12} style={{ position: 'absolute', top: 30, left: 50 }} sx={{ color: '#fff' }}>83%</Typography>
                                    </Box>
                                    
                                </Stack>
                            </Stack>

                            <Stack
                                mt={7}
                                ml={-6}
                                justifyContent='space-between'
                                direction='row'
                            >
                                <Stack
                                    direction='row'
                                    gap={1}
                                    flexWrap='wrap'
                                    height='fit-content'
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

                                <Button
                                    sx={{
                                        marginLeft: 'auto',
                                        marginRight: 24,
                                        marginTop: -10,
                                        width: '300px',
                                        height: '50px',
                                        background: '#fff',
                                        color: '#226E9F',
                                        fontFamily: 'Inter',
                                        fontSize: 14,
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        border: '1px solid #226E9F',
                                        borderRadius: '15px',
                                        '&:hover': {
                                            background: '#fff',
                                            opacity: 1
                                        }
                                    }}
                                    onClick={() => console.log('ts')}
                                >
                                    Request Certificate
                                </Button>
                            </Stack>
                        </Box>
                        {
                            submitFeedback 
                            ?
                            disappear 
                            ?
                                <></>
                            :
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    py={10}
                                    flex={1}
                                    bgcolor='#FFFBF8'
                                >
                                    <Typography sx={{ color: '#226E9F' }} fontSize={14} fontWeight={700} fontFamily='Inter'>Thank you! Your feedback has been submitted.</Typography>
                                </Box>
                            :
                            <Box
                                bgcolor='#FFFBF8'
                                flex={1}
                                px={4}
                                py={1}
                                sx={{
                                    borderBottomLeftRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                }}
                            >
                                <Typography
                                    fontFamily='Inter'
                                    fontSize={14}
                                    fontWeight={600}
                                    sx={{
                                        color: '#226E9F'
                                    }}
                                    mt={1}
                                >
                                    Let us know about your experience!
                                </Typography>
                                <Stack
                                    gap={6}
                                    direction='row'
                                    mt={3.5}
                                    alignItems='center'
                                >
                                    <Typography 
                                        fontFamily='Inter'
                                        fontSize={12}
                                        fontWeight={500}
                                    >
                                        Program Rating
                                    </Typography>
                                    <Stack
                                        direction='row'
                                        gap={0.2}
                                    >
                                        {
                                            selectedStars >= 1 
                                            ? 
                                            <StarRateIcon onClick={() => selectedStars === 1 ? setSelectedStars(0) : setSelectedStars(1)} style={{ color: '#FF9F06', fontSize: 20 }} /> 
                                            : 
                                            <StarOutlineIcon onClick={() => setSelectedStars(1)} style={{ color: '#FF9F06', fontSize: 20 }} />
                                        }
                                        {
                                            selectedStars >= 2 
                                            ? 
                                            <StarRateIcon onClick={() => selectedStars === 2 ? setSelectedStars(0) : setSelectedStars(2)} style={{ color: '#FF9F06', fontSize: 20 }} /> 
                                            : 
                                            <StarOutlineIcon onClick={() => setSelectedStars(2)} style={{ color: '#FF9F06', fontSize: 20 }} />
                                        }
                                        {
                                            selectedStars >= 3 
                                            ? 
                                            <StarRateIcon onClick={() => selectedStars === 3 ? setSelectedStars(0) : setSelectedStars(3)} style={{ color: '#FF9F06', fontSize: 20 }} /> 
                                            : 
                                            <StarOutlineIcon onClick={() => setSelectedStars(3)} style={{ color: '#FF9F06', fontSize: 20 }} />
                                        }
                                        {
                                            selectedStars >= 4
                                            ? 
                                            <StarRateIcon onClick={() => selectedStars === 4 ? setSelectedStars(0) : setSelectedStars(4)} style={{ color: '#FF9F06', fontSize: 20 }} /> 
                                            : 
                                            <StarOutlineIcon onClick={() => setSelectedStars(4)} style={{ color: '#FF9F06', fontSize: 20 }} />
                                        }
                                        {
                                            selectedStars >= 5 
                                            ? 
                                            <StarRateIcon onClick={() => selectedStars === 5 ? setSelectedStars(0) : setSelectedStars(5)} style={{ color: '#FF9F06', fontSize: 20 }} /> 
                                            : 
                                            <StarOutlineIcon onClick={() => setSelectedStars(5)} style={{ color: '#FF9F06', fontSize: 20 }} />
                                        }
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction='row'
                                >
                                    <Input 
                                        color='primary' 
                                        disableUnderline
                                        value={feedback}
                                        sx={{
                                            border: '1px solid #226E9F',
                                            background: '#fff',
                                            borderRadius: '5px',
                                            paddingX: 2.5,
                                            paddingY: 1.5,
                                            flex: 1,
                                            paddingBottom: 5,
                                            marginY: 0.5,
                                            fontSize: 12
                                        }}
                                        placeholder='50 words max'
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                    <Stack
                                        direction='row'
                                        gap={2}
                                        mr={2}
                                        ml={14}
                                        alignItems='center'
                                    >
                                        <Button
                                            sx={{
                                                width: '140px',
                                                height: '40px',
                                                background: '#fff',
                                                color: '#000',
                                                fontFamily: 'Inter',
                                                fontSize: 14,
                                                textTransform: 'none',
                                                fontWeight: 400,
                                                border: '1px solid #9D9D9D',
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#fff',
                                                    opacity: 1
                                                }
                                            }}
                                            onClick={() => {
                                                setFeedback('')
                                                setSelectedStars(0)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            sx={{
                                                width: '140px',
                                                height: '40px',
                                                background: '#9D9D9D',
                                                color: '#fff',
                                                fontFamily: 'Inter',
                                                fontSize: 14,
                                                textTransform: 'none',
                                                fontWeight: 400,
                                                border: '1px solid #9D9D9D',
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#9D9D9D',
                                                    opacity: 1
                                                }
                                            }}
                                            onClick={() => {
                                                [feedback.length, selectedStars > 0].every(Boolean) && setSubmitFeedback(true)
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        }
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    display='flex'
                    flexDirection='column'
                >
                    <Stack
                        direction='row'
                        flex={1}
                        px={38}
                        mt={4}
                        mb={8}
                        justifyContent='space-between'
                    >
                        <Button
                            sx={{
                                width: '200px',
                                height: '40px',
                                background: programPage === 'Components' ? '#D0EBFC' : '#fff',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #226E9F',
                                borderRadius: '15px',
                                '&:hover': {
                                    background: '#fff',
                                    opacity: 1
                                }
                            }}
                            onClick={() => setProgramPage('Components')}
                        >
                            Components
                        </Button>
                        <Button
                            sx={{
                                width: '200px',
                                height: '40px',
                                background: programPage === 'Exams' ? '#D0EBFC' : '#fff',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #226E9F',
                                borderRadius: '15px',
                                '&:hover': {
                                    background: '#fff',
                                    opacity: 1
                                }
                            }}
                            onClick={() => setProgramPage('Exams')}
                        >
                            Final Exams
                        </Button>
                        <Button
                            sx={{
                                width: '200px',
                                height: '40px',
                                background: programPage === 'Grades' ? '#D0EBFC' : '#fff',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #226E9F',
                                borderRadius: '15px',
                                '&:hover': {
                                    background: '#fff',
                                    opacity: 1
                                }
                            }}
                            onClick={() => setProgramPage('Grades')}
                        >
                            Grades
                        </Button>
                        <Button
                            sx={{
                                width: '200px',
                                height: '40px',
                                background: programPage === 'Discussions' ? '#D0EBFC' : '#fff',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #226E9F',
                                borderRadius: '15px',
                                '&:hover': {
                                    background: '#fff',
                                    opacity: 1
                                }
                            }}
                            onClick={() => setProgramPage('Discussions')}
                        >
                            Discussions
                        </Button>
                    </Stack>
                    {
                        programPage === 'Components' ?
                        <Components /> :
                        programPage === 'Exams' ?
                        <FinalExams /> :
                        programPage === 'Grades' ?
                        <Grades /> :
                        <Discussions />
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
