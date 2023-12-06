import { Avatar, Box, Button, MenuItem, Select, Stack, Typography } from '@mui/material'
import avatar from '../../../assets/profile1.png'
import ExpandMore from "@mui/icons-material/ExpandMore"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function StudentConsultations() 
{
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
                    defaultValue={days[new Date().getDay()]}
                    IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
                    inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                    variant='standard'
                    disableUnderline
                    color='primary'
                >
                    {days.map(day => <MenuItem sx={{ background: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'Inter', color: '#226E9F' }} value={day} key={day}>{day}</MenuItem>)}
                </Select>
                <Box
                    height='auto'
                    display='flex'
                    gap={8}
                    flexDirection='row'
                    flexWrap='wrap'
                >
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
                            <Avatar src={avatar} sx={{ width: '41px', height: '41px', border: '1px solid #226E9F' }} />
                            <Stack
                                direction='column'
                                justifyContent='center'
                                gap={0.5}
                            >
                                <Typography sx={{ color: '#226E9F' }} fontFamily='Inter' fontSize={12} fontWeight={600}>Dr.Mohamed el sawaf</Typography>
                                <Typography fontFamily='Inter' fontSize={10} fontWeight={400}>Software Engineer | Cairo, Egypt</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            mt={3}
                            mb={2}
                        >
                            <Typography fontSize={14} fontWeight={500} fontFamily='Inter'>20/09/2024</Typography>
                            <Stack
                                direction='row'
                                alignItems='center'
                            >
                                <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>1</Typography>
                                <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>PM-</Typography>
                                <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>2</Typography>
                                <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>PM</Typography>
                            </Stack>
                        </Stack>
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
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        px={3}
                        py={1}
                        bgcolor='#fff'
                        borderRadius='10px'
                        overflow='hidden'
                        boxShadow='0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
                    >
                        <Stack
                            direction='row'
                            gap={1}
                            mr={7}
                        >
                            <Avatar src={avatar} sx={{ width: '41px', height: '41px', border: '1px solid #226E9F' }} />
                            <Stack
                                direction='column'
                                justifyContent='center'
                                gap={0.5}
                            >
                                <Typography sx={{ color: '#226E9F' }} fontFamily='Inter' fontSize={12} fontWeight={600}>Dr.Mohamed el sawaf</Typography>
                                <Typography fontFamily='Inter' fontSize={10} fontWeight={400}>Software Engineer | Cairo, Egypt</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            mt={3}
                            mb={2}
                        >
                            <Typography fontSize={14} fontWeight={500} fontFamily='Inter'>20/09/2024</Typography>
                            <Stack
                                direction='row'
                                alignItems='center'
                            >
                                <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>1</Typography>
                                <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>PM-</Typography>
                                <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>2</Typography>
                                <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>PM</Typography>
                            </Stack>
                        </Stack>
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
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        px={3}
                        py={1}
                        bgcolor='#fff'
                        borderRadius='10px'
                        overflow='hidden'
                        boxShadow='0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
                    >
                        <Stack
                            direction='row'
                            gap={1}
                            mr={7}
                        >
                            <Avatar src={avatar} sx={{ width: '41px', height: '41px', border: '1px solid #226E9F' }} />
                            <Stack
                                direction='column'
                                justifyContent='center'
                                gap={0.5}
                            >
                                <Typography sx={{ color: '#226E9F' }} fontFamily='Inter' fontSize={12} fontWeight={600}>Dr.Mohamed el sawaf</Typography>
                                <Typography fontFamily='Inter' fontSize={10} fontWeight={400}>Software Engineer | Cairo, Egypt</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            mt={3}
                            mb={2}
                        >
                            <Typography fontSize={14} fontWeight={500} fontFamily='Inter'>20/09/2024</Typography>
                            <Stack
                                direction='row'
                                alignItems='center'
                            >
                                <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>1</Typography>
                                <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>PM-</Typography>
                                <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>2</Typography>
                                <Typography sx={{ marginTop: '5px' }} fontSize={8} fontWeight={400} fontFamily='Inter'>PM</Typography>
                            </Stack>
                        </Stack>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
