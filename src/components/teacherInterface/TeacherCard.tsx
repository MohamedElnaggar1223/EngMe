import { Box, Button, Stack, Typography } from "@mui/material";
import profile from '../../assets/teacherprofile.png'

export default function TeacherCard() 
{
    return (
        <Box
            mx={14}
            display='flex'
            flexDirection='row'
            alignItems='center'
            bgcolor='#FEF4EB'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            borderRadius='0px 0px 20px 20px'
            width='auto'
            gap={2}
            py={4}
            zIndex={0}
            position='relative'
            justifyContent='space-evenly'
            pr={2}
            minHeight='200px'
            mb={10}
        >
            <img 
                style={{ 
                    borderRadius: '211px',
                    border: '5px solid #FFF',
                    background: 'lightgray -30.877px 0px / 185.106% 100% no-repeat',
                    objectFit: 'cover',
                    marginBottom: '-100px',
                    marginLeft: '-100px'
                }} 
                src={profile} width='250px' height='250px' alt='profile' 
            />
            <Stack
                direction='column'
                gap={1}
                mr={12}
                ml={-3}
            >
                <Typography 
                    fontWeight={600} 
                    fontSize={16} 
                    sx={{ color: '#000' }}
                >
                    Dr.Mayada Abdelrahman
                </Typography>
                <Typography
                    fontSize={14}
                    fontWeight={400}
                >
                    Software Engineer | Cairo, Egypt
                </Typography>
            </Stack>
            <Stack
                direction='column'
                bgcolor='#fff'
                gap={0.2}
                alignItems='center'
                borderRadius='10px'
                py={0.1}
                px={0.5}
            >
                <Typography fontFamily='Inter' fontSize={22} fontWeight={700}>7</Typography>
                <Typography fontSize={14} fontFamily='Inter' fontWeight={400}>Programs</Typography>
            </Stack>
            <Stack
                direction='column'
                bgcolor='#fff'
                gap={0.2}
                alignItems='center'
                borderRadius='10px'
                py={0.1}
                px={0.5}
            >
                <Typography fontFamily='Inter' fontSize={22} fontWeight={700}>312</Typography>
                <Typography fontSize={14} fontFamily='Inter' fontWeight={400}>Students</Typography>
            </Stack>
            <Stack
                direction='column'
                bgcolor='#fff'
                gap={0.2}
                alignItems='center'
                borderRadius='10px'
                py={0.1}
                px={0.5}
            >
                <Typography fontFamily='Inter' fontSize={22} fontWeight={700}>91</Typography>
                <Typography fontSize={14} fontFamily='Inter' fontWeight={400}>Followers</Typography>
            </Stack>
            <Button
                sx={{
                    width: '180px',
                    padding: 1.5,
                    borderRadius: '10px',
                    background: 'linear-gradient(98deg, #6A9DBC 0%, #226E9F 97.94%)',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 600,
                    paddingRight: 12,
                    paddingLeft: 12
                }}
            >
                Follow
            </Button>
            <Button
                sx={{
                    width: '145px',
                    height: '56px',
                    color: '#226E9F',
                    border: '1.5px solid #226E9F',
                    borderRadius: '10px',
                    background: '#fff'
                }}
            >
                Book a Consultancy
            </Button>
        </Box>
    )
}
