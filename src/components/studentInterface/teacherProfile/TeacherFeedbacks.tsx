import { Box, Stack, SvgIcon, Typography } from '@mui/material'

export default function TeacherFeedbacks() 
{
    return (
        <Box
            display='flex'
            flexDirection='column'
            gap={2}
            mx={14}
            py={4}
            bgcolor='#FEF4EB'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            borderRadius='20px'
        >
            <Typography
                fontFamily='Inter'
                fontSize={26}
                fontWeight={900}
                px={6}
                sx={{
                    wordSpacing: 8
                }}
                mb={3}
            >
                Recent  Feedbacks
            </Typography>
            <Stack
                direction='row'
                gap={3}
                mx={15}
                flexWrap='wrap'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    overflow='hidden'
                    height= 'auto'
                    sx={{
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                    }}
                    width={{xs: '100%', sm: '100%', lg: '49%'}}
                >
                    <Stack
                        direction='column'
                        gap={2}
                        p={0.5}
                        bgcolor='#FFFBF8'
                        px={3}
                        py={2}
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
                            <Stack
                                direction='row'
                                gap={1}
                                alignItems='center'
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
                            </Stack>
                        </Stack>
                        <Typography fontSize={16} fontWeight={300} fontFamily='Inter'>Omar El Shabrawy</Typography>
                    </Stack>
                    <Stack
                        py={10}
                        px={1}
                        bgcolor='#fff'
                    >
                        <Typography textAlign='center' fontSize={16} fontWeight={700} fontFamily='Inter'>
                            <SvgIcon sx={{ fontSize: 16, marginX: 1, marginBottom: 1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M0.0074587 1.30412e-09L6.02054 1.05266e-06L6.02054 6.63462L3.38078 6.63462L3.38078 7.41453C3.3769 7.92542 3.4091 8.43594 3.47716 8.94231C3.53287 9.36636 3.65957 9.77807 3.85197 10.1603C4.04223 10.5275 4.31533 10.8457 4.64979 11.0897C5.06606 11.3835 5.52968 11.6039 6.02054 11.7415L6.02054 14.9947C4.30389 14.6468 2.75291 13.7368 1.6138 12.4092C0.497062 10.9894 -0.0728211 9.21746 0.0074574 7.41453L0.0074587 1.30412e-09ZM8.98692 7.41453C8.90664 9.21747 9.47652 10.9894 10.5933 12.4092C11.7313 13.7391 13.2825 14.6511 15 15L15 11.7415C14.5091 11.6039 14.0455 11.3835 13.6293 11.0897C13.2948 10.8457 13.0217 10.5275 12.8314 10.1603C12.6392 9.778 12.5125 9.36632 12.4566 8.94231C12.376 8.43683 12.3313 7.9263 12.3228 7.41453L12.3228 6.63462L15 6.63462L15 2.62268e-06L8.98692 1.57132e-06L8.98692 7.41453Z" fill="#FF7E00"/>
                                </svg>
                            </SvgIcon>
                            It is a top quality course. Keep going, we need this type of programs
                            to improve our studies. Excellent. Thank you!!
                            <SvgIcon sx={{ fontSize: 16, marginX: 1, marginBottom: -1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M14.9925 1.30412e-09L8.97946 1.05266e-06L8.97946 6.63462L11.6192 6.63462L11.6192 7.41453C11.6231 7.92542 11.5909 8.43594 11.5228 8.94231C11.4671 9.36636 11.3404 9.77807 11.148 10.1603C10.9578 10.5275 10.6847 10.8457 10.3502 11.0897C9.93394 11.3835 9.47032 11.6039 8.97946 11.7415L8.97946 14.9947C10.6961 14.6468 12.2471 13.7368 13.3862 12.4092C14.5029 10.9894 15.0728 9.21746 14.9925 7.41453L14.9925 1.30412e-09ZM6.01308 7.41453C6.09336 9.21747 5.52348 10.9894 4.40674 12.4092C3.2687 13.7391 1.71751 14.6511 2.62268e-06 15L2.05294e-06 11.7415C0.490859 11.6039 0.954476 11.3835 1.37075 11.0897C1.70521 10.8457 1.97831 10.5275 2.16857 10.1603C2.36078 9.778 2.48748 9.36632 2.54338 8.94231C2.624 8.43683 2.66873 7.9263 2.67724 7.41453L2.67724 6.63462L1.16003e-06 6.63462L0 2.62268e-06L6.01308 1.57132e-06L6.01308 7.41453Z" fill="#FF7E00"/>
                                </svg>
                            </SvgIcon>
                        </Typography>
                    </Stack>
                </Box>
                <Box
                    display='flex'
                    flexDirection='column'
                    overflow='hidden'
                    height= 'auto'
                    sx={{
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                    }}
                >
                    <Stack
                        direction='column'
                        gap={2}
                        p={0.5}
                        bgcolor='#FFFBF8'
                        px={3}
                        py={2}
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
                            <Stack
                                direction='row'
                                gap={1}
                                alignItems='center'
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
                            </Stack>
                        </Stack>
                        <Typography fontSize={16} fontWeight={300} fontFamily='Inter'>Omar El Shabrawy</Typography>
                    </Stack>
                    <Stack
                        py={10}
                        px={1}
                        bgcolor='#fff'
                    >
                        <Typography textAlign='center' fontSize={16} fontWeight={700} fontFamily='Inter'>
                            <SvgIcon sx={{ fontSize: 16, marginX: 1, marginBottom: 1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M0.0074587 1.30412e-09L6.02054 1.05266e-06L6.02054 6.63462L3.38078 6.63462L3.38078 7.41453C3.3769 7.92542 3.4091 8.43594 3.47716 8.94231C3.53287 9.36636 3.65957 9.77807 3.85197 10.1603C4.04223 10.5275 4.31533 10.8457 4.64979 11.0897C5.06606 11.3835 5.52968 11.6039 6.02054 11.7415L6.02054 14.9947C4.30389 14.6468 2.75291 13.7368 1.6138 12.4092C0.497062 10.9894 -0.0728211 9.21746 0.0074574 7.41453L0.0074587 1.30412e-09ZM8.98692 7.41453C8.90664 9.21747 9.47652 10.9894 10.5933 12.4092C11.7313 13.7391 13.2825 14.6511 15 15L15 11.7415C14.5091 11.6039 14.0455 11.3835 13.6293 11.0897C13.2948 10.8457 13.0217 10.5275 12.8314 10.1603C12.6392 9.778 12.5125 9.36632 12.4566 8.94231C12.376 8.43683 12.3313 7.9263 12.3228 7.41453L12.3228 6.63462L15 6.63462L15 2.62268e-06L8.98692 1.57132e-06L8.98692 7.41453Z" fill="#FF7E00"/>
                                </svg>
                            </SvgIcon>
                            It is a top quality course. Keep going, we need this type of programs
                            to improve our studies. Excellent. Thank you!!
                            <SvgIcon sx={{ fontSize: 16, marginX: 1, marginBottom: -1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M14.9925 1.30412e-09L8.97946 1.05266e-06L8.97946 6.63462L11.6192 6.63462L11.6192 7.41453C11.6231 7.92542 11.5909 8.43594 11.5228 8.94231C11.4671 9.36636 11.3404 9.77807 11.148 10.1603C10.9578 10.5275 10.6847 10.8457 10.3502 11.0897C9.93394 11.3835 9.47032 11.6039 8.97946 11.7415L8.97946 14.9947C10.6961 14.6468 12.2471 13.7368 13.3862 12.4092C14.5029 10.9894 15.0728 9.21746 14.9925 7.41453L14.9925 1.30412e-09ZM6.01308 7.41453C6.09336 9.21747 5.52348 10.9894 4.40674 12.4092C3.2687 13.7391 1.71751 14.6511 2.62268e-06 15L2.05294e-06 11.7415C0.490859 11.6039 0.954476 11.3835 1.37075 11.0897C1.70521 10.8457 1.97831 10.5275 2.16857 10.1603C2.36078 9.778 2.48748 9.36632 2.54338 8.94231C2.624 8.43683 2.66873 7.9263 2.67724 7.41453L2.67724 6.63462L1.16003e-06 6.63462L0 2.62268e-06L6.01308 1.57132e-06L6.01308 7.41453Z" fill="#FF7E00"/>
                                </svg>
                            </SvgIcon>
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}
