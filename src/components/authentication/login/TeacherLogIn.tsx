import FormControl from "@mui/material/FormControl";
import { Alert, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MuiTelInput } from "mui-tel-input";

export default function TeacherLogIn() 
{
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[number, setNumber] = useState('+20')

    const [error, setError] = useState('')

    const [canSave, setCanSave] = useState(false)

    function handleNumber(e: string)
    {
        if(e === '+20 0' && number === '+20')
        { 
            return
        }
        else 
        {
            setNumber(e)
            setEmail('')
        }
    }

    const logIn = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(canSave)
        {
            if(email)
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
                    setError('Email Does Not Exist!')
                }
            }
            else if(number)
            {
                const userRef = collection(db, 'users')
                const queryUser = query(userRef, where('number', '==', number))
                const userDoc = await getDocs(queryUser)
    
                if(userDoc.docs.length && userDoc.docs[0]?.data().role === 'teacher')
                {
                    signInWithEmailAndPassword(auth, userDoc.docs[0].data().userId, password)
                    .then()
                    .catch(() => {
                        setError('Incorrect Password')
                    })
                    setEmail('')
                    setPassword('')
                }
                else
                {
                    setError('Mobile Number Does Not Exist!')
                }
            }
            else
            {
                setError('Please Enter Email or Number!')
            }
        }
        else
        {
            setError('Please Enter All Details!')
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
        setCanSave([password].every(Boolean))
    }, [password])

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
                {error && <Alert severity="error">{error}</Alert>}
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        fullWidth
                        color="info"
                        variant="outlined"
                        placeholder="Email"
                        type='email'
                        value={email}
                        onChange={(e) => {
                            handleNumber('+20')
                            setEmail(e.target.value)
                        }}
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
                <div style={{ position: 'relative', margin: '20px 0' }}>
                    <Divider style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }} />
                    <Typography fontSize={22} fontWeight={500} fontFamily='Inter' variant="body2" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '0 10px' }}>
                        Or
                    </Typography>
                </div>
                <FormControl sx={{ flex: 1 }}>
                    <MuiTelInput 
                        value={number} 
                        onChange={handleNumber} 
                        placeholder='Phone Number'
                        inputProps={{
                            style: {
                                textAlign: 'left',
                                textIndent: '37px',
                                fontSize: 18,
                                borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
                                borderTopLeftRadius: '0px',
                                borderBottomLeftRadius: '0px',
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
