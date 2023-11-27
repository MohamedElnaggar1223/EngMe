import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import profile from '../../../assets/teacherprofile-min.png'

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
            // gap={2}
            py={4}
            zIndex={0}
            position='relative'
            justifyContent='space-between'
            // pr={8}
            minHeight='200px'
            // mb={10}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '93.2%',
                    border: '1.5px solid', 
                    padding: 0.5,
                    paddingX: 1,
                    borderRadius: '6px', 
                    borderColor: '#6A9DBC'
                }}
                bgcolor='#fff'
            >
                <SvgIcon
                    sx={{
                        fontSize: 32
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.82183 8.96177L6.19963 12.037L20.7157 2.19398L1.82183 8.96177ZM11.8681 17.4418L11.0316 20.4855L13.1675 18.3547L11.8681 17.4418ZM9.83171 20.6048L6.89041 12.9767L20.2708 3.90478L11.1031 16.1355C11.0581 16.1953 11.0245 16.2639 11.0044 16.3372L9.83091 20.6051L9.83171 20.6048ZM14.1234 19.026L10.3422 22.7987C10.2789 22.8746 10.1983 22.9322 10.108 22.9659C10.0176 22.9997 9.92063 23.0086 9.82615 22.9916C9.73167 22.9747 9.64287 22.9326 9.56817 22.8693C9.49347 22.806 9.43536 22.7235 9.39937 22.6299L5.73849 13.1359L0.261031 9.28841C0.171508 9.22856 0.0998619 9.14322 0.0543712 9.04225C0.00888063 8.94127 -0.00859852 8.82878 0.00395324 8.71777C0.016505 8.60676 0.0585755 8.50177 0.125304 8.41491C0.192033 8.32805 0.280696 8.26288 0.381051 8.22693L23.2598 0.0313637C23.3546 -0.00258087 23.4563 -0.0091114 23.5543 0.0124515C23.6523 0.0340144 23.743 0.0828828 23.817 0.153972C23.891 0.225061 23.9456 0.315772 23.9751 0.416667C24.0046 0.517562 24.0079 0.624954 23.9848 0.727667L19.2304 21.6131C19.2173 21.6943 19.1883 21.7716 19.145 21.8402C19.1045 21.9052 19.0521 21.9611 18.991 22.0047C18.9299 22.0483 18.8612 22.0787 18.7889 22.0942C18.7166 22.1098 18.6422 22.1101 18.5697 22.0952C18.4973 22.0802 18.4284 22.0504 18.367 22.0073L14.1234 19.0251V19.026ZM22.2895 3.11704L18.3211 20.5511L12.3596 16.3643L22.2895 3.11704Z" fill="#226E9F"/>
                    </svg>
                </SvgIcon>
            </Box>
            <Stack
                direction='row'
                alignItems='center'
                gap={8}
            >
                <img 
                    style={{ 
                        borderRadius: '211px',
                        border: '5px solid #FFF',
                        background: 'lightgray -30.877px 0px / 185.106% 100% no-repeat',
                        objectFit: 'cover',
                        marginBottom: '-100px',
                        marginLeft: '-50px'
                    }} 
                    src={profile} width='250px' height='250px' alt='profile' 
                />
                <Stack
                    direction='column'
                    gap={1}
                    mr={4}
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
            </Stack>
            <Stack
                direction='row'
                gap={{xs: 2, sm: 4, lg: 8}}
                mr={{ xs: 2, sm: 4, lg: 8 }}
                // flex={1}
                flexWrap='wrap'
            >
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
                        width: {xs: '120px', sm: '120px', lg: '180px'},
                        padding: 1.5,
                        borderRadius: '10px',
                        background: 'linear-gradient(98deg, #6A9DBC 0%, #226E9F 97.94%)',
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 600,
                        paddingRight: {xs: 2, sm: 2, lg: 12},
                        paddingLeft: {xs: 2, sm: 2, lg: 12}
                    }}
                >
                    Follow
                </Button>
                <Button
                    sx={{
                        width: {xs: '110px', sm: '110px', lg: '145px'},
                        height: '56px',
                        color: '#226E9F',
                        border: '1.5px solid #226E9F',
                        borderRadius: '10px',
                        background: '#fff'
                    }}
                >
                    Book a Consultancy
                </Button>
            </Stack>
        </Box>
    )
}
