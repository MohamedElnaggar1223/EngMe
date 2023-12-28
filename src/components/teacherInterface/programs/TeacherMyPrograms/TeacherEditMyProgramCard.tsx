import { useContext, useState } from "react"
import { Typography, Stack, styled, SwitchProps, Switch, Box, Input, InputLabel, MenuItem, Select, TextareaAutosize, Button, SvgIcon, Avatar, Alert } from "@mui/material"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import ProgramProps from "../../../../interfaces/ProgramProps"
import { setTeacherRemovePrereq } from "../../../helpers/setTeacherRemovePrereq"
import { getProgramsData } from "../../../helpers/getProgramsData"
import ClearIcon from '@mui/icons-material/Clear';
import { ExpandMore } from "@mui/icons-material"
import { AuthContext } from "../../../authentication/auth/AuthProvider"
import { setProgramData } from "../../../helpers/setProgramData"

interface TeacherEditMyProgramCardProps{
    program: ProgramProps | undefined,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TeacherEditMyProgramCard({program, setEdit}: TeacherEditMyProgramCardProps) 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [programName, setProgramName] = useState(program?.name ?? '')
    const [programType, setProgramType] = useState(program?.category ?? '')
    const [programDesc, setProgramDesc] = useState(program?.description ?? '')
    const [duration, setDuration] = useState(program?.duration ?? '')
    const [expiry, setExpiry] = useState(program?.expiry ?? '')
    const [level, setLevel] = useState(program?.level ?? 'Beginner')
    const [image, setImage] = useState(program?.image ?? '')
    const [paused, setPaused] = useState(program?.paused ?? false)
    const [newPrereq, setNewPrePreq] = useState('')
    const [error, setError] = useState('')

    const {data: prereqs } = useQuery({
        queryKey: ['preReqData', program?.id],
        //@ts-expect-error erro
        queryFn: () => getProgramsData(program?.prerequisites),
        enabled: !!program?.prerequisites
    })

    const { mutate: mutatePrereq } = useMutation({
        onMutate: (prereqId: string) => {
            const previousData = queryClient.getQueryData(['preReqData', program?.id])

            queryClient.setQueryData(['preReqData', program?.id], (oldData: unknown) => {
                //@ts-expect-error programData
                const filteredData = oldData.slice().filter(programData => programData.id !== prereqId)
                return filteredData
            })

            return () => queryClient.setQueryData(['preReqData', program?.id], previousData)
        },
        mutationFn: (prereqId: string) => setTeacherRemovePrereq(program?.id ?? '', prereqId)
    })

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setImage(result),
        );
    };

    const canSave = [programName, programDesc, programType, duration, expiry, level, image].every(Boolean)

    const { mutate: mutateEdit } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['teacherPrograms', userData?.id])

            queryClient.setQueryData(['teacherPrograms', userData?.id], (oldData: []) => {
                //@ts-expect-error program
                const filteredArray = oldData.slice().filter(programData => programData.id !== program?.id)
                const newArray = [...filteredArray, program ? {...program, name: programName, category: programType, description: programDesc, duration, expiry, level, paused} : {name: programName, category: programType, description: programDesc, duration, expiry, level, paused, courses: [], prerequisites: [], averageRating: 5, totalFeedbacks: 0, teacherId: userData?.id, image } ]

                return newArray
            })

            return () => queryClient.setQueryData(['teacherPrograms', userData?.id], previousData)
        },
        mutationFn: () => setProgramData(userData?.id, programName, programDesc, programType, level, duration, expiry, paused, newPrereq, program, image ?? '')
    })

    const displayedEditPrereqs = prereqs?.map(prereq =>  
        <Stack
            position='relative'
            alignItems='flex-end'
            justifyContent='flex-end'
            gap={6}
            // height='100%'
            pb={1.2}
        >
            <ClearIcon onClick={() => mutatePrereq(prereq.id)} sx={{ bgcolor: '#D9D9D9', borderRadius: '50%', fontSize: 16, position: 'absolute', top: '30%', left: '100%', cursor: 'pointer' }} />
            {/*//@ts-expect-error prereq*/}
            <Typography noWrap sx={{ textDecoration: 'underline' }} fontSize={18} fontFamily='Inter' fontWeight={400}>{prereq?.name}</Typography>
        </Stack>
    ) 

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
    }));

    return (
        <Box
            bgcolor='#FFFBF8'
            px={1}
            pb={8}
            pt={8}
        >
            {
                error &&
                <Alert sx={{ mb: 4 }} severity="error">{error}</Alert>
            }
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
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
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
                            value={programType}
                            onChange={(e) => setProgramType(e.target.value)}
                        />
                    </Stack>
                </Stack>
                <Stack
                    gap={1.5}
                    flex={1}
                >
                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='ProgramType'>Program's Description</InputLabel>
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
                        value={programDesc}
                        onChange={(e) => setProgramDesc(e.target.value)}
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
                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='Expiry'>Expiry</InputLabel>
                    <Input 
                        color='primary' 
                        disableUnderline
                        aria-labelledby='Expiry'
                        sx={{
                            border: '1px solid rgba(0, 0, 0, 0.20)',
                            width: '100%',
                            minWidth: '420px',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingX: 1,
                            paddingY: 0.5,
                            flex: 1,
                            bgcolor: '#F8F8F8'
                        }}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                    />
                </Stack>
                <Stack
                    gap={1.5}
                    flex={1}
                >
                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='Duration'>Duration</InputLabel>
                    <Input 
                        color='primary' 
                        disableUnderline
                        aria-labelledby='Duration'
                        sx={{
                            border: '1px solid rgba(0, 0, 0, 0.20)',
                            width: '100%',
                            minWidth: '420px',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingX: 1,
                            paddingY: 0.5,
                            flex: 1,
                            bgcolor: '#F8F8F8'
                        }}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
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
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
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
                    <IOSSwitch checked={!paused} onChange={() => setPaused(prev => !prev)} />
                </Stack>
            </Stack>
            <Stack
                direction='row'
                gap={3}
                mt={8}
            >
                <Stack
                    gap={1.5}
                    // flex={1}
                    direction='column'
                    width='fit-content'
                >
                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='Prereqs'>Prerequisites</InputLabel>
                    <Input 
                        color='primary' 
                        disableUnderline
                        aria-labelledby='Prereqs'
                        sx={{
                            border: '1px solid rgba(0, 0, 0, 0.20)',
                            width: '420px',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingX: 1,
                            paddingY: 0.5,
                            bgcolor: '#F8F8F8'
                        }}
                        value={newPrereq}
                        onChange={(e) => setNewPrePreq(e.target.value)}
                    />
                </Stack>
                <Stack
                    direction='row'
                    gap={6}
                    justifyContent='flex-start'
                    flex={1}
                >
                    {displayedEditPrereqs}
                </Stack>
                {
                    program === undefined &&
                    <Button
                        component="label"
                        sx={{
                            width: "fit-content",
                            color: "#2ed480",
                            textTransform: "capitalize",
                            fontSize: 16,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mr: 8,
                            gap: 1.5,
                            '&:hover': {
                                bgcolor: '#FFFBF8'
                            }
                        }}
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                handleImageChange(e.target.files![0]);
                            }}
                        />
                        {
                            image === '' ?
                            <SvgIcon sx={{ cursor: 'pointer', fontSize: 88 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
                                    <circle cx="41" cy="41" r="41" fill="#226E9F"/>
                                    <path d="M41.8633 37.6064V55.1412C41.8633 55.6064 41.4673 56 40.9994 56C40.5314 56 40.1354 55.6064 40.1354 55.1412V37.6064L36.7155 41.1849C36.3915 41.5428 35.8155 41.5428 35.4556 41.2207C35.0956 40.8987 35.0956 40.3261 35.4196 39.9683L40.3514 34.851C40.5314 34.672 40.7474 34.5647 40.9994 34.5647C41.2513 34.5647 41.4673 34.672 41.6473 34.851L46.5792 39.9683C46.9031 40.3261 46.9031 40.8629 46.5432 41.2207C46.3632 41.3997 46.1472 41.4712 45.9312 41.4712C45.7152 41.4712 45.4632 41.3639 45.2832 41.1849L41.8633 37.6064ZM58.9987 41.5786C58.8907 37.3917 55.9028 33.1333 50.431 33.1333C50.287 33.1333 50.143 33.1333 49.999 33.1333C49.639 31.4514 48.8831 29.9484 47.6951 28.7317C46.4352 27.4434 44.7792 26.5488 42.9433 26.191C39.1994 25.4395 35.5635 26.9425 33.5116 30.0558C31.3877 29.8053 29.3358 30.4852 27.7158 31.9166C26.0599 33.3838 25.1959 35.4593 25.3039 37.6064C23.828 39.0021 23 40.9345 23 42.9384C23 47.0179 26.3479 50.3102 30.4157 50.3102H37.4715C37.9395 50.3102 38.3355 49.9165 38.3355 49.4513C38.3355 48.9861 37.9395 48.5925 37.4715 48.5925H30.4157C27.2838 48.5925 24.7639 46.0517 24.7639 42.9742C24.7639 41.3281 25.5199 39.7535 26.8159 38.6442C27.0319 38.4653 27.1399 38.179 27.1399 37.8927C26.9599 36.1035 27.6438 34.4216 28.9758 33.2049C30.3077 32.0239 32.0717 31.523 33.8356 31.8808C34.1956 31.9524 34.5916 31.7734 34.7716 31.4514C36.3555 28.6601 39.4154 27.2645 42.6193 27.9444C45.1392 28.4454 47.9831 30.3778 48.4151 34.2068C48.4511 34.4573 48.5591 34.672 48.7391 34.8152C48.9191 34.9583 49.1711 35.0299 49.4231 34.9941C49.747 34.9583 50.107 34.9225 50.467 34.9225C55.0389 34.9225 57.1988 38.4295 57.2708 41.6502C57.3428 44.9424 55.2548 48.3778 50.431 48.5925H44.5272C44.0592 48.5925 43.6633 48.9861 43.6633 49.4513C43.6633 49.9165 44.0592 50.3102 44.5272 50.3102H50.431H50.467C53.1669 50.167 55.4348 49.165 56.9828 47.4116C58.3147 45.8728 59.0347 43.7973 58.9987 41.5786Z" fill="white"/>
                                </svg>
                            </SvgIcon>
                            :
                            <Avatar src={image} sx={{ width: '82px', height: '82px' }} />
                        }
                        <Typography fontWeight={400} fontFamily='Inter' sx={{ cursor: 'pointer', color: '#226E9F' }}>Upload Program's Image</Typography>
                    </Button>
                }
            </Stack>
            <Stack
                flex={1}
                justifyContent='flex-end'
                direction='row'
                mt={3}
                mr={4}
                pb={2}
                alignItems='center'
            >
                <Stack
                    gap={1.5}
                    flex={1}
                    minHeight='75px'
                >
                    <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id="Certificate">Certificate Request</InputLabel>
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
                        labelId="Certificate"
                        defaultValue='Anytime'
                    >
                        <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='Anytime'>Anytime</MenuItem>
                    </Select>
                </Stack>
                <Stack
                    direction='row'
                    gap={3}
                    mt='auto'
                >
                    <Button
                        sx={{
                            width: '120px',
                            height: '35px',
                            background: '#fff',
                            color: '#226E9F',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '1px solid #226E9F',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#fff',
                                opacity: 1
                            },
                        }}
                        onClick={() => setEdit(prev => !prev)}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            width: '120px',
                            height: '35px',
                            background: '#6A9DBC',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '1px solid #6A9DBC',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#6A9DBC',
                                opacity: 1
                            },
                        }}
                        onClick={() => {
                            (canSave && 
                            setEdit(prev => !prev))
                            canSave ?
                            mutateEdit() :
                            setError('Please Enter All Details!')
                        }}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}
