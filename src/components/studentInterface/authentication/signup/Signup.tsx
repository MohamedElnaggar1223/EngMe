import { useState } from "react"
import { auth } from '../../../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Box, Stack, Typography } from "@mui/material"

export default function Signup() 
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => console.log(userCredentials))
        .catch(e => console.error(e))
    }

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
        >
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
                <Stack
                    direction='column'
                    pl={3}
                    pr={26}
                    mt={20}
                    sx={{
                        transform: 'rotate(-5deg)'
                    }}
                >
                    <Stack
                        direction='column'
                        flex={1}
                        position='relative'
                    >
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Typography sx={{ paddingLeft: 12 }} fontFamily='Inter' fontSize={18} fontWeight={600}>Student</Typography>
                            <Typography sx={{ paddingRight: 12 }} fontFamily='Inter' fontSize={18} fontWeight={600}>Teacher</Typography>
                        </Stack>
                        <Box
                            width='60%'
                            position='absolute'
                            bgcolor='#6A9DBC'
                            height='8px'
                            sx={{
                                top: '63%'
                            }}
                        >

                        </Box>
                        <Box
                            width='100%'
                            height='8px'
                            bgcolor='#D0EBFC'
                            mt={1}
                        >

                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}
