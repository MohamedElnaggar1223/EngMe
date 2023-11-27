import { useState } from 'react'
import avatar from '../../../../assets/Ellipse 3.png'   
import ProgramsExploreProgramProps from '../../../../interfaces/ProgramsExploreProgramProps'
import { Typography, SvgIcon, Avatar, Button } from '@mui/material'
import { Box, Stack } from '@mui/system'
import ProgramExploreCourseCard from './ProgramExploreCourseCard'
import ProgramExploreCourseComments from './ProgramComments/ProgramExploreCourseComments'

export default function ProgramsExploreProgram({ setPageShowed }: ProgramsExploreProgramProps) 
{
    const [programShow, setProgramShow] = useState('components')

    return (
        <Box
        >
            <Box
                display='flex'
                flexDirection='column'
                borderRadius='20px'
                height='auto'
                overflow='hidden'
            >
                <Box
                    p={3}
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    bgcolor='#FFFBF8'
                    // mx={14}
                    flex={1}
                    // width='100%'
                >
                    <Stack
                        width={{xs: '40%', sm: '40%', lg: '35%'}}
                        direction='row'
                    >
                        <SvgIcon onClick={() => setPageShowed('home')} sx={{ fontSize: 34, marginRight: 2, cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="21" viewBox="0 0 35 21" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8107 20.5607C12.3964 19.9749 12.3964 19.0251 11.8107 18.4393L5.37132 12H33.25C34.0784 12 34.75 11.3284 34.75 10.5C34.75 9.67157 34.0784 9 33.25 9H5.37132L11.8107 2.56066C12.3964 1.97487 12.3964 1.02513 11.8107 0.43934C11.2249 -0.146447 10.2751 -0.146447 9.68934 0.43934L0.68934 9.43934C0.103553 10.0251 0.103553 10.9749 0.68934 11.5607L9.68934 20.5607C10.2751 21.1464 11.2249 21.1464 11.8107 20.5607Z" fill="#060000"/>
                            </svg>
                        </SvgIcon>
                        <Stack
                            direction='column'
                            gap={2}
                            bgcolor='#FFFBF8'
                            flex={1}
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
                                        // ml={0.5}
                                    >
                                        {'(1290)'}
                                    </Typography>
                                </Stack>
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
                        pl={9}
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
                                            <Typography fontSize={11} fontWeight={700} fontFamily='Poppins'>4.3</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack
                                direction='column'
                                mr={12}
                            >
                                <Stack
                                    direction='row'
                                    gap={4}
                                >
                                    <Box display='flex' flexDirection='column' bgcolor='#D0EBFC' alignItems='center' justifyContent='center' textAlign='center' width='58px' border='1px solid #226E9F' borderRadius='10px' height='51px'>
                                        <Typography fontWeight={600} fontFamily='Inter' fontSize={20}>3</Typography>
                                        <Typography fontSize={9} fontWeight={500} fontFamily='Inter'>Final Exams</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' bgcolor='#D0EBFC' alignItems='center' justifyContent='center' textAlign='center' width='58px' border='1px solid #226E9F' borderRadius='10px' height='51px'>
                                        <Typography fontWeight={600} fontFamily='Inter' fontSize={20}>53</Typography>
                                        <Typography fontSize={9} fontWeight={500} fontFamily='Inter'>Students</Typography>
                                    </Box>
                                    <Box display='flex' flexDirection='column' bgcolor='#D0EBFC' alignItems='center' justifyContent='center' textAlign='center' width='58px' border='1px solid #226E9F' borderRadius='10px' height='51px'>
                                        <Typography fontWeight={600} fontFamily='Inter' fontSize={20}>20+</Typography>
                                        <Typography fontSize={9} fontWeight={500} fontFamily='Inter'>Materials</Typography>
                                    </Box>
                                </Stack>
                                <Stack>

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

                    </Box>
                </Box>
            </Box>
            <Stack
                flex={1}
                alignItems='center'
                mt={4}
                mb={6}
                direction='row'
                justifyContent='center'
                gap={2}
            >
                <Button
                    sx={{
                        width: '180px',
                        height: '40px',
                        background: programShow === 'components' ? '#D0EBFC' : '#fff',
                        color: '#226E9F',
                        fontFamily: 'Inter',
                        fontSizze: 14,
                        textTransform: 'none',
                        fontWeight: 400,
                        border: '1px solid #226E9F',
                        borderRadius: '15px',
                        '&:hover': {
                            background: '#fff',
                            opacity: 1
                        }
                    }}
                    onClick={() => setProgramShow('components')}
                >
                    Components
                </Button>
                <Button
                    sx={{
                        width: '180px',
                        height: '40px',
                        background: programShow === 'comments' ? '#D0EBFC' : '#fff',
                        color: '#226E9F',
                        fontFamily: 'Inter',
                        fontSizze: 14,
                        textTransform: 'none',
                        fontWeight: 400,
                        border: '1px solid #226E9F',
                        borderRadius: '15px',
                        '&:hover': {
                            background: '#fff',
                            opacity: 1
                        }
                    }}
                    onClick={() => setProgramShow('comments')}
                >
                    Comments
                </Button>
            </Stack>
            {
                programShow === 'components' ?
                <Stack
                    direction='column'
                    mx={14}
                >
                    <ProgramExploreCourseCard />
                    <ProgramExploreCourseCard />
                    <ProgramExploreCourseCard />
                </Stack> :
                <ProgramExploreCourseComments />
            }
        </Box>
    )
}
