import FormControl from "@mui/material/FormControl";
import { auth, db } from '../../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Alert, Box, Button, Select, Stack, TextField, Typography } from "@mui/material";
import { MuiTelInput } from 'mui-tel-input'
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { getUserByNumber } from "../../helpers/getUserByNumber";
import { getUserByEmail } from "../../helpers/getUserByEmail";

export default function StudentSignUp() 
{
    const[number, setNumber] = useState('+20')
    const[firstname, setFirstname] = useState('')
    const[lastname, setLastname] = useState('')
    const[email, setEmail] = useState('')
    const[city, setCity] = useState('')
    const[occupation, setOccupation] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[verifyPassword, setVerifyPassword] = useState(false)
    const [canSave, setCanSave] = useState(false)
    const [error, setError] = useState('')

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(canSave)
        {
            const numberAlreadyInUse = await getUserByNumber(number)

            if(numberAlreadyInUse)
            {
                setError('Mobile Number Already In Use!')
            }
            else
            {
                const emailAlreadyInUse = await getUserByEmail(email)

                if(emailAlreadyInUse)
                {
                    setError('Email is Already In Use!')
                }
                else
                {
                    createUserWithEmailAndPassword(auth, email, password)
                    .then(async (user) => {
                            const uid = user.user.uid
            
                            const studentRef = doc(db, 'students', uid)
                            await setDoc(studentRef, {
                                favoritePrograms: [],
                                friends: [],
                                name: `${firstname} ${lastname}`,
                                email,
                                number,
                                image: '',
                                Country: 'Egypt'
                            })
            
                            const userRef = collection(db, 'users')
                            await addDoc(userRef, {
                                userId: email,
                                role: 'student',
                                number
                            })
                    })
                    .catch(e => console.error(e))
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    setFirstname('')
                    setLastname('')
                    setNumber('')
                }
            }
        }
        else
        {
            setError('Please Enter All Details!')
        }
    }

    function handleNumber(e: string)
    {
        if(e === '+20 0' && number === '+20')
        { 
            return
        }
        else setNumber(e)
    }

    useEffect(() => {
        setVerifyPassword(password === confirmPassword)
    }, [password, confirmPassword])

    useEffect(() => {
        setCanSave([verifyPassword, email, firstname, lastname, number, city, occupation].every(Boolean))
    }, [verifyPassword, email, firstname, lastname, number, city, occupation])

    return (
        <Box
            display='flex'
            flexDirection='column'
            flex={1}
        >
            <Stack flex={1} mb={4} textAlign='center'>
                <Typography fontSize={20} fontFamily='Inter' fontWeight={700}>Sign Up</Typography>
            </Stack>
            {
                error &&
                <Stack flex={1} mb={4} textAlign='center'>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            }
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    flex: 1,
                    marginBottom: 1,
                }}
                onSubmit={signUp}
            >
                <Stack
                    direction='row'
                    gap={4}
                >
                    <FormControl sx={{ flex: 1 }}>
                        <TextField 
                            fullWidth
                            required
                            
                            color="info"
                            variant="outlined"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
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
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                    fontSize: 18,
                                    // border: '1px solid rgba(0, 0, 0, 1)',
                                    borderRadius: '5px'
                                }
                            }}
                        />
                    </FormControl>
                </Stack>
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
                <FormControl>
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
                <FormControl>
                    <Select
                        SelectDisplayProps={{
                            style: {
                                borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                                marginRight: 48,
                                borderTopRightRadius: '0px',
                                borderBottomRightRadius: '0px',
                                textIndent: '80px',
                                color: 'rgba(0, 0, 0, 0.4)'
                            }
                        }}
                        defaultValue='Occupation'
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    >
                        <MenuItem value='Occupation'>Occupation</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                <Select
                        SelectDisplayProps={{
                            style: {
                                borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                                marginRight: 48,
                                borderTopRightRadius: '0px',
                                borderBottomRightRadius: '0px',
                                textIndent: '80px',
                                color: 'rgba(0, 0, 0, 0.4)'
                            }
                        }}
                        defaultValue={'City'}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                        <MenuItem value='City'>City</MenuItem>
                    </Select>
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
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        fullWidth
                        required
                        
                        color="info"
                        variant="outlined"
                        placeholder="Confirm Password"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Sign Up
                    </Button>
                    <Typography sx={{ mt: 1 }} fontWeight={600} fontSize={16} fontFamily='Inter' textAlign='center'>Already have an account? <Link style={{ color: '#FF7E00', textDecoration: 'none' }} to='/login'>Login</Link></Typography>
                </Box>
            </form>
        </Box>
    )
}
