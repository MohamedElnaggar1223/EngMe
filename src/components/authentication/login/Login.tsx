import { memo, useState, createContext } from "react"
import { Box, Stack, Typography } from "@mui/material"
import StudentLogIn from "./StudentLogIn"
import TeacherLogIn from "./TeacherLogIn"
import icon from '../../../assets/Engme logo.png'
import CompanyRegister from "../signup/CompanyRegister"
import StudentSignUp from "../signup/StudentSignUp"
import TeacherSignUp from "../signup/TeacherSignUp"
import { Link } from "react-router-dom"
// import { PageContext } from '../../Layout'

export const LoginContext = createContext({})

//eslint-disable-next-line
function Login() 
{
    // const { setPage, user } = useContext(PageContext)
    const [selectedPage, setSelectedPage] = useState('StudentLogin')

    // useLayoutEffect(() => {
    //     if(user) setPage('profile')
    // }, [user])

    return (
        <LoginContext.Provider value={{ selectedPage, setSelectedPage }}>

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
                    <Link to='https://www.engmecamp.com/'>
                        <img src={icon} width='80px' height='80px' />
                    </Link>
                </Box>
                {/* <iframe 
                    src="https://firebasestorage.googleapis.com/v0/b/engme-84d22.appspot.com/o/HomePage%2Feng%20me%20website%20final%20edit%20s.mp4?alt=media&token=59433475-4266-4897-bc4b-92814fc5a6f0?autoplay=1" 
                    style={{
                        position: 'absolute',
                        left: '7%',
                        top: '0%',
                        width: '700px',
                        maxWidth: '40%',
                        height: '100%',
                        border: '0px',
                    }}
                    allowFullScreen={true}
                    allow="autoplay"
                /> */}
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
                                justifyContent='space-evenly'
                                alignItems='center'
                                gap={5}
                            >
                                <Typography onClick={() => setSelectedPage(prev => prev.includes('Login') ? 'StudentLogin' : 'StudentSignup')} sx={{ cursor: 'pointer' }} fontFamily='Inter' fontSize={18} fontWeight={600}>Student</Typography>
                                <Typography onClick={() => setSelectedPage(prev => prev.includes('Login') ? 'TeacherLogin': 'TeacherSignup')} sx={{ cursor: 'pointer' }} fontFamily='Inter' fontSize={18} fontWeight={600}>Instructor</Typography>
                                <Typography onClick={() => setSelectedPage('Company')} sx={{ cursor: 'pointer' }} fontFamily='Inter' fontSize={18} fontWeight={600}>Company</Typography>
                            </Stack>
                            <Box
                                width='35%'
                                position='absolute'
                                bgcolor={selectedPage === 'StudentLogin' || selectedPage === 'StudentSignup' ? '#FF9F06' : '#6A9DBC'}
                                height='8px'
                                sx={{
                                    top: '63%',
                                    left: selectedPage === 'StudentLogin' || selectedPage === 'StudentSignup' ? '0%' : selectedPage === 'TeacherLogin' || selectedPage === 'TeacherSignup' ? '31.2%' : '65%',
                                    transition: '0.3s'
                                }}
                            >

                            </Box>
                            <Box
                                width='100%'
                                height='8px'
                                bgcolor={selectedPage === 'StudentLogin' || selectedPage === 'StudentSignup' ? '#FEF4EB' : '#D0EBFC'}
                                mt={1}
                                sx={{
                                    transition: '0.3s'
                                }}
                            >

                            </Box>
                        </Stack>
                        {
                            selectedPage === 'StudentLogin' ?
                            <StudentLogIn /> :
                            selectedPage === 'TeacherLogin' ?
                            <TeacherLogIn /> :
                            selectedPage === 'TeacherSignup' ?
                            <TeacherSignUp /> :
                            selectedPage === 'StudentSignup' ?
                            <StudentSignUp /> :
                            <CompanyRegister />
                        }
                    </Stack>
                    </Box>
                </Box>
            </Box>
        </LoginContext.Provider>
    )
}

const memoizedSignUp = memo(Login)
export default memoizedSignUp