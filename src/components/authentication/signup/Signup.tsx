import { memo, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import StudentSignUp from "./StudentSignUp"
import TeacherSignUp from "./TeacherSignUp"
import icon from '../../../assets/Ellipse 1.png'
import CompanyRegister from "./CompanyRegister"
// import { PageContext } from '../../Layout'

//eslint-disable-next-line
function Signup() 
{
    // const { setPage, user } = useContext(PageContext)
    const [selectedPage, setSelectedPage] = useState('Student')

    // useLayoutEffect(() => {
    //     if(user) setPage('profile')
    // }, [user])
    
    return (
        <Box
            overflow='hidden'
            display='flex'
            flexDirection='row'
            sx={{
                overflowY: 'hidden'
            }}
            maxHeight='100vh'
            justifyContent='flex-end'
            bgcolor='#FEF4EB'
            position='relative'
        >
            <Box
                position='absolute'
                top='1%'
                left='1%'
            >
                <img src={icon} width='109px' height='100px' />
            </Box>
            {/* <Box
                bgcolor='#FEF4EB'
                sx={{
                    transform: 'rotate(10deg)'
                    // borderBottom: '30px solid transparent',
                    // borderTop: '30px solid transparent',
                    // overflow: 'hidden'
                }}
                flex={1}
            >
                
            </Box> */}
            <Box
                bgcolor='#fff'
                sx={{
                    transform: 'rotate(5deg)',
                }}
                // flex={1}
                width='48vw'
                height='100vh'
                justifySelf='flex-end'
                alignSelf='flex-end'
                boxShadow='0px 0px 0px 100px rgba(255,255,255,1)'
            >
                <Box
                    overflow='auto'
                    height='100vh'
                    sx={{
                        transform: 'rotate(-5deg)'
                    }}
                >
                <Stack
                    direction='column'
                    pl={{xs: 1, sm: 1, lg: 3}}
                    pr={{xs: 1, sm: 1, lg: 26}}
                    mt={8}
                    mr={{ xs: 8, sm: 8, lg: 0 }}
                    
                    
                >
                    <Stack
                        direction='column'
                        flex={1}
                        position='relative'
                        mb={4}
                    >
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            gap={5}
                        >
                            <Typography onClick={() => setSelectedPage('Student')} sx={{ paddingLeft: {xs: 3, sm: 3, lg: 8, xl: 8}, cursor: 'pointer' }} fontFamily='Inter' fontSize={18} fontWeight={600}>Student</Typography>
                            <Typography onClick={() => setSelectedPage('Teacher')} sx={{ cursor: 'pointer' }} fontFamily='Inter' fontSize={18} fontWeight={600}>Instructor</Typography>
                            <Typography onClick={() => setSelectedPage('Company')} sx={{ paddingRight: {xs: 3, sm: 3, lg: 8, xl: 8}, cursor: 'pointer' }} fontFamily='Inter' fontSize={18} fontWeight={600}>Company</Typography>
                        </Stack>
                        <Box
                            width='35%'
                            position='absolute'
                            bgcolor={selectedPage === 'Student' ? '#FF9F06' : '#6A9DBC'}
                            height='8px'
                            sx={{
                                top: '63%',
                                left: selectedPage === 'Student' ? '0%' : selectedPage === 'Teacher' ? '31.2%' : '65%',
                                transition: '0.3s'
                            }}
                        >

                        </Box>
                        <Box
                            width='100%'
                            height='8px'
                            bgcolor={selectedPage === 'Student' ? '#FEF4EB' : '#D0EBFC'}
                            mt={1}
                            sx={{
                                transition: '0.3s'
                            }}
                        >

                        </Box>
                    </Stack>
                    {
                        selectedPage === 'Student' ?
                        <StudentSignUp /> :
                        selectedPage === 'Teacher' ?
                        <TeacherSignUp /> :
                        <CompanyRegister />
                    }
                </Stack>
                </Box>
            </Box>
        </Box>
    )
}

const memoizedSignUp = memo(Signup)
export default memoizedSignUp