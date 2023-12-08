import FormControl from "@mui/material/FormControl";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function TeacherLogIn() 
{
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const [error, setError] = useState('')

    const [canSave, setCanSave] = useState(false)

    const logIn = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(canSave)
        {
            const userRef = collection(db, 'users')
            const queryUser = query(userRef, where('userId', '==', email))
            const userDoc = await getDocs(queryUser)

            if(userDoc.docs.length && userDoc.docs[0]?.data().role === 'teacher')
            {
                signInWithEmailAndPassword(auth, email, password)
                .then()
                .catch(e => console.error(e))
                setEmail('')
                setPassword('')
            }
            else
            {
                setError('Email Not Found!')
            }
        }
    }

    // function handleNumber(e: string)
    // {
    //     if(e === '+20 0' && number === '+20')
    //     { 
    //         return
    //     }
    //     else setNumber(e)
    // }

    // useEffect(() => {
    //     setVerifyPassword(password === confirmPassword)
    // }, [password, confirmPassword])

    useEffect(() => {
        setCanSave([email, password].every(Boolean))
    }, [email, password])

    return (
        <Box
            display='flex'
            flexDirection='column'
            flex={1}
        >
            <Stack flex={1} mb={4} textAlign='center'>
                <Typography fontSize={20} fontFamily='Inter' fontWeight={700}>Log In</Typography>
            </Stack>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    flex: 1
                }}
                onSubmit={logIn}
            >
                {error && <Typography textAlign='center' fontWeight={500} fontFamily='Inter' sx={{ color: '#ff0000' }}>{error}</Typography>}
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        fullWidth
                        required
                        
                        color="info"
                        variant="outlined"
                        placeholder="Email"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'left',
                                textIndent: '80px',
                                fontSize: 18,
                                // border: '1px solid rgba(0, 0, 0, 1)',
                                borderRadius: '5px'
                            }
                        }}
                    />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        fullWidth
                        required
                        
                        color="info"
                        variant="outlined"
                        placeholder="Password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'left',
                                textIndent: '80px',
                                fontSize: 18,
                                // border: '1px solid rgba(0, 0, 0, 1)',
                                borderRadius: '5px'
                            }
                        }}
                    />
                </FormControl>
                <Box
                    flex={1}
                    display='flex'
                    flexDirection='column'
                >
                    <Button
                        sx={{
                            flex: 1,
                            background: '#226E9F',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 18,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '1px solid #226E9F',
                            borderRadius: '6px',
                            '&:hover': {
                                background: '#226E9F',
                                opacity: 1
                            },
                            paddingY: 1.5
                        }}
                        type="submit"
                        >
                        Log In
                    </Button>
                    <Typography sx={{ mt: 1 }} fontWeight={600} fontSize={16} fontFamily='Inter' textAlign='center'>Dont have an account? <Link style={{ color: '#FF7E00', textDecoration: 'none' }} to='/signup'>Signup</Link></Typography>
                </Box>
            </form>
        </Box>
    )
}
