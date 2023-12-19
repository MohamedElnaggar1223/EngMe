import { Card, CardMedia, CardContent, Stack, SvgIcon, Typography, Box } from "@mui/material";
import { memo } from "react";
import ProgramProps from "../../../interfaces/ProgramProps";

// eslint-disable-next-line react-refresh/only-export-components
function TeacherProgramCard(program: ProgramProps) 
{
    return (
        <Card sx={{ width: '384px', borderRadius: '15px' }}>
            <CardMedia
                sx={{ height: 180 }}
                image={program.image}
                title="green iguana"
            />
            <CardContent sx={{ paddingY: 1.5, paddingX: 2 }}>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <SvgIcon sx={{ fontSize: 22 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M6.14963 19.1713C4.44636 20.0668 2.90407 18.9476 3.22957 17.0498L3.99423 12.5915L0.755079 9.43408C-0.622893 8.09089 -0.0350361 6.27823 1.87044 6.00135L6.34684 5.35089L8.34874 1.2946C9.20037 -0.431002 11.106 -0.432061 11.9581 1.2946L13.96 5.35089L18.4364 6.00135C20.3407 6.27806 20.9306 8.09007 19.5518 9.43408L16.3126 12.5915L17.0773 17.0498C17.4026 18.9464 15.8616 20.0673 14.1572 19.1713L10.1534 17.0664L6.14963 19.1713ZM9.22844 15.0107C9.77849 14.7215 10.5263 14.7204 11.0784 15.0107L14.7783 16.9559L14.0717 12.836C13.9667 12.2235 14.1967 11.5119 14.6434 11.0765L17.6367 8.15877L13.5001 7.55768C12.8851 7.46832 12.2795 7.02965 12.0034 6.47029L10.1534 2.72187L8.30348 6.47029C8.02846 7.02755 7.4241 7.46799 6.80681 7.55768L2.67018 8.15877L5.66347 11.0765C6.10847 11.5103 6.3406 12.2211 6.23515 12.836L5.52853 16.9559L9.22844 15.0107Z" fill="#FF7E00"/>
                        </svg>
                    </SvgIcon>
                    <Stack
                        direction='row'
                        alignItems='center'
                        gap={1}
                    >
                        <SvgIcon sx={{ fontSize: 18 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                <path d="M7.72751 0.779086C7.89978 0.257395 8.63774 0.257394 8.81001 0.779084L10.2205 5.05051C10.2976 5.28404 10.5158 5.44178 10.7618 5.44178H15.3064C15.8608 5.44178 16.0889 6.15306 15.6379 6.47548L11.9772 9.09247C11.7741 9.23761 11.6891 9.49793 11.7674 9.73491L13.1694 13.9806C13.3423 14.5041 12.7452 14.9437 12.2967 14.623L8.60025 11.9805C8.40198 11.8388 8.13554 11.8388 7.93727 11.9805L4.24085 14.623C3.79234 14.9437 3.19523 14.5041 3.36811 13.9806L4.77012 9.73491C4.84837 9.49793 4.76337 9.23761 4.56036 9.09247L0.899615 6.47548C0.448606 6.15306 0.676701 5.44178 1.2311 5.44178H5.77575C6.02168 5.44178 6.23988 5.28404 6.317 5.05051L7.72751 0.779086Z" fill="#FF9F06"/>
                            </svg>
                        </SvgIcon>
                        <Typography sx={{ color: '#004643' }}fontSize={14} fontWeight={700} fontFamily='Poppins'>{program.averageRating}</Typography>
                        <Typography fontSize={14} fontFamily='Inter'>{'(1290)'}</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='column'
                    gap={0.5}
                    mt={2}
                >
                    <Typography fontSize={16} fontWeight={600} fontFamily='Inter'>{program.name}</Typography>
                    <Typography fontSize={12} fontWeight={300} fontFamily='Inter'>{program.category}</Typography>
                </Stack>
                <Typography
                    fontFamily='Inter'
                    fontSize={14}
                    fontWeight={400}
                    my={3}
                    pr={3}
                >
                    {program.description}
                </Typography>
                <Stack
                    direction='row'
                    gap={1}
                    flexWrap='wrap'
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
                        <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>{program?.duration}</Typography>
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
                        <Typography fontSize={12} fontWeight={400} fontFamily='Inter'>{program?.expiry}</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

const memoizedTeacherProgramCard = memo(TeacherProgramCard)
export default memoizedTeacherProgramCard