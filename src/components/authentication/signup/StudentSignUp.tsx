import FormControl from "@mui/material/FormControl";
import { auth, db } from '../../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { Alert, Box, Button, Select, Stack, TextField, Typography } from "@mui/material";
import { MuiTelInput } from 'mui-tel-input'
import { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getUserByNumber } from "../../helpers/getUserByNumber";
import { getUserByEmail } from "../../helpers/getUserByEmail";
import { ExpandMore } from "@mui/icons-material"
import { LoginContext } from "../login/Login";
import { useNavigate } from "react-router-dom";

export default function StudentSignUp() 
{
    //@ts-expect-error context
    const { setSelectedPage } = useContext(LoginContext)

    const[number, setNumber] = useState('+20')
    const[firstname, setFirstname] = useState('')
    const[lastname, setLastname] = useState('')
    const[email, setEmail] = useState('')
    const[occupation, setOccupation] = useState('')
    const[otherOccupation, setOtherOccupation] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[verifyPassword, setVerifyPassword] = useState(false)
    const [canSave, setCanSave] = useState(false)
    const [occupationOpened, setOccupationOpened] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

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
                            await signInWithEmailAndPassword(auth, email, password)
                            const uid = user.user.uid
            
                            const studentRef = doc(db, 'students', uid)

                            const teachersRef = collection(db, 'teachers')

                            const teachers = await getDocs(teachersRef)

                            await setDoc(studentRef, {
                                favoritePrograms: [],
                                friends: [...teachers.docs.map(teacher => teacher.id)],
                                name: `${firstname} ${lastname}`,
                                email,
                                number,
                                image: '',
                                occupation: occupation !== 'other' ? occupation : otherOccupation,
                                Country: 'Egypt'
                            })
            
                            const userRef = collection(db, 'users')
                            await addDoc(userRef, {
                                userId: email,
                                role: 'student',
                                number
                            })
                            navigate('/')
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
        setCanSave([verifyPassword, email, firstname, lastname, number, occupation].every(Boolean))
    }, [verifyPassword, email, firstname, lastname, number, occupation])

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
                    <Box sx={{ cursor: 'pointer' }} onClick={() => setOccupationOpened(prev => !prev)}>
                        <Select
                            sx={{
                                width: '100% !important',
                                flex: 1,
                                boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.20)',
                                borderRadius: '4px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: 'transparent',
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                    background: 'transparent',
                                }, 
                                textAlign: 'left',
                                pl: '80px',
                                fontSize: 18,
                            }}
                            // value={day}
                            IconComponent={() => <ExpandMore sx={{ cursor: 'pointer', borderLeft: '1.5px solid rgba(0, 0, 0, 0.20)', color: '#000', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '90%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            // variant='standard'
                            disableUnderline
                            color='primary'
                            defaultValue='Occupation'
                            open={occupationOpened}
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                        >
                            <MenuItem value='Software Engineer'>Software Engineer</MenuItem>
                            <MenuItem value='Project Manager'>Project Manager</MenuItem>
                            <MenuItem value='Mechanical Engineer'>Mechanical Engineer</MenuItem>
                            <MenuItem value='Student'>Student</MenuItem>
                            <MenuItem value='Other'>Other</MenuItem>
                        </Select>
                    </Box>
                </FormControl>
                {
                    occupation === 'Other' &&
                    <FormControl sx={{ flex: 1 }}>
                        <TextField 
                            fullWidth
                            required
                            name='otherOccupation'
                            color="info"
                            variant="outlined"
                            placeholder="Other Occupation"
                            value={otherOccupation}
                            onChange={(e) => setOtherOccupation(e.target.value)}
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
                }
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
                    <Typography sx={{ mt: 1 }} fontWeight={600} fontSize={16} fontFamily='Inter' textAlign='center'>Already have an account? <span style={{ color: '#FF7E00', textDecoration: 'none', cursor: 'pointer' }} onClick={() => setSelectedPage('StudentLogin')}>Login</span></Typography>
                </Box>
            </form>
        </Box>
    )
}
