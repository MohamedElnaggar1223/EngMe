import { Avatar, Box, Select, Stack, Typography } from '@mui/material'
import avatar from '../../../assets/Ellipse 9.png'
import avatar2 from '../../../assets/Ellipse 10.png'

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
            <Box>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    sx={{
                        width: '128px',
                        height: '38px'
                    }}
                >

                </Select>
                <Box
                    py={3}
                    px={2}
                    height='auto'
                    display='flex'
                    gap={8}
                    flexDirection='row'
                    flexWrap='wrap'
                >
                    <Stack
                        alignItems='center'
                        width='fit-content'
                        gap={1.5}
                    >
                        <Avatar src={avatar} sx={{ width: '82px', height: '82px' }} />
                        <Typography
                            fontSize={18}
                            fontFamily='Inter'
                            fontWeight={800}
                            sx={{
                                color: '#226E9F'
                            }}
                        >
                            PHD from university of bla
                        </Typography>
                    </Stack>
                    <Stack
                        alignItems='center'
                        width='fit-content'
                        gap={1.5}
                    >
                        <Avatar src={avatar2} sx={{ width: '82px', height: '82px' }} />
                        <Typography
                            fontSize={18}
                            fontFamily='Inter'
                            fontWeight={800}
                            sx={{
                                color: '#226E9F'
                            }}
                        >
                            Flutter http+ Certificate
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
