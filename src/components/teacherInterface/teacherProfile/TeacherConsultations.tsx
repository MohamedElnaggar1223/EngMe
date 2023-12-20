import { useContext, useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Button, MenuItem, Select, Stack, SvgIcon, Typography } from '@mui/material'
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getTeacherConsultation } from '../../helpers/getTeacherConsultation'
import { Timestamp } from 'firebase/firestore'
import { getStudentsData } from '../../helpers/getStudentsData'
import TeacherEditConsultaions from './TeacherEditConsultaions'
import { setCancelConsultation } from '../../helpers/setCancelConsultation'
import { setRescheduleConsultation } from '../../helpers/setRescheduleConsultation'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function TeacherConsultations()
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const [edit, setEdit] = useState(false)

    const [day, setDay] = useState(days[Timestamp.now().toDate().getDay()])
    
    const upComingDay = useMemo(() => {
        const currentDate = Timestamp.now().toDate()
        const currentDay = currentDate.getDay()

        const selectedIndex = days.indexOf(day)
        const daysUntilNextDay = (selectedIndex - currentDay + 7) % 7

        currentDate.setDate(currentDate.getDate() + daysUntilNextDay)

        return currentDate
    }, [day])

    const { data: teacherConsultations } = useQuery({
        queryKey: ['teacherConsultations', userData?.id],
        queryFn: () => getTeacherConsultation(userData?.id),
        enabled: !!userData?.id
    })

    const { data: studentsData } = useQuery({
        queryKey: ['studentsData', userData?.id],
        //@ts-expect-error consultation
        queryFn: () => getStudentsData(teacherConsultations?.map(consultation => consultation?.studentId)),
        enabled: !!teacherConsultations
    })

    const { mutate: mutateCancel } = useMutation({
        onMutate: (consultationId: string) => {
            const previousData = queryClient.getQueryData(['teacherConsultations', userData?.id])

            queryClient.setQueryData(['teacherConsultations', userData?.id], (oldData: unknown) => {
                //@ts-expect-error oldData
                const newData = oldData ? oldData.slice().filter(consultation => consultation.id !== consultationId) : []
                return newData
            })

            return () => queryClient.setQueryData(['teacherConsultations', userData?.id], previousData)
        },
        mutationFn: (consultationId: string) => setCancelConsultation(consultationId)
    })

    const { mutate: mutateReschedule } = useMutation({
        onMutate: (consultationId: string) => {
            const previousData = queryClient.getQueryData(['teacherConsultations', userData?.id])

            queryClient.setQueryData(['teacherConsultations', userData?.id], (oldData: unknown) => {
                //@ts-expect-error oldData
                const newData = oldData ? oldData.slice().filter(consultation => consultation.id !== consultationId) : []
                return newData
            })

            return () => queryClient.setQueryData(['teacherConsultations', userData?.id], previousData)
        },
        mutationFn: (consultationId: string) => setRescheduleConsultation(consultationId)
    })

    const handleZoomMeeting = (meetingLink: string) => {
        window.location.href = meetingLink
    }

    useEffect(() => {
        const deletePassedConsultations = async () => {
            if(teacherConsultations)
            {
                const passedConsultations = teacherConsultations.slice().filter(consultation => {
                    //@ts-expect-error time
                    const secondsSinceEndTime = Timestamp.now().seconds - consultation?.endTime?.seconds
                    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    
                    return secondsSinceEndTime >= oneWeekInSeconds
                })
    
                const deletedConsultations = passedConsultations.map(async(consultation) => {
                    await setCancelConsultation(consultation.id)
                })
    
                await Promise.all(deletedConsultations)
            }
        }

        deletePassedConsultations()
    }, [teacherConsultations])

    const displayedConsultations = teacherConsultations?.slice()
    //@ts-expect-error type
    .filter(consultation => consultation.status === 'accepted')
    //@ts-expect-error startTime
    .filter(consultation => consultation.startTime.toDate().getDate() === upComingDay.getDate())
    .map(consultation => {
        //@ts-expect-error type
        const studentDetails = studentsData?.find(student => student.id === consultation?.studentId)
        return (
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                px={3}
                py={1}
                bgcolor='#D0EBFC'
                borderRadius='10px'
                overflow='hidden'
                boxShadow='0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
            >
                <Stack
                    direction='row'
                    gap={1}
                    mr={7}
                >
                    {/*//@ts-expect-error type*/}
                    <Avatar src={studentDetails?.image} sx={{ width: '41px', height: '41px', border: '1px solid #226E9F', cursor: 'pointer' }} />
                    <Stack
                        direction='column'
                        justifyContent='center'
                        gap={0.5}
                    >
                        {/*//@ts-expect-error type*/}
                        <Typography sx={{ color: '#226E9F', cursor: 'pointer' }} fontFamily='Inter' fontSize={12} fontWeight={600}>{studentDetails?.name}</Typography>
                        <Typography fontFamily='Inter' fontSize={10} fontWeight={400}>Software Engineer | Cairo, Egypt</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    mt={4}
                    mb={3}
                >
                    {/*//@ts-expect-error type */}
                    <Typography fontSize={14} fontWeight={500} fontFamily='Inter'>{consultation.startTime.toDate().toLocaleDateString('en-GB')}</Typography>
                    <Stack
                        direction='row'
                        alignItems='center'
                    >
                        {/*//@ts-expect-error type*/}
                        <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>{consultation.startTime.toDate().getHours() > 12 ? consultation.startTime.toDate().getHours() % 12 : consultation.startTime.toDate().getHours()}</Typography>
                        {/*//@ts-expect-error type*/}
                        <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>{consultation.startTime.toDate().getHours() > 12 ? 'PM' : 'AM'}-</Typography>
                        {/*//@ts-expect-error type*/}
                        <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>{consultation.endTime.toDate().getHours() > 12 ? consultation.endTime.toDate().getHours() % 12 : consultation.endTime.toDate().getHours()}</Typography>
                        {/*//@ts-expect-error type*/}
                        <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>{consultation.endTime.toDate().getHours() > 12 ? 'PM' : 'AM'}</Typography>
                    </Stack>
                </Stack>
                {
                    //@ts-expect-error type
                    (Timestamp.now().toDate() >= consultation.startTime.toDate() && Timestamp.now().toDate() <= consultation.endTime.toDate()) ?
                    <Stack
                    width='140px'
                    alignSelf='center'
                    mb={1}
                    >
                        <Button
                            sx={{
                                padding: 0.5,
                                border: '0px',
                                background: '#00B227',
                                color: '#fff',
                                paddingX: 1
                            }}
                            //@ts-expect-error meeting
                            onClick={() => handleZoomMeeting(consultation?.meetingLink)}
                        >
                            <Typography noWrap sx={{ textTransform: 'none' }} fontSize={14} fontWeight={400} fontFamily='Inter'>Join Consultation</Typography>
                        </Button>
                    </Stack>
                    :
                    <Stack
                        // alignSelf='center'
                        mb={1}
                        direction='row'
                        justifyContent='space-between'
                    >
                        <Button
                            sx={{
                                padding: 0.5,
                                border: '0px',
                                background: '#226E9F',
                                color: '#fff',
                                paddingX: 1,
                                width: '100px'
                            }}
                            onClick={() => mutateReschedule(consultation.id)}
                        >
                            <Typography noWrap sx={{ textTransform: 'none' }} fontSize={14} fontWeight={400} fontFamily='Inter'>Reschedule</Typography>
                        </Button>
                        <Button
                            sx={{
                                padding: 0.5,
                                border: '0px',
                                background: '#D9D9D9',
                                color: '#000',
                                paddingX: 1,
                                width: '70px'
                            }}
                            onClick={() => mutateCancel(consultation.id)}
                        >
                            <Typography noWrap sx={{ textTransform: 'none' }} fontSize={14} fontWeight={500} fontFamily='Inter'>Cancel</Typography>
                        </Button>
                    </Stack>
                }
            </Box>
        )
    })

    return (
        <>
            {
                edit ?
                <TeacherEditConsultaions setEdit={setEdit} />
                :
                <Box
                    mx={14}
                    borderRadius='20px'
                    overflow='hidden'
                    height='auto'
                    boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Box
                        p={2}
                        px={4}
                        bgcolor='#D0EBFC'
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography
                            fontWeight={900}
                            fontFamily='Inter'
                            fontSize={24}
                        >
                            Consultations
                        </Typography>
                        <SvgIcon onClick={() => setEdit(prev => !prev)} sx={{ cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                                <rect width="27" height="25" rx="5" fill="white"/>
                                <path d="M22.1835 11.238C21.7321 11.238 21.366 11.604 21.366 12.0554V19.5213C21.366 20.5377 20.5395 21.3651 19.5223 21.3651H6.47956C5.46231 21.3651 4.63579 20.5377 4.63579 19.5213V6.47866C4.63579 5.46231 5.46231 4.63488 6.47956 4.63488H14.0354C14.4868 4.63488 14.8529 4.26885 14.8529 3.81744C14.8529 3.36603 14.4868 3 14.0354 3H6.47956C4.56131 3 3 4.5604 3 6.47866V19.5213C3 21.4396 4.56131 23 6.47956 23H19.5223C21.4405 23 23.0018 21.4396 23.0018 19.5213V12.0554C23.0018 11.604 22.6349 11.238 22.1835 11.238Z" fill="#226E9F"/>
                                <path d="M17.4441 3.82134L10.1716 11.0938C9.61938 11.6451 9.35145 12.4281 9.44681 13.2019L9.42774 15.7487C9.42683 15.9676 9.51312 16.1783 9.66752 16.3327C9.82102 16.4862 10.029 16.5725 10.2461 16.5725C10.2479 16.5725 10.2506 16.5725 10.2524 16.5725L12.7992 16.5534C13.5694 16.6488 14.3551 16.3817 14.9064 15.8295L22.1798 8.55704C22.633 8.10381 22.8864 7.50345 22.8937 6.86676C22.9019 6.2237 22.6566 5.61971 22.2052 5.16921L20.8319 3.79682C19.9037 2.86857 18.3841 2.88129 17.4441 3.82134ZM21.2579 6.84677C21.2561 7.05386 21.1716 7.25004 21.0217 7.39991L13.7484 14.6724C13.5458 14.874 13.2615 14.9721 12.9736 14.9267C12.9318 14.9203 12.891 14.9176 12.8492 14.9176C12.8474 14.9176 12.8446 14.9176 12.8428 14.9176L11.0681 14.9312L11.0817 13.1556C11.0817 13.112 11.0781 13.0693 11.0717 13.0257C11.0281 12.7423 11.1235 12.4517 11.326 12.25L18.5985 4.97756C18.9037 4.67511 19.3851 4.6624 19.6757 4.95122L21.049 6.32361C21.1861 6.46167 21.2606 6.64696 21.2579 6.84677Z" fill="#226E9F"/>
                            </svg>
                        </SvgIcon>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        px={12}
                        py={6}
                        gap={4}
                    >
                        <Select
                            // labelId="demo-select-small-label"
                            // id="demo-select-small"
                            sx={{
                                width: '190px !important',
                                height: '38px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '7.5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#fff',
                                }, fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F',
                                
                            }}
                            value={day}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            color='primary'
                            onChange={(e) => setDay(e.target.value)}
                        >
                            {days.map(day => <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value={day} key={day}>{day}</MenuItem>)}
                        </Select>
                        <Box
                            height='auto'
                            display='flex'
                            gap={8}
                            flexDirection='row'
                            flexWrap='wrap'
                            justifyContent={!displayedConsultations?.length ? 'center' : ''}
                        >
                            {
                                displayedConsultations?.length ?
                                displayedConsultations :
                                <Typography sx={{ p: 8 }} fontFamily='Inter' fontSize={16} fontWeight={500} textAlign='center' alignSelf='center'>No Consultations yet.</Typography>
                            }
                        </Box>
                    </Box>
                </Box>
            }
        </>
    )
}
