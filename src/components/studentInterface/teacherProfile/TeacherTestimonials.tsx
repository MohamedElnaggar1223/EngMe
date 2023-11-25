import { Avatar, Box, Stack, Typography } from '@mui/material'
import avatar from '../../../assets/profile1.png'
import avatar2 from '../../../assets/profile2.png'

export default function TeacherTestimonials() 
{
    return (
        <Box
            mx={14}
            sx={{
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
            }}
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
                    Student Testimonials
                </Typography>
                <Typography
                    fontWeight={700}
                    fontFamily='Inter'
                    fontSize={18}
                    mr={6}
                    sx={{
                        color: '#226E9F'
                    }}
                >
                    View All
                </Typography>
            </Box>
            <Box
                py={3}
                px={3}
                height='auto'
                display='flex'
                flexDirection='row'
                // flexWrap='wrap'
                // width={{ xs: '70%', sm: '50%', lg: '20%' }}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    gap={4}
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
                                color: '#226E9F',
                                textAlign: 'center'
                            }}
                        >
                            Eyad Raslan
                        </Typography>
                    </Stack>
                    <Typography
                        fontSize={14}
                        fontWeight={500}
                        fontFamily='Inter'
                        display='flex'
                        flexShrink={1}
                        width={{ xs: '70%', sm: '50%', lg: '70%' }}
                    >
                        Good communication with her students and is very helpful and friendly. 
                        Can easily converse with her and ask for useful feedback at any point in time 
                        and would always receive advice that is helpful to the end goal of our proposal.
                    </Typography>
                </Stack>
                <Stack
                    direction='row'
                    alignItems='center'
                    gap={4}
                >
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
                                color: '#226E9F',
                                textAlign: 'center'
                            }}
                        >
                            Ammar Sameh
                        </Typography>
                    </Stack>
                    <Typography
                        fontSize={14}
                        fontWeight={500}
                        fontFamily='Inter'
                        display='flex'
                        flexShrink={1}
                        width={{ xs: '70%', sm: '50%', lg: '70%' }}
                    >
                        You are a very thoughtful teacher who puts a lot of thought into how she 
                        presents the material. Your classes were engaging ,useful, and you were very 
                        patient with everyone in class always encouraging your students to try.</Typography>
                </Stack>
                {/* <Stack
                    direction='row'
                    alignItems='center'
                    gap={4}
                >
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
                            Ammar Sameh
                        </Typography>
                    </Stack>
                    <Typography
                        fontSize={14}
                        fontWeight={500}
                        fontFamily='Inter'
                        display='flex'
                        flexShrink={1}
                        flexWrap='wrap'
                        width={{ xs: '70%', sm: '50%', lg: '20%' }}
                    >
                        You are a very thoughtful teacher who puts a lot of thought into how she 
                        presents the material. Your classes were engaging ,useful, and you were very 
                        patient with everyone in class always encouraging your students to try.</Typography>
                </Stack> */}
            </Box>
        </Box>
    )
}
