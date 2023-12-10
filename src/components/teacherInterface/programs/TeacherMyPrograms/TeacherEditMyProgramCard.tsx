import { useContext, useState } from "react"
import { Typography, Stack, styled, SwitchProps, Switch, Box, Input, InputLabel, MenuItem, Select, TextareaAutosize, Button } from "@mui/material"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import ProgramProps from "../../../../interfaces/ProgramProps"
import { setTeacherRemovePrereq } from "../../../helpers/setTeacherRemovePrereq"
import { getProgramsData } from "../../../helpers/getProgramsData"
import ClearIcon from '@mui/icons-material/Clear';
import { ExpandMore } from "@mui/icons-material"
import { AuthContext } from "../../../authentication/auth/AuthProvider"
import { setProgramData } from "../../../helpers/setProgramData"

interface TeacherEditMyProgramCardProps{
    program: ProgramProps,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TeacherEditMyProgramCard({program, setEdit}: TeacherEditMyProgramCardProps) 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [programName, setProgramName] = useState(program.name ?? '')
    const [programType, setProgramType] = useState(program.category ?? '')
    const [programDesc, setProgramDesc] = useState(program.description ?? '')
    const [duration, setDuration] = useState(program.duration ?? '')
    const [expiry, setExpiry] = useState(program.expiry ?? '')
    const [level, setLevel] = useState(program.level ?? 'Beginner')
    const [paused, setPaused] = useState(program.paused ?? false)
    const [newPrereq, setNewPrePreq] = useState('')

    const {data: prereqs } = useQuery({
        queryKey: ['preReqData', program.id],
        //@ts-expect-error erro
        queryFn: () => getProgramsData(program.prerequisites),
        enabled: !!program.prerequisites
    })

    const { mutate: mutatePrereq } = useMutation({
        onMutate: (prereqId: string) => {
            const previousData = queryClient.getQueryData(['preReqData', program.id])

            queryClient.setQueryData(['preReqData', program.id], (oldData: unknown) => {
                //@ts-expect-error programData
                const filteredData = oldData.slice().filter(programData => programData.id !== prereqId)
                return filteredData
            })

            return () => queryClient.setQueryData(['preReqData', program.id], previousData)
        },
        mutationFn: (prereqId: string) => setTeacherRemovePrereq(program.id, prereqId)
    })

    const { mutate: mutateEdit } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['teacherPrograms', userData?.id])

            queryClient.setQueryData(['teacherPrograms', userData?.id], (oldData: []) => {
                //@ts-expect-error program
                const filteredArray = oldData.slice().filter(programData => programData.id !== program.id)
                const newArray = [...filteredArray, {...program, name: programName, category: programType, description: programDesc, duration, expiry, level, paused}]

                return newArray
            })

            return () => queryClient.setQueryData(['teacherPrograms', userData?.id], previousData)
        },
        mutationFn: () => setProgramData(userData?.id, programName, programDesc, programType, level, duration, expiry, paused, newPrereq, program)
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
                    <IOSSwitch checked={!paused} onChange={(e) => setPaused(e.target.checked)} />
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
                            setEdit(prev => !prev)
                            mutateEdit()
                        }}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}
