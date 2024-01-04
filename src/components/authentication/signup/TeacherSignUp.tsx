import FormControl from "@mui/material/FormControl";
import { Alert, Box, Button, Select, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import { MuiTelInput } from 'mui-tel-input'
import { useState, useRef, useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { addDoc, collection, doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebaseConfig";
import { getUserByEmail } from "../../helpers/getUserByEmail";
// import { getUserByNumber } from "../../helpers/getUserByNumber";
import { useMutation } from "@tanstack/react-query";
import { setTeacherRequest } from "../../helpers/setTeacherRequest";
import { getTeacherRequest } from "../../helpers/getTeacherRequest";
import { getUserByNumber } from "../../helpers/getUserByNumber";
import emailjs from '@emailjs/browser';
import { ExpandMore } from "@mui/icons-material"
import { LoginContext } from "../login/Login";

export default function StudentSignUp() 
{
    //@ts-expect-error context
    const { setSelectedPage } = useContext(LoginContext)

    const form = useRef();

    const[number, setNumber] = useState('+20')
    const[firstname, setFirstname] = useState('')
    const[lastname, setLastname] = useState('')
    const[email, setEmail] = useState('')
    const[city, setCity] = useState('')
    const[occupation, setOccupation] = useState('')
    // const[password, setPassword] = useState('')
    // const[confirmPassword, setConfirmPassword] = useState('')
    // const[verifyPassword, setVerifyPassword] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [file, setFile] = useState(null)
    //const [canSave, setCanSave] = useState(false)
    const [error, setError] = useState('')
    const [applied, setApplied] = useState('')
    const [occupationOpened, setOccupationOpened] = useState(false)
    const [cityOpened, setCityOpened] = useState(false)

    // const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     if(canSave)
    //     {
    //         const numberAlreadyInUse = await getUserByNumber(number)

    //         if(numberAlreadyInUse)
    //         {
    //             setError('Mobile Number Already In Use!')
    //         }
    //         else
    //         {
    //             const emailAlreadyInUse = await getUserByEmail(email)

    //             if(emailAlreadyInUse)
    //             {
    //                 setError('Email is Already In Use!')
    //             }
    //             else
    //             {
    //                 createUserWithEmailAndPassword(auth, email, password)
    //                 .then(async (user) => {
    //                     const uid = user.user.uid
        
                        
    //                     const teacherRef = doc(db, 'teachers', uid)
    //                     await setDoc(teacherRef, {
    //                         friends: [],
    //                         name: `${firstname} ${lastname}`,
    //                         email,
    //                         image: '',
    //                         programs: [],
    //                         title: 'Professor in Human Biology',
    //                         university: 'The German University in Cairo',
    //                         averageRating: 0,
    //                         profileViews: 0
    //                     })
        
    //                     const scheduleRef = collection(db, 'teacherSchedule')
    //                     await addDoc(scheduleRef, {
    //                         numberOfDays: 6,
    //                         slots: [
    //                             {
    //                                 day: 'Sunday',
    //                                 endTime: '2 PM',
    //                                 startTime: '1 PM'
    //                             }
    //                         ],
    //                         teacherId: uid
    //                     })
                        
    //                     const userRef = collection(db, 'users')
    //                     await addDoc(userRef, {
    //                         userId: email,
    //                         role: 'teacher',
    //                         number
    //                     })
    //                 })
    //                 .catch(e => console.error(e))
    //                 setEmail('')
    //                 setPassword('')
    //                 setConfirmPassword('')
    //                 setFirstname('')
    //                 setLastname('')
    //                 setNumber('')
    //             }
    //         }
    //     }
    //     else
    //     {
    //         setError('Please Enter All Details!')
    //     }
    // }

    const { mutate: mutateTeacherRequest } = useMutation({
        onSettled: () => {
            setError('')
            setApplied('Successfully Applied for Our Team!')
            setFirstname('')
            setLastname('')
            setEmail('')
            setNumber('+20')
            setFile(null)
        },
        mutationFn: () => setTeacherRequest(firstname, lastname, email, number, file)
    })

    const canSave = [firstname, lastname, number, file].every(Boolean)

    async function signUp(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const emailAlreadyInUse = await getUserByEmail(email)

        if(canSave)
        {
            if(emailAlreadyInUse)
            {
                setError('Email is Already In Use!')
            }
            else
            {
                const numberAlreadyInUse = await getUserByNumber(number)
    
                if(numberAlreadyInUse)
                {
                    setError('Mobile Number Already In Use!')
                }
                else
                {
                    const emailAlreadyRequested = await getTeacherRequest(email)
        
                    if(emailAlreadyRequested)
                    {
                        setError('Email is Already Applied!')
                    }
                    else
                    {
                        //@ts-expect-error form
                        emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_ID)
            
                        mutateTeacherRequest()
                    }
                }
            }
        }
        else
        {
            setError('Please Enter All Details!')
        }
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0])
        {
            const uploadedFile = event.target.files[0];
    
            if (uploadedFile) {
                // Check if the file type is either PDF or MP4
                const allowedTypes = ['application/pdf'];
                if (allowedTypes.includes(uploadedFile.type)) {
                    //@ts-expect-error file
                    setFile(uploadedFile);
                    const fileType = uploadedFile.type;
                    //@ts-expect-error file
                    setFileType(fileType);
                }
            }
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

    // useEffect(() => {
    //     setVerifyPassword(password === confirmPassword)
    // }, [password, confirmPassword])

    // useEffect(() => {
    //     setCanSave([verifyPassword, email, firstname, lastname, number, city, occupation].every(Boolean))
    // }, [verifyPassword, email, firstname, lastname, number, city, occupation])

    return (
        <Box
            display='flex'
            flexDirection='column'
        >
            <Stack flex={1} mb={4} textAlign='center'>
                <Typography fontSize={20} fontFamily='Inter' fontWeight={700}>Apply to be on our team!</Typography>
            </Stack>
            {
                error &&
                <Stack flex={1} mb={4} textAlign='center'>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            }
            {
                applied &&
                <Stack flex={1} mb={4} textAlign='center'>
                    <Alert severity="success">{applied}</Alert>
                </Stack>
            }
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                }}
                //@ts-expect-error form
                ref={form}
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
                            name='firstName'
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
                            name='lastName'
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
                        name='email'
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
                        name='number'
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
                                pl: '37px',
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
                            <MenuItem value='Occupation'>Occupation</MenuItem>
                        </Select>
                    </Box>
                </FormControl>
                <FormControl>
                    <Box sx={{ cursor: 'pointer' }} onClick={() => setCityOpened(prev => !prev)}>
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
                                pl: '37px',
                                fontSize: 18,
                                zIndex: 5
                            }}
                            // value={day}
                            IconComponent={() => <ExpandMore sx={{ cursor: 'pointer', borderLeft: '1.5px solid rgba(0, 0, 0, 0.20)', color: '#000', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '90%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            // variant='standard'
                            disableUnderline
                            defaultValue={'City'}
                            open={cityOpened}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <MenuItem value='City'>City</MenuItem>
                        </Select>
                    </Box>
                </FormControl>
                {/* <FormControl sx={{ flex: 1 }}>
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
                </FormControl> */}
                <Button
                    component="label"
                    sx={{
                        flex: 1,
                        background: '#FF9F06',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid #FF9F06',
                        borderRadius: '10px',
                        '&:hover': {
                            background: '#FF9F06',
                            opacity: 1
                        },
                        paddingY: 1.5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    <input
                        hidden
                        accept=".pdf"
                        onChange={(e) => onFileChange(e)}
                        type="file"
                    />
                    <SvgIcon sx={{ fontSize: 35 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" viewBox="0 0 36 30" fill="none">
                            <path d="M18.8633 11.6064V29.1412C18.8633 29.6064 18.4673 30 17.9994 30C17.5314 30 17.1354 29.6064 17.1354 29.1412V11.6064L13.7155 15.1849C13.3915 15.5428 12.8155 15.5428 12.4556 15.2207C12.0956 14.8987 12.0956 14.3261 12.4196 13.9683L17.3514 8.85097C17.5314 8.67205 17.7474 8.56469 17.9994 8.56469C18.2513 8.56469 18.4673 8.67205 18.6473 8.85097L23.5792 13.9683C23.9031 14.3261 23.9031 14.8629 23.5432 15.2207C23.3632 15.3997 23.1472 15.4712 22.9312 15.4712C22.7152 15.4712 22.4632 15.3639 22.2832 15.1849L18.8633 11.6064ZM35.9987 15.5786C35.8907 11.3917 32.9028 7.13329 27.431 7.13329C27.287 7.13329 27.143 7.13329 26.999 7.13329C26.639 5.45138 25.8831 3.94841 24.6951 2.73171C23.4352 1.44345 21.7792 0.548818 19.9433 0.190966C16.1994 -0.560522 12.5635 0.942454 10.5116 4.05576C8.3877 3.80527 6.33577 4.48518 4.71583 5.91659C3.05989 7.38378 2.19592 9.45932 2.30392 11.6064C0.82797 13.0021 0 14.9345 0 16.9384C0 21.0179 3.34788 24.3102 7.41573 24.3102H14.4715C14.9395 24.3102 15.3355 23.9165 15.3355 23.4513C15.3355 22.9861 14.9395 22.5925 14.4715 22.5925H7.41573C4.28385 22.5925 1.76394 20.0517 1.76394 16.9742C1.76394 15.3281 2.51991 13.7535 3.81586 12.6442C4.03186 12.4653 4.13985 12.179 4.13985 11.8927C3.95986 10.1035 4.64383 8.42155 5.97579 7.20486C7.30774 6.02395 9.07168 5.52295 10.8356 5.88081C11.1956 5.95238 11.5916 5.77345 11.7716 5.45138C13.3555 2.66014 16.4154 1.26452 19.6193 1.94444C22.1392 2.44543 24.9831 4.37783 25.4151 8.20684C25.4511 8.45734 25.5591 8.67205 25.7391 8.81519C25.9191 8.95833 26.1711 9.0299 26.4231 8.99411C26.747 8.95833 27.107 8.92254 27.467 8.92254C32.0389 8.92254 34.1988 12.4295 34.2708 15.6502C34.3428 18.9424 32.2548 22.3778 27.431 22.5925H21.5272C21.0592 22.5925 20.6633 22.9861 20.6633 23.4513C20.6633 23.9165 21.0592 24.3102 21.5272 24.3102H27.431H27.467C30.1669 24.167 32.4348 23.165 33.9828 21.4116C35.3147 19.8728 36.0347 17.7973 35.9987 15.5786Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    Upload CV
                </Button>
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
            </form>
            <Typography sx={{ mt: 1 }} fontWeight={600} fontSize={16} fontFamily='Inter' textAlign='center'>Already have an account? <span style={{ color: '#FF7E00', textDecoration: 'none', cursor: 'pointer' }} onClick={() => setSelectedPage('TeacherLogin')}>Login</span></Typography>
        </Box>
    )
}
