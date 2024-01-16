import { ExpandMore } from "@mui/icons-material"
import { Box, Select, MenuItem, InputLabel, Stack, Button, Typography, Input } from "@mui/material"
import { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../../authentication/auth/AuthProvider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTeacherSchedule } from "../../helpers/getTeacherSchedule"
import { setTeacherSchedule } from "../../helpers/setTeacherSchedule"

interface TeacherEditConsultaionsProps{
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const Hours = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM','5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']

const hourlyRateRegex = /^\d*\.?\d{0,2}$/

export default function TeacherEditConsultaions({ setEdit }: TeacherEditConsultaionsProps) 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: teacherSchedule, isSuccess } = useQuery({
        queryKey: ['teacherSchedule', userData?.id],
        queryFn: () => getTeacherSchedule(userData?.id),
        enabled: !!userData
    })

    //@ts-expect-error number
    const [selectedNoOfDays, setSelectedNoOfDays] = useState(Number(teacherSchedule?.numberOfDays) ?? 0)
    const [newSlots, setNewSlots] = useState([
        {
            day: '',
            startTime: '',
            endTime: ''
        }
    ])
    //@ts-expect-error number
    const [hourlyRate, setHourlyRate] = useState(teacherSchedule?.hourlyRate ?? '')

    function handelNewSlotsChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number, type: string)
    {
        const slot = newSlots[i] ?? { endTime: '', startTime: '', day: '' }
        const editedSlot = {...slot, [type]: e.target.value}
        const editedSlots = newSlots[i] ? [...newSlots] : [...newSlots, { endTime: '', startTime: '', day: '' }]
        editedSlots[i] = editedSlot
        
        setNewSlots(editedSlots)
    }

    useEffect(() => {
        if(isSuccess) 
        {
            //@ts-expect-error number
            setSelectedNoOfDays(Number(teacherSchedule?.numberOfDays))
            //@ts-expect-error number
            setNewSlots(teacherSchedule?.slots)
        }
        //eslint-disable-next-line
    }, [isSuccess])

    const { mutate } = useMutation({
        onMutate: async() => {
            const previousData = queryClient.getQueryData(['teacherSchedule', userData?.id])

            queryClient.setQueryData(['teacherSchedule', userData?.id], (oldData: unknown) => {
                const newData = {
                    //@ts-expect-error oldData
                    ...oldData,
                    numberOfDays: selectedNoOfDays,
                    slots: newSlots.slice(0, selectedNoOfDays)
                }
                return newData
            })

            return () => queryClient.setQueryData(['teacherSchedule', userData?.id], previousData)
        },
        //@ts-expect-error slots
        mutationFn: () => setTeacherSchedule(teacherSchedule?.id, selectedNoOfDays, newSlots, hourlyRate)
    })

    const displayedSelects = useMemo(() => {
        const tempSelects = []
        for(let i = 0; i < selectedNoOfDays; i++)
        {
            const SelectDisplay = (
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        gap={2}
                        key={i}
                    >
                        <Stack
                            direction='column'
                            gap={0.65}
                        >
                            <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id="noOfDays">Day {i + 1 }</InputLabel>
                            <Select
                                // labelId="demo-select-small-label"
                                // id="demo-select-small"
                                sx={{
                                    width: '140px !important',
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
                                    textAlign: 'center'
                                }}
                                // value={day}
                                IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '70%' }} />}
                                inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                                variant='standard'
                                disableUnderline
                                color='primary'
                                labelId="noOfDays"
                                value={newSlots[i] ? newSlots[i].day : ''}
                                //@ts-expect-error slot
                                defaultValue={teacherSchedule?.slots?.length >= i + 1 && teacherSchedule?.slots[i].day }
                                //@ts-expect-error slot
                                onChange={(e) => handelNewSlotsChange(e, i, 'day')}
                                // onChange={(e) => setDay(e.target.value)}
                            >
                                {days.map(day => <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value={day} key={day}>{day}</MenuItem>)}
                            </Select>
                        </Stack>
                        <Stack
                            direction='column'
                            gap={0.65}
                        >
                            <InputLabel sx={{ color: '#000', fontSize: 14, fontFamily: 'Inter', fontWeight: 500 }} id="noOfDays">Starting</InputLabel>
                            {/* <Input 
                                color='primary' 
                                disableUnderline
                                sx={{
                                    border: '1px solid #226E9F',
                                    width: '140px',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                }}
                                value={newSlots[i] ? newSlots[i].startTime : ''}
                                //@ts-expect-error slot
                                defaultValue={teacherSchedule?.slots?.length >= i + 1 ? teacherSchedule?.slots[i].startTime : ''}
                                onChange={(e) => handelNewSlotsChange(e, i, 'startTime')}
                            /> */}
                            <Select
                                value={newSlots[i] ? newSlots[i].startTime : ''}
                                sx={{
                                    width: '140px !important',
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
                                    textAlign: 'center'
                                }}
                                IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '70%' }} />}
                                inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                                variant='standard'
                                disableUnderline
                                //@ts-expect-error event
                                onChange={(e) => handelNewSlotsChange(e, i, 'startTime')}
                            >
                                {Hours.map(hour => <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value={hour} key={hour}>{hour}</MenuItem>)}
                            </Select>
                        </Stack>
                        <Stack
                            direction='column'
                            gap={0.65}
                        >
                            <InputLabel sx={{ color: '#000', fontSize: 14, fontFamily: 'Inter', fontWeight: 500 }} id="noOfDays">Ending</InputLabel>
                            {/* <Input 
                                color='primary' 
                                disableUnderline
                                sx={{
                                    border: '1px solid #226E9F',
                                    width: '140px',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                }}
                                value={newSlots[i] ? newSlots[i].endTime : ''}
                                //@ts-expect-error slot
                                defaultValue={teacherSchedule?.slots?.length >= i + 1 ? teacherSchedule?.slots[i].endTime : ''}
                                onChange={(e) => handelNewSlotsChange(e, i, 'endTime')}
                            /> */}
                            <Select
                                value={newSlots[i] ? newSlots[i].endTime : ''}
                                sx={{
                                    width: '140px !important',
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
                                    textAlign: 'center'
                                }}
                                IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '70%' }} />}
                                inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                                variant='standard'
                                disableUnderline
                                //@ts-expect-error event
                                onChange={(e) => handelNewSlotsChange(e, i, 'endTime')}
                            >
                                {Hours.map((hour, index) => <MenuItem disabled={newSlots[i] ? Hours.indexOf(newSlots[i].startTime) >= index : false} sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value={hour} key={hour}>{hour}</MenuItem>)}
                            </Select>
                        </Stack>
                    </Stack>
            )
            tempSelects.push(SelectDisplay)
        }

        return tempSelects
        //eslint-disable-next-line
    }, [selectedNoOfDays, teacherSchedule, newSlots])

    return (
        <Box
            mx={14}
            borderRadius='20px'
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            bgcolor='#D0EBFC'
            px={5}
        >
            {/* <Box
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
            </Box> */}
            <Box
                display='flex'
                flexDirection='column'
                py={4}
                gap={4}
            >
                <Stack
                    direction='row'
                    flex={1}
                    justifyContent='space-between'
                >
                    <Stack
                        direction='column'
                        gap={0.65}
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id="noOfDays"># of Days</InputLabel>
                        <Select
                            // labelId="demo-select-small-label"
                            // id="demo-select-small"
                            sx={{
                                width: '140px !important',
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
                                textAlign: 'center'
                            }}
                            // value={day}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '70%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            color='primary'
                            labelId="noOfDays"
                            value={selectedNoOfDays}
                            onChange={(e) => setSelectedNoOfDays(Number(e.target.value))}
                        >
                            <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value='1'>1</MenuItem>
                            <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value='2'>2</MenuItem>
                            <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value='3'>3</MenuItem>
                            <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value='4'>4</MenuItem>
                            <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value='5'>5</MenuItem>
                            <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value='6'>6</MenuItem>
                        </Select>
                    </Stack>
                    <Stack
                        gap={1}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }}>Hourly Rate (usd/hr)</Typography>
                        <Input
                            sx={{
                                width: '140px !important',
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
                                textAlign: 'center'
                            }}
                            disableUnderline
                            value={hourlyRate}
                            onChange={(e) => hourlyRateRegex.test(e.target.value) && setHourlyRate(e.target.value)}
                        />
                    </Stack>
                </Stack>
                <Box
                    height='auto'
                    display='flex'
                    gap={2}
                    flexDirection='row'
                    flexWrap='wrap'
                    justifyContent='space-between'
                >
                    {displayedSelects}
                </Box>
                <Stack
                    flex={1}
                    justifyContent='flex-end'
                    gap={3}
                    direction='row'
                    mt={1}
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
                            mutate()
                        }}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}
