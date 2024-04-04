import { Avatar, Box, Button, IconButton, Input, InputAdornment, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import logo from '../../../assets/Ellipse 1.png'
import { memo, useContext, useEffect, useRef, useState } from "react";
// import { PageContext } from "../../Layout";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "../../helpers/getNotifications";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";
import { setNotification } from "../../helpers/setNotification";

// eslint-disable-next-line react-refresh/only-export-components
function Header() 
{
    const queryClient = useQueryClient()

    
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const isAdmin = userData.email === import.meta.env.VITE_ADMIN_EMAIL

    const notRef = useRef(null)
    const settingsRef = useRef(null)
    
    const [openNot, setOpenNot] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)
    
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [pushNotification, setPushNotifictaion] = useState(false)
    const [notification, setNotifictaionSent] = useState('')

    const { data: notifications } = useQuery({
        queryKey: ['notifications', userData?.id],
        queryFn: () => getNotifications()
    })

    const { mutate: mutateNotification } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['notifications', userData?.id])

            queryClient.setQueryData(['notifications', userData?.id], (oldData: unknown) => {
                //@ts-expect-error oldData
                return [...oldData, { notification, createdAt: Timestamp.now() }]
            })

            return () => queryClient.setQueryData(['notifications', userData?.id], previousData)
        },
        onSettled: () => setNotifictaionSent(''),
        mutationFn: () => setNotification(notification, ['all'], [''], '/'),
    })
    
    useEffect(() => {
        //@ts-expect-error event
        const handleClickOutside = (event) => {
            // console.log(notRef.current)
            // console.log(event.target)
            //@ts-expect-error event
            if (notRef.current && !notRef.current.contains(event.target)) {
                setOpenNot(false);  // Update your state as needed
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    useEffect(() => {
        //@ts-expect-error event
        const handleClickOutside = (event) => {
            // console.log(settingsRef.current)
            // console.log(event.target)
            //@ts-expect-error event
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setOpenSettings(false);  // Update your state as needed
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    //@ts-expect-error tonotif
    const filteredNotifications = isAdmin ? notifications : notifications?.filter(notif => notif?.to.includes('all') || notif?.to.includes(userData?.id))

    const displayedNotifications = filteredNotifications?.map(notif => {
        //@ts-expect-error notif
        const hoursAgo = (Timestamp.now().toDate().getTime() - notif?.createdAt.toDate().getTime()) / (1000 * 60 * 60)
        //@ts-expect-error notif
        const minutesAgo = (Timestamp.now().toDate().getTime() - notif?.createdAt.toDate().getTime()) / (1000 * 60)
        return (
            <Stack
                direction='column'
                key={notif.id}
                height='100px'
                bgcolor='#D0EBFC'
                flex={1}
                p={2}
                alignItems='center'
                width='94.2%'
            >
                <Stack
                    direction='row'
                    gap={4}
                    mr='auto'
                >
                    {
                        ////@ts-expect-error notifto
                        // notif?.to === 'all' && 
                        <Stack
                            alignItems='center'
                            width='fit-content'
                            gap={1}
                            my={0}
                            alignSelf='center'
                        >
                            <Avatar src={logo} sx={{ width: 70, height: 70, bgcolor: '#fff' }} alt='engme' variant="circular" />
                            <Typography
                                fontSize={16}
                                fontFamily='Inter'
                                noWrap
                                fontWeight={500}
                                sx={{
                                    color: '#000',
                                    textAlign: 'center'
                                }}
                            >
                                EngMe
                            </Typography>
                        </Stack>
                    }                    
                    <Typography
                        fontSize={14}
                        fontWeight={600}
                        fontFamily='Inter'
                        display='flex'
                        alignSelf='flex-start'
                        sx={{
                            color: '#000',
                            alignSelf: 'center'
                        }}
                    >
                        {/*//@ts-expect-error notif */}
                        {notif?.notification}
                    </Typography>
                </Stack>
                <Typography fontSize={12} sx={{ opacity: 0.6, ml: 'auto' }}>{hoursAgo > 1 ? `${hoursAgo.toFixed(0)} Hours Ago` : `${minutesAgo.toFixed(0)} Minutes Ago`}</Typography>
            </Stack>
        )
    })

    useEffect(() => {
        const notificationsRef = collection(db, 'notifications')

        const unsub = onSnapshot(notificationsRef, () => {
            queryClient.invalidateQueries({ queryKey: ['notifications', userData?.id] })
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

    async function handleSignOut()
    {
        await signOut(auth);
    }

    return (
        <Box
            width='auto'
            px={14}
            py={2}
            display='flex'
            flexDirection='column'
            boxShadow='0px 2px 8px 0px rgba(0,0,0,0.2)'
            bgcolor='#fff'
            // mb={1}
            position='sticky'
            sx={{
                top: 0
            }}
            zIndex={99}
        >
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                mb={1}
            >
                <Stack
                    direction='row'
                >
                    <img width='85px' height='85px' src={logo} alt='logo' />
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        gap={5}
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                        >
                            <Stack
                                direction='row'
                                gap={2}
                                ml={4}
                                alignItems='center'
                            >
                                <Typography onClick={() => navigate('/')} sx={{ color: pathname === '/' ? '#226E9F' : '#000', cursor: 'pointer' }}>
                                    Profiles
                                </Typography>
                                <SvgIcon>
                                    <svg width="1" height="22" viewBox="0 0 1 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.501953" y1="2.18558e-08" x2="0.501952" y2="22" stroke="black"/>
                                    </svg>
                                </SvgIcon>
                                <Typography onClick={() => navigate('/programs')} sx={{ color: pathname === '/' ?  '#000' : pathname.includes('programs') ? '#226E9F' : '#000', cursor: 'pointer' }}>
                                    Programs
                                </Typography>
                                <SvgIcon>
                                    <svg width="1" height="22" viewBox="0 0 1 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.501953" y1="2.18558e-08" x2="0.501952" y2="22" stroke="black"/>
                                    </svg>
                                </SvgIcon>
                                <Typography onClick={() => navigate('/instructors')} sx={{ color: pathname === '/' ?  '#000' : pathname.includes('instructors') ? '#226E9F' : '#000', cursor: 'pointer' }}>
                                    Instructors
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    alignItems='center'
                    gap={6}
                    pb={3}
                    position='relative'
                >
                    {
                        isAdmin &&
                        <Stack
                            direction='row'
                        >
                            <form
                                onSubmit={(e) =>{ 
                                    e.preventDefault()
                                    mutateNotification()
                                }}
                            >
                                <Input
                                    sx={{ 
                                        flex: 1,
                                        marginRight: 2,
                                        fontSize: 20,
                                        width: pushNotification ? '400px' : '0px',
                                        transition: '0.5s',
                                        bgcolor: '#fcfcfc',
                                        borderRadius: '5px',
                                        border: pushNotification ? '1px solid #6A9DBC' : ''
                                    }}
                                    disableUnderline
                                    value={notification}
                                    startAdornment={
                                        pushNotification &&
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SvgIcon>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="38" viewBox="0 0 41 38" fill="none">
                                                        <rect x="0.5" y="0.5" width="40" height="37" rx="4.5" fill="white" stroke="url(#paint0_linear_2_5856)"/>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.82183 15.9618L13.1996 19.037L27.7157 9.19398L8.82183 15.9618ZM18.8681 24.4418L18.0316 27.4855L20.1675 25.3547L18.8681 24.4418ZM16.8317 27.6048L13.8904 19.9767L27.2708 10.9048L18.1031 23.1355C18.0581 23.1953 18.0245 23.2639 18.0044 23.3372L16.8309 27.6051L16.8317 27.6048ZM21.1234 26.026L17.3422 29.7987C17.2789 29.8746 17.1983 29.9322 17.108 29.9659C17.0176 29.9997 16.9206 30.0086 16.8262 29.9916C16.7317 29.9747 16.6429 29.9326 16.5682 29.8693C16.4935 29.806 16.4354 29.7235 16.3994 29.6299L12.7385 20.1359L7.26103 16.2884C7.17151 16.2286 7.09986 16.1432 7.05437 16.0422C7.00888 15.9413 6.9914 15.8288 7.00395 15.7178C7.01651 15.6068 7.05858 15.5018 7.1253 15.4149C7.19203 15.3281 7.2807 15.2629 7.38105 15.2269L30.2598 7.03136C30.3546 6.99742 30.4563 6.99089 30.5543 7.01245C30.6523 7.03401 30.743 7.08288 30.817 7.15397C30.891 7.22506 30.9456 7.31577 30.9751 7.41667C31.0046 7.51756 31.0079 7.62495 30.9848 7.72767L26.2304 28.6131C26.2173 28.6943 26.1883 28.7716 26.145 28.8402C26.1045 28.9052 26.0521 28.9611 25.991 29.0047C25.9299 29.0483 25.8612 29.0787 25.7889 29.0942C25.7166 29.1098 25.6422 29.1101 25.5697 29.0952C25.4973 29.0802 25.4284 29.0504 25.367 29.0073L21.1234 26.0251V26.026ZM29.2895 10.117L25.3211 27.5511L19.3596 23.3643L29.2895 10.117Z" fill="url(#paint1_linear_2_5856)"/>
                                                        <defs>
                                                            <linearGradient id="paint0_linear_2_5856" x1="20.5" y1="0" x2="20.5" y2="38" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#226E9F"/>
                                                            <stop offset="1" stopColor="#6A9DBC"/>
                                                            </linearGradient>
                                                            <linearGradient id="paint1_linear_2_5856" x1="19" y1="7" x2="19" y2="30" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#226E9F"/>
                                                            <stop offset="1" stopColor="#6A9DBC"/>
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </SvgIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                    onChange={(e) => setNotifictaionSent(e.target.value)}
                                />
                            </form>
                            <Button
                                sx={{
                                    background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                                    color: '#fff',
                                    fontFamily: 'Inter',
                                    fontSize: 14,
                                    textTransform: 'none',
                                    fontWeight: 400,
                                    border: '1px solid linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                                        opacity: 1
                                    },
                                    paddingX: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '160px',
                                    alignSelf: 'flex-end',
                                    height: '38px'
                                }}
                                onClick={() => setPushNotifictaion(prev => !prev)}
                            >
                                Push Notifictaion
                            </Button>
                        </Stack>
                        
                    }
                    <SvgIcon 
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenNot(prev => !prev)
                        }} 
                        sx={{ cursor: 'pointer', fontSize: 42 }}
                    >
                        <svg width="41" height="38" viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.08203" y="0.5" width="38.5833" height="37" rx="4.5" fill="white" stroke="#00C342"/>
                            <path d="M29.7939 25.6028C29.7949 26.0918 29.6019 26.5611 29.2572 26.908C28.9126 27.2548 28.4444 27.4507 27.9555 27.4528H12.4202C11.9321 27.4512 11.4646 27.2562 11.1201 26.9105C10.7755 26.5648 10.582 26.0966 10.582 25.6086C10.582 25.1205 10.7755 24.6523 11.1201 24.3066C11.4646 23.9609 11.9321 23.7659 12.4202 23.7643H27.9555C28.4426 23.7658 28.9094 23.9599 29.2539 24.3044C29.5984 24.6489 29.7925 25.1157 29.7939 25.6028ZM27.2621 17.1961C26.0957 17.1989 24.9521 16.8732 23.9621 16.2564C22.9721 15.6395 22.1758 14.7565 21.6643 13.7082C21.1527 12.6599 20.9466 11.4888 21.0695 10.3289C21.1925 9.169 21.6394 8.06712 22.3593 7.14937C21.966 7.02793 21.5621 6.94391 21.153 6.89843V4.96822C21.1534 4.84122 21.1287 4.71538 21.0804 4.59793C21.0321 4.48048 20.961 4.37372 20.8714 4.28377C20.7817 4.19383 20.6752 4.12246 20.5579 4.07376C20.4406 4.02507 20.3149 4 20.1879 4C20.0609 4 19.9351 4.02507 19.8178 4.07376C19.7005 4.12246 19.594 4.19383 19.5043 4.28377C19.4147 4.37372 19.3436 4.48048 19.2953 4.59793C19.247 4.71538 19.2223 4.84122 19.2227 4.96822V6.91774C17.3739 7.15948 15.6754 8.06331 14.442 9.4617C13.2087 10.8601 12.5241 12.6582 12.5152 14.5228V21.8383H27.8605V17.1672C27.6578 17.1865 27.4647 17.1961 27.2621 17.1961ZM17.9102 29.3854C17.9115 29.9886 18.152 30.5667 18.579 30.9929C19.006 31.419 19.5846 31.6583 20.1879 31.6583C20.7911 31.6583 21.3697 31.419 21.7967 30.9929C22.2237 30.5667 22.4642 29.9886 22.4655 29.3854H17.9102Z" fill="#226E9F"/>
                            <circle cx="27.582" cy="11" r="5" fill="#00C342"/>
                        </svg>
                    </SvgIcon>
                    <Box
                        sx={{
                            position: 'absolute',
                            right: '0px',
                            top: '100%',
                            mr: 11,
                            mt: -2,
                            width: '550px',
                            display: 'flex', 
                            alignItems: 'center',
                            flexDirection: 'column',
                            flex: 1,
                            zIndex: 99999,
                            borderRadius: '6px',
                            overflow: 'hidden',
                            height: openNot ? 'auto' : '0px'
                        }} 
                        ref={notRef}
                    >
                        {displayedNotifications}
                    </Box>
                    <SvgIcon 
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenSettings(prev => !prev)
                        }} 
                        sx={{ cursor: 'pointer', fontSize: 40, border: '1.5px solid', padding: 0.5, borderRadius: '6px', borderColor: '#6A9DBC' }}
                    >
                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.079 14.2794V13.6348C22.079 12.8283 21.4246 12.174 20.6181 12.174H19.8877C19.0811 12.174 18.4268 12.8283 18.4268 13.6348V14.2794C18.0829 14.3872 17.7524 14.5253 17.4377 14.6897L16.9818 14.2332C16.4114 13.6628 15.4862 13.6628 14.9158 14.2332L14.3991 14.75C13.8287 15.3203 13.8287 16.2455 14.3991 16.8159L14.8556 17.2724C14.6912 17.5865 14.5531 17.917 14.4453 18.2609H13.8007C12.9942 18.2609 12.3398 18.9153 12.3398 19.7218V20.4522C12.3398 21.2587 12.9942 21.9131 13.8007 21.9131H14.4453C14.5531 22.257 14.6912 22.5875 14.8556 22.9022L14.3991 23.3581C13.8287 23.9285 13.8287 24.8537 14.3991 25.424L14.9158 25.9408C15.4862 26.5112 16.4114 26.5112 16.9818 25.9408L17.4383 25.4843C17.7524 25.6486 18.0829 25.7868 18.4268 25.8946V26.5392C18.4268 27.3457 19.0811 28 19.8877 28H20.6181C21.4246 28 22.079 27.3457 22.079 26.5392V25.8946C22.4229 25.7868 22.7534 25.6486 23.0681 25.4843L23.524 25.9408C24.0944 26.5112 25.0196 26.5112 25.5899 25.9408L26.1067 25.424C26.6771 24.8537 26.6771 23.9285 26.1067 23.3581L25.6502 22.9016C25.8145 22.5875 25.9527 22.257 26.0604 21.9131H26.7051C27.5116 21.9131 28.1659 21.2587 28.1659 20.4522V19.7218C28.1659 18.9153 27.5116 18.2609 26.7051 18.2609H26.0604C25.9527 17.917 25.8145 17.5865 25.6502 17.2718L26.1067 16.8159C26.6771 16.2455 26.6771 15.3203 26.1067 14.75L25.5899 14.2332C25.0196 13.6628 24.0944 13.6628 23.524 14.2332L23.0675 14.6897C22.7534 14.5253 22.4229 14.3872 22.079 14.2794ZM20.8616 14.7445C20.8616 15.0287 21.0582 15.2753 21.3352 15.3386C21.8781 15.4615 22.387 15.6758 22.8441 15.9643C23.0845 16.1159 23.398 16.0812 23.5995 15.8797L24.3847 15.0945C24.4797 14.9989 24.6343 14.9989 24.7292 15.0945L25.2454 15.6106C25.341 15.7056 25.341 15.8602 25.2454 15.9552L24.4602 16.7404C24.2587 16.9419 24.224 17.2553 24.3756 17.4958C24.6641 17.9529 24.8784 18.4618 25.0013 19.0047C25.0646 19.2817 25.3112 19.4783 25.5954 19.4783H26.7051C26.8396 19.4783 26.9485 19.5873 26.9485 19.7218V20.4522C26.9485 20.5867 26.8396 20.6957 26.7051 20.6957C26.1755 20.6957 25.5954 20.6957 25.5954 20.6957C25.3112 20.6957 25.0646 20.8923 25.0013 21.1693C24.8784 21.7122 24.6641 22.2211 24.3756 22.6782C24.224 22.9186 24.2587 23.2321 24.4602 23.4336L25.2454 24.2188C25.341 24.3138 25.341 24.4684 25.2454 24.5633L24.7292 25.0795C24.6343 25.1751 24.4797 25.1751 24.3847 25.0795L23.5995 24.2943C23.398 24.0928 23.0845 24.0581 22.8441 24.2097C22.387 24.4982 21.8781 24.7125 21.3352 24.8354C21.0582 24.8987 20.8616 25.1453 20.8616 25.4295V26.5392C20.8616 26.6737 20.7526 26.7826 20.6181 26.7826H19.8877C19.7531 26.7826 19.6442 26.6737 19.6442 26.5392C19.6442 26.0096 19.6442 25.4295 19.6442 25.4295C19.6442 25.1453 19.4476 24.8987 19.1706 24.8354C18.6277 24.7125 18.1188 24.4982 17.6617 24.2097C17.4212 24.0581 17.1078 24.0928 16.9063 24.2943L16.1211 25.0795C16.0261 25.1751 15.8715 25.1751 15.7765 25.0795L15.2604 24.5633C15.1648 24.4684 15.1648 24.3138 15.2604 24.2188L16.0456 23.4336C16.2471 23.2321 16.2818 22.9186 16.1302 22.6782C15.8417 22.2211 15.6274 21.7122 15.5045 21.1693C15.4412 20.8923 15.1946 20.6957 14.9104 20.6957H13.8007C13.6662 20.6957 13.5572 20.5867 13.5572 20.4522V19.7218C13.5572 19.5873 13.6662 19.4783 13.8007 19.4783C14.3303 19.4783 14.9104 19.4783 14.9104 19.4783C15.1946 19.4783 15.4412 19.2817 15.5045 19.0047C15.6274 18.4618 15.8417 17.9529 16.1302 17.4958C16.2818 17.2553 16.2471 16.9419 16.0456 16.7404L15.2604 15.9552C15.1648 15.8602 15.1648 15.7056 15.2604 15.6106L15.7765 15.0945C15.8715 14.9989 16.0261 14.9989 16.1211 15.0945L16.9063 15.8797C17.1078 16.0812 17.4212 16.1159 17.6617 15.9643C18.1188 15.6758 18.6277 15.4615 19.1706 15.3386C19.4476 15.2753 19.6442 15.0287 19.6442 14.7445V13.6348C19.6442 13.5003 19.7531 13.3913 19.8877 13.3913H20.6181C20.7526 13.3913 20.8616 13.5003 20.8616 13.6348C20.8616 14.1644 20.8616 14.7445 20.8616 14.7445Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.6427 16.8395C9.92923 16.2875 8.68809 14.6787 8.68809 12.7826C8.68809 10.4312 10.5976 8.52171 12.949 8.52171C14.8451 8.52171 16.4538 9.76284 17.0059 11.4763C17.1088 11.7965 17.4521 11.9724 17.7717 11.8695C18.0912 11.7661 18.2677 11.4234 18.1643 11.1032C17.4545 8.90032 15.3868 7.30432 12.949 7.30432C9.92557 7.30432 7.4707 9.75919 7.4707 12.7826C7.4707 15.2204 9.0667 17.2881 11.2696 17.9979C11.5897 18.1014 11.9324 17.9248 12.0359 17.6053C12.1388 17.2857 11.9629 16.9424 11.6427 16.8395Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.2544 17.0435C18.5744 17.0435 17.2109 18.4069 17.2109 20.0869C17.2109 21.7669 18.5744 23.1304 20.2544 23.1304C21.9344 23.1304 23.2979 21.7669 23.2979 20.0869C23.2979 18.4069 21.9344 17.0435 20.2544 17.0435ZM20.2544 18.2608C21.2624 18.2608 22.0805 19.0789 22.0805 20.0869C22.0805 21.0949 21.2624 21.913 20.2544 21.913C19.2464 21.913 18.4283 21.0949 18.4283 20.0869C18.4283 19.0789 19.2464 18.2608 20.2544 18.2608Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.3399 24.3478C12.1786 24.3478 12.0234 24.2839 11.9096 24.1695C11.7951 24.0557 11.7312 23.9004 11.7312 23.7391V22.3507C11.7312 22.0579 11.5237 21.8071 11.2364 21.7523C9.98855 21.5156 8.8308 21.0237 7.81854 20.3347C7.57689 20.1703 7.25245 20.2008 7.0455 20.4071L6.06184 21.3908C5.94802 21.5052 5.7928 21.5691 5.6315 21.5691C5.47019 21.5691 5.31558 21.5052 5.20115 21.3908L4.34045 20.5301C4.22602 20.4157 4.1621 20.261 4.1621 20.0997C4.1621 19.9384 4.22602 19.7832 4.34045 19.6694L5.3241 18.6857C5.53045 18.4788 5.56089 18.1544 5.39654 17.9127C4.70689 16.9004 4.21567 15.7421 3.97889 14.4949C3.92411 14.2076 3.67332 14 3.38054 14H1.9921C1.8308 14 1.67558 13.9361 1.56175 13.8217C1.44732 13.7078 1.38341 13.5526 1.38341 13.3913V12.1739C1.38341 12.0126 1.44732 11.8574 1.56175 11.7436C1.67558 11.6291 1.8308 11.5652 1.9921 11.5652H3.38054C3.67332 11.5652 3.92411 11.3577 3.97889 11.0703C4.21567 9.82252 4.7075 8.66478 5.39654 7.65252C5.56089 7.41087 5.53045 7.08643 5.3241 6.87948L4.34045 5.89583C4.22602 5.782 4.1621 5.62678 4.1621 5.46548C4.1621 5.30417 4.22602 5.14957 4.34045 5.03513L5.20115 4.17444C5.31558 4.06 5.47019 3.99609 5.6315 3.99609C5.7928 3.99609 5.94802 4.06 6.06184 4.17444L7.0455 5.15809C7.25245 5.36443 7.57689 5.39487 7.81854 5.23052C8.8308 4.54087 9.98915 4.04965 11.2364 3.81287C11.5237 3.75809 11.7312 3.5073 11.7312 3.21452V1.82609C11.7312 1.66478 11.7951 1.50956 11.9096 1.39574C12.0234 1.2813 12.1786 1.21739 12.3399 1.21739H13.5573C13.7186 1.21739 13.8738 1.2813 13.9877 1.39574C14.1021 1.50956 14.166 1.66478 14.166 1.82609V3.21452C14.166 3.5073 14.3736 3.75809 14.6609 3.81287C15.9087 4.04965 17.0665 4.54148 18.0787 5.23052C18.3204 5.39487 18.6448 5.36443 18.8518 5.15809L19.8354 4.17444C19.9492 4.06 20.1044 3.99609 20.2658 3.99609C20.4271 3.99609 20.5817 4.06 20.6961 4.17444L21.5568 5.03513C21.6712 5.14957 21.7351 5.30417 21.7351 5.46548C21.7351 5.62678 21.6712 5.782 21.5568 5.89583L20.5731 6.87948C20.3668 7.08643 20.3364 7.41087 20.5007 7.65252C21.1904 8.66478 21.6816 9.82313 21.9184 11.0703C21.9731 11.3577 22.2239 11.5652 22.5167 11.5652H23.9051C24.0665 11.5652 24.2217 11.6291 24.3355 11.7436C24.4499 11.8574 24.5138 12.0126 24.5138 12.1739C24.5138 12.5099 24.7865 12.7826 25.1225 12.7826C25.4585 12.7826 25.7312 12.5099 25.7312 12.1739C25.7312 11.6894 25.5389 11.225 25.1962 10.8829C24.8541 10.5402 24.3897 10.3478 23.9051 10.3478H23.0079C22.7523 9.29052 22.3341 8.29591 21.7814 7.39261L22.4175 6.75713C22.7602 6.41444 22.9525 5.95 22.9525 5.46548C22.9525 4.98157 22.7602 4.51652 22.4175 4.17444L21.5568 3.31374C21.2147 2.97104 20.7497 2.77869 20.2658 2.77869C19.7812 2.77869 19.3168 2.97104 18.9741 3.31374L18.3386 3.94922C17.4353 3.39713 16.4407 2.97896 15.3834 2.7233V1.82609C15.3834 1.34157 15.1911 0.877131 14.8484 0.535044C14.5063 0.192349 14.0418 0 13.5573 0H12.3399C11.8554 0 11.391 0.192349 11.0489 0.535044C10.7062 0.877131 10.5138 1.34157 10.5138 1.82609V2.7233C9.45654 2.97896 8.46193 3.39713 7.55863 3.94983L6.92315 3.31374C6.58045 2.97104 6.11602 2.77869 5.6315 2.77869C5.14758 2.77869 4.68254 2.97104 4.34045 3.31374L3.47976 4.17444C3.13706 4.51652 2.94471 4.98157 2.94471 5.46548C2.94471 5.95 3.13706 6.41444 3.47976 6.75713L4.11524 7.39261C3.56315 8.29591 3.14497 9.29052 2.88932 10.3478H1.9921C1.50758 10.3478 1.04314 10.5402 0.701058 10.8829C0.358362 11.225 0.166016 11.6894 0.166016 12.1739V13.3913C0.166016 13.8758 0.358362 14.3403 0.701058 14.6824C1.04314 15.025 1.50758 15.2174 1.9921 15.2174H2.88932C3.14497 16.2747 3.56315 17.2693 4.11584 18.1726L3.47976 18.8081C3.13706 19.1508 2.94471 19.6152 2.94471 20.0997C2.94471 20.5837 3.13706 21.0487 3.47976 21.3908L4.34045 22.2515C4.68254 22.5942 5.14758 22.7865 5.6315 22.7865C6.11602 22.7865 6.58045 22.5942 6.92315 22.2515L7.55863 21.616C8.46193 22.1681 9.45654 22.5863 10.5138 22.8419V23.7391C10.5138 24.2237 10.7062 24.6881 11.0489 25.0302C11.391 25.3729 11.8554 25.5652 12.3399 25.5652C12.6759 25.5652 12.9486 25.2925 12.9486 24.9565C12.9486 24.6205 12.6759 24.3478 12.3399 24.3478Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    <Box
                        sx={{
                            position: 'absolute',
                            right: '0px',
                            top: '100%',
                            mr: 0,
                            mt: -2,
                            display: 'flex', 
                            alignItems: 'center',
                            flexDirection: 'column',
                            flex: 1,
                            zIndex: 99999,
                            borderRadius: '6px',
                            overflow: 'hidden',
                            height: openSettings ? 'auto' : '0px',
                            flexWrap: 'nowrap',
                            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.4)'
                        }} 
                        ref={settingsRef}
                    >
                        <Paper onClick={() => handleSignOut()} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#fcfcfc' },  }}>
                            <LogoutIcon sx={{ pl: 1.5 }} />
                            <Typography noWrap sx={{ pl: 1, pr: 6, pb: 1.5, pt: 1.8, alignSelf: 'flex-start' }}>Sign Out</Typography>
                        </Paper>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}

const memoizedHeader = memo(Header)
export default memoizedHeader