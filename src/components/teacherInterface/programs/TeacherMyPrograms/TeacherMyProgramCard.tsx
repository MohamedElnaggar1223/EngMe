import { Box, Stack, Typography, SvgIcon, Button, Accordion, AccordionSummary, AccordionDetails, FormControl, FormHelperText, TextField, TextareaAutosize, Input, InputLabel, Select, MenuItem, Switch, styled, createTheme } from '@mui/material'
import { memo, useState, lazy, Suspense } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
// const Components = lazy(() => import('./Components'))
// // eslint-disable-next-line react-refresh/only-export-components
// const FinalExams = lazy(() => import('./FinalExams'))
// // eslint-disable-next-line react-refresh/only-export-components
// const Discussions = lazy(() => import('./Discussions'))
// // eslint-disable-next-line react-refresh/only-export-components
// const Grades = lazy(() => import('./Grades'))
import ProgramProps from '../../../../interfaces/ProgramProps';
import { useQuery } from '@tanstack/react-query';
import { getProgramsData } from '../../../helpers/getProgramsData';
import { ExpandMore } from '@mui/icons-material';
// eslint-disable-next-line react-refresh/only-export-components
const Components = lazy(() => import('./Components'))

// eslint-disable-next-line react-refresh/only-export-components
function TeacherMyProgramCard(program: ProgramProps) 
{
    const [programPage, setProgramPage] = useState('Components')
    const [expand, setExpand] = useState(false)
    const [edit, setEdit] = useState(false)

    function handleExpand(e: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        console.log(e.target)
        if(e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLInputElement ||  e.target instanceof HTMLButtonElement || e.target instanceof HTMLParagraphElement || e.target instanceof SVGElement)
        {
            return
        }
        else
        {
            setExpand(prev => !prev)
        }
    }

    const {data: prereqs } = useQuery({
        queryKey: ['preReqData', program.id],
        //@ts-expect-error erro
        queryFn: () => getProgramsData(program.prerequisites),
        enabled: !!program.prerequisites
    })

    //@ts-expect-error prereq
    const displayedPrereqs = prereqs?.map(prereq => <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>{prereq?.name}</Typography>) 

    const CustomSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-thumb': {
          backgroundColor: '#ffffff', // White color for the head
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#ff0000', // Green color for the body when checked
          '& .MuiSwitch-thumb': {
            backgroundColor: '#ffffff', // White color for the head when checked
          },
        },
      }));

    const theme = createTheme({
    components: {
        MuiSwitch: {
        styleOverrides: {
            thumb: {
            backgroundColor: '#ffffff', // White color for the head
            },
            switchBase: {
            '&.Mui-checked': {
                color: '#1DC9A0', // Green color for the body when checked
                '& .MuiSwitch-thumb': {
                backgroundColor: '#ffffff', // White color for the head when checked
                },
            },
            },
        },
        },
    },
    });
    
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
                                    {program?.name}
                                </Typography>
                                <SvgIcon onClick={() => setEdit(prev => !prev)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                                        <rect width="27" height="25" rx="5" fill="#D0EBFC"/>
                                        <path d="M22.1835 11.238C21.7321 11.238 21.366 11.604 21.366 12.0554V19.5213C21.366 20.5377 20.5395 21.3651 19.5223 21.3651H6.47956C5.46231 21.3651 4.63579 20.5377 4.63579 19.5213V6.47866C4.63579 5.46231 5.46231 4.63488 6.47956 4.63488H14.0354C14.4868 4.63488 14.8529 4.26885 14.8529 3.81744C14.8529 3.36603 14.4868 3 14.0354 3H6.47956C4.56131 3 3 4.5604 3 6.47866V19.5213C3 21.4396 4.56131 23 6.47956 23H19.5223C21.4405 23 23.0018 21.4396 23.0018 19.5213V12.0554C23.0018 11.604 22.6349 11.238 22.1835 11.238Z" fill="#226E9F"/>
                                        <path d="M17.4441 3.82134L10.1716 11.0938C9.61938 11.6451 9.35145 12.4281 9.44681 13.2019L9.42774 15.7487C9.42683 15.9676 9.51312 16.1783 9.66752 16.3327C9.82102 16.4862 10.029 16.5725 10.2461 16.5725C10.2479 16.5725 10.2506 16.5725 10.2524 16.5725L12.7992 16.5534C13.5694 16.6488 14.3551 16.3817 14.9064 15.8295L22.1798 8.55704C22.633 8.10381 22.8864 7.50345 22.8937 6.86676C22.9019 6.2237 22.6566 5.61971 22.2052 5.16921L20.8319 3.79682C19.9037 2.86857 18.3841 2.88129 17.4441 3.82134ZM21.2579 6.84677C21.2561 7.05386 21.1716 7.25004 21.0217 7.39991L13.7484 14.6724C13.5458 14.874 13.2615 14.9721 12.9736 14.9267C12.9318 14.9203 12.891 14.9176 12.8492 14.9176C12.8474 14.9176 12.8446 14.9176 12.8428 14.9176L11.0681 14.9312L11.0817 13.1556C11.0817 13.112 11.0781 13.0693 11.0717 13.0257C11.0281 12.7423 11.1235 12.4517 11.326 12.25L18.5985 4.97756C18.9037 4.67511 19.3851 4.6624 19.6757 4.95122L21.049 6.32361C21.1861 6.46167 21.2606 6.64696 21.2579 6.84677Z" fill="#226E9F"/>
                                    </svg>
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
                            width={{xs: '40%', sm: '40%', lg: '35%'}}
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
                            {displayedPrereqs}
                        </Stack>
                        <Box
                            px={6}
                            pl={10}
                            bgcolor='#FEF4EB'
                            py={4}
                            sx={{
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                            // width='100%'
                        >
                            <Stack
                                py={8}
                            >

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
                                    <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>{program.duration}</Typography>
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
                            </Stack>

                        </Box>
                    </Box>
                    {
                        edit &&
                        <Box
                            bgcolor='#FFFBF8'
                            px={1}
                            pb={2.5}
                            pt={6}
                        >
                            <Stack
                                direction='row'
                                flex={1}
                                gap={12}
                            >
                                <Stack
                                    direction='column'
                                    gap={8}
                                >
                                    <Stack
                                        gap={1.5}
                                    >
                                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='ProgramName'>Program's Name</InputLabel>
                                        <Input 
                                            color='primary' 
                                            disableUnderline
                                            aria-labelledby='ProgramName'
                                            sx={{
                                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                                width: '420px',
                                                background: '#fff',
                                                borderRadius: '5px',
                                                paddingX: 1,
                                                paddingY: 0.5,
                                                flex: 1,
                                                bgcolor: '#F8F8F8'
                                            }}
                                        />
                                    </Stack>
                                    <Stack
                                        gap={1.5}
                                    >
                                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='ProgramType'>Program's Type</InputLabel>
                                        <Input 
                                            color='primary' 
                                            disableUnderline
                                            aria-labelledby='ProgramType'
                                            sx={{
                                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                                width: '420px',
                                                background: '#fff',
                                                borderRadius: '5px',
                                                paddingX: 1,
                                                paddingY: 0.5,
                                                flex: 1,
                                                bgcolor: '#F8F8F8'
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    gap={1.5}
                                    flex={1}
                                >
                                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='ProgramType'>Program's Type</InputLabel>
                                    <TextareaAutosize
                                        color='primary'
                                        aria-labelledby='ProgramType'
                                        minRows={2} // Set the minimum number of rows you want
                                        style={{
                                            border: '1px solid rgba(0, 0, 0, 0.20)',
                                            width: '95%',
                                            background: '#fff',
                                            borderRadius: '5px',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            paddingRight: 10,
                                            paddingLeft: 10,
                                            flex: 1,
                                            backgroundColor: '#F8F8F8',
                                            overflowWrap: 'break-word',
                                            height: '100% !important',
                                            fontSize: '16px',
                                            fontFamily: 'Inter',
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack
                                direction='row'
                                gap={3}
                                mt={8}
                            >
                                <Stack
                                    gap={1.5}
                                    flex={1}
                                >
                                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='ProgramType'>Program's Type</InputLabel>
                                    <Input 
                                        color='primary' 
                                        disableUnderline
                                        aria-labelledby='ProgramType'
                                        sx={{
                                            border: '1px solid rgba(0, 0, 0, 0.20)',
                                            width: '100%',
                                            background: '#fff',
                                            borderRadius: '5px',
                                            paddingX: 1,
                                            paddingY: 0.5,
                                            flex: 1,
                                            bgcolor: '#F8F8F8'
                                        }}
                                    />
                                </Stack>
                                <Stack
                                    gap={1.5}
                                    flex={1}
                                >
                                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='ProgramType'>Program's Type</InputLabel>
                                    <Input 
                                        color='primary' 
                                        disableUnderline
                                        aria-labelledby='ProgramType'
                                        sx={{
                                            border: '1px solid rgba(0, 0, 0, 0.20)',
                                            width: '100%',
                                            background: '#fff',
                                            borderRadius: '5px',
                                            paddingX: 1,
                                            paddingY: 0.5,
                                            flex: 1,
                                            bgcolor: '#F8F8F8'
                                        }}
                                    />
                                </Stack>
                                <Stack
                                    gap={1.5}
                                    flex={1}
                                >
                                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id="Level">Level</InputLabel>
                                    <Select
                                        // labelId="demo-select-small-label"
                                        // id="demo-select-small"
                                        sx={{
                                            width: '180px !important',
                                            flex: 1,
                                            boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                            borderRadius: '4px !important',
                                            outline: 'none !important',
                                            boxSizing: 'border-box !important',
                                            background: '#F8F8F8',
                                            paddingX: 1,
                                            '&:hover': {
                                                boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                                background: '#F8F8F8',
                                            }, fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000',
                                            textAlign: 'left'
                                        }}
                                        // value={day}
                                        IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(0, 0, 0, 0.20)', color: '#000', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '75%' }} />}
                                        inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                                        variant='standard'
                                        disableUnderline
                                        color='primary'
                                        labelId="Level"
                                    >
                                        <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='Beginner'>Beginner</MenuItem>
                                        <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='Intermediate'>Intermediate</MenuItem>
                                        <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='Expert'>Expert</MenuItem>
                                    </Select>
                                </Stack>
                                <Stack
                                    gap={1.5}
                                    width='150px'
                                    alignItems='center'
                                    justifyContent='center'
                                    pl={-8}
                                >
                                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }}>New Students</InputLabel>
                                    <CustomSwitch />
                                </Stack>
                            </Stack>
                        </Box>
                    }
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
                        gap={4}
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
                        // <ProgramCurrentCardContext.Provider value={{ completed }}>
                        //     {
                        //         // !coursesLoading && !assessmentsLoading && !quizzesLoading && !lessonsLoading && !studentAssessmentLoading && !studentLessonLoading && !studentQuizzesLoading &&
                        //         programPage === 'Components' ?
                        //         <Suspense>
                        //             <Components {...program} /> 
                        //         </Suspense>
                        //         :
                        //         programPage === 'Exams' ?
                        //         <Suspense>
                        //             <FinalExams progress={Number(progress)} program={program} />
                        //         </Suspense>
                        //         :
                        //         programPage === 'Grades' ?
                        //         <Suspense>
                        //             <Grades {...program} />
                        //         </Suspense>
                        //         :
                        //         <Suspense>
                        //             <Discussions {...program} />
                        //         </Suspense>
                        //     }
                        // </ProgramCurrentCardContext.Provider>
                        programPage === 'Components' &&
                        <Suspense>
                            <Components {...program} /> 
                        </Suspense>
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

const memoizedProgramCurrentCard = memo(TeacherMyProgramCard)
export default memoizedProgramCurrentCard