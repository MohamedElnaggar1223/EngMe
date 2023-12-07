import { useContext, useMemo, useState } from 'react'
import { Avatar, Box, Button, Link, MenuItem, Select, Stack, Typography } from '@mui/material'
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getStudentConsultation } from '../../helpers/getStudentConsultation'
import { Timestamp } from 'firebase/firestore'
import { getTeachersData } from '../../helpers/getTeachersData'
import { useNavigate } from 'react-router-dom'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function StudentConsultations() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [day, setDay] = useState(days[Timestamp.now().toDate().getDay()])

    const navigate = useNavigate()
    
    const upComingDay = useMemo(() => {
        const currentDate = Timestamp.now().toDate()
        const currentDay = currentDate.getDay()

        const selectedIndex = days.indexOf(day)
        const daysUntilNextDay = (selectedIndex - currentDay + 7) % 7

        currentDate.setDate(currentDate.getDate() + daysUntilNextDay)

        return currentDate
    }, [day])

    const { data: studentConsultations } = useQuery({
        queryKey: ['studentConsultations', userData?.id],
        queryFn: () => getStudentConsultation(userData?.id),
        enabled: !!userData?.id
    })

    const { data: teachersData } = useQuery({
        queryKey: ['teachersData', userData?.id],
        //@ts-expect-error teacher
        queryFn: () => getTeachersData(studentConsultations?.map(consultation => consultation?.teacherId)),
        enabled: !!studentConsultations
    })

    const displayedConsultations = studentConsultations?.slice()
    //@ts-expect-error type
    .filter(consultation => consultation.status === 'accepted')
    //@ts-expect-error startTime
    .filter(consultation => consultation.startTime.toDate().getDate() === upComingDay.getDate())
    .map(consultation => {
        //@ts-expect-error type
        const teacherDetails = teachersData?.find(teacher => teacher.id === consultation?.teacherId)
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
                    <Avatar onClick={() => navigate(`/teacherprofile/${teacherData?.id}`)} src={teacherDetails?.image} sx={{ width: '41px', height: '41px', border: '1px solid #226E9F', cursor: 'pointer' }} />
                    <Stack
                        direction='column'
                        justifyContent='center'
                        gap={0.5}
                    >
                        {/*//@ts-expect-error type*/}
                        <Typography onClick={() => navigate(`/teacherprofile/${teacherData?.id}`)} sx={{ color: '#226E9F', cursor: 'pointer' }} fontFamily='Inter' fontSize={12} fontWeight={600}>{teacherDetails?.name}</Typography>
                        {/*//@ts-expect-error type*/}
                        <Typography fontFamily='Inter' fontSize={10} fontWeight={400}>{teacherDetails?.title} | Cairo, Egypt</Typography>
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
                        >
                            <Typography noWrap sx={{ textTransform: 'none' }} fontSize={14} fontWeight={500} fontFamily='Inter'>Cancel</Typography>
                        </Button>
                    </Stack>
                }
            </Box>
        )
    })

    return (
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
            >
                <Typography
                    fontWeight={900}
                    fontFamily='Inter'
                    fontSize={24}
                >
                    Consultations
                </Typography>
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
                        <Typography sx={{ p: 8 }} fontFamily='Inter' fontSize={16} fontWeight={500} textAlign='center' alignSelf='center'>No booked consultations yet.<br/>
                        <Link style={{ color: '#226E9F', textDecoration: 'none', fontWeight: 700 }}>Search</Link> for teachers & start booking.</Typography>
                    }
                </Box>
            </Box>
        </Box>
    )
}
