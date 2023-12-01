import { lazy, useContext } from 'react'
import { Box, Typography, SvgIcon, Stack } from "@mui/material";
const ChatCard = lazy(() => import("./ChatCard"))
import { ChatContext } from "./Chats";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { db } from "../../../firebase/firebaseConfig";
// import { PageContext } from '../../Layout';
import useUnReadMessages from './useUnReadMessages';
import { AuthContext } from '../../authentication/auth/AuthProvider';


export default function ChatsHome() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const { unReadMessages } = useUnReadMessages()
    //@ts-expect-error context
    const { chatDisplayed, setChatDisplayed } = useContext(ChatContext)
    // const [userFriends, setUserFriends] = useState([])
    // const usersRef = collection(db, 'users')

    // useEffect(() => {
    //     // const queryFriends = query(usersRef, 
    //     //         where('email', '==', user?.email)
    //     //     )
    //     // onSnapshot(queryFriends, (snapshot) => {
    //     //     //@ts-expect-error data
    //     //     const userData = []
    //     //     snapshot.forEach((doc) => {
    //     //         userData.push({...doc.data(), id: doc.id})
    //     //     })
    //     //     //@ts-expect-error data
    //     //     userData[0].friends.map(async (friend) => {
    //     //         const friendDoc = doc(db, 'users', friend)
    //     //         const friendData = await getDoc(friendDoc)
    //     //         console.log(friendData)
    //     //         const oldArray = [...users]
    //     //         oldArray.push(friendData)
    //     //         setUsers(oldArray)
    //     //     })
    //     // })
    //     // async function getUserFriends()
    //     // {
    //     //     const queryFriends = query(usersRef, where('email', '==', user.email))
    //     //     const userDoc = await getDocs(queryFriends)
    //     //     //@ts-expect-error wdwd
    //     //     const friendsArray = []
    //     //     const getFriendsArray = async (friendsArray: []) =>
    //     //     { 
    //     //         userDoc.forEach(async (docu) => {
    //     //             const userFriendsIds = docu.data().friends
    //     //             console.log(userFriendsIds)
    //     //             //@ts-expect-error wdwd
    //     //             userFriendsIds.forEach(async (friend) => {
    //     //                 const friendDoc = doc(db, 'users', friend.id)
    //     //                 const friendData = await getDoc(friendDoc)
    //     //                 console.log(friendData.data())
    //     //                 //@ts-expect-error wdwd
    //     //                 friendsArray.push({...friendData.data(), id: friendData.id})
    //     //             })
                    
    //     //         })
    //     //     }
    //     //     //@ts-expect-error wdwd
    //     //     await getFriendsArray(friendsArray)
    //     //     //@ts-expect-error wdwd
    //     //     setUsers(friendsArray)
    //     // }
    
    //     // getUserFriends()
        
    //     const queryFriends = query(usersRef, where('email', '==', user?.email ?? ''))

    //     const unsub = onSnapshot(queryFriends, (querySnapshot) => {
    //         //@ts-expect-error errrr
    //         const users = []
    //         querySnapshot.forEach((doc) => {
    //             users.push({...doc.data(), id: doc.id})
    //         })
    //         //@ts-expect-error errrr
    //         setUserFriends(users[0].friends)
    //         //@ts-expect-error errrr
    //       ({...users[0]})
    //     })

    //     return () => {
    //         unsub()
    //     }
    //     //eslint-disable-next-line
    // }, [user])

    // console.log(userChat)

    console.log(userData?.friends ?? [])

    const displayedChats = userData?.friends?.map((user: string) => 
        <ChatCard id={user} />
    ) ?? []

    // console.log(displayedChats.length)

    return (
        <>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexDirection='row'
                py={3}
                px={1}
                bgcolor={chatDisplayed ? '#226E9F' : 'transparent'}
            >
                {
                    chatDisplayed &&
                    <>
                        <Typography sx={{ color:'#226E9F' }}>tt</Typography>
                        <Typography sx={{ color:'#fff' }} fontWeight={600} fontFamily='Inter'>Messages</Typography>
                        <SvgIcon sx={{ padding: 1, background: '#D0EBFC', color:'#226E9F', borderRadius: '8px', fontSize: 18 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                <path d="M7.16079 3.36975C6.65533 3.36975 6.31836 3.70672 6.31836 4.21217C6.31836 4.71763 6.65533 5.0546 7.16079 5.0546C8.34019 5.0546 9.26686 5.98127 9.26686 7.16066C9.26686 7.66611 9.60383 8.00308 10.1093 8.00308C10.6147 8.00308 10.9517 7.66611 10.9517 7.16066C10.9517 5.0546 9.26686 3.36975 7.16079 3.36975Z" fill="#226E9F"/>
                                <path d="M16.2589 14.3212L12.7207 11.7939C13.7316 10.5303 14.4055 8.92969 14.4055 7.24484C14.3213 3.20121 11.1201 0 7.16065 0C3.20123 0 0 3.20121 0 7.1606C0 11.12 3.20123 14.3212 7.16065 14.3212C8.92975 14.3212 10.4461 13.7315 11.7098 12.6364L14.237 16.1745C14.7425 16.9327 15.7534 17.017 16.3431 16.343C16.9328 15.6691 16.9328 14.8267 16.2589 14.3212ZM7.16065 12.6364C4.1279 12.6364 1.68486 10.1933 1.68486 7.1606C1.68486 4.12788 4.1279 1.68485 7.16065 1.68485C10.1934 1.68485 12.6364 4.12788 12.6364 7.1606C12.6364 10.1933 10.1934 12.6364 7.16065 12.6364Z" fill="url(#paint0_linear_2_5800)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_2_5800" x1="1.20001" y1="1.8" x2="17.7" y2="18.3001" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#226E9F"/>
                                    <stop offset="0.94445" stop-color="#6A9DBC"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </SvgIcon>
                    </>
                }
            </Box>
            <Stack
                bgcolor={chatDisplayed ? 'rgba(208, 235, 252, 1)' : 'transparent'}
                alignItems='center'
                justifyContent='flex-start'
                height='445px'
                width='460px'
                sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
                px={1}
            >
                {
                    chatDisplayed &&
                    displayedChats
                }
            </Stack>
            <Box
                height='61px'
                bgcolor={chatDisplayed ? '#226E9F' : 'transparent'}
                // flex={1}
                p={0}
                m={0}
                position='relative'
            >
                <SvgIcon
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '87%',
                        fontSize: 50,
                        zIndex: 99999999,
                        cursor: 'pointer'
                    }}
                    //@ts-expect-error context
                    onClick={() => setChatDisplayed(prev => !prev)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="38" viewBox="0 0 41 38" fill="none">
                        <rect x="0.5" y="0.5" width="40" height="37" rx="4.5" fill="white" stroke="url(#paint0_linear_2_5856)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.82183 15.9618L13.1996 19.037L27.7157 9.19398L8.82183 15.9618ZM18.8681 24.4418L18.0316 27.4855L20.1675 25.3547L18.8681 24.4418ZM16.8317 27.6048L13.8904 19.9767L27.2708 10.9048L18.1031 23.1355C18.0581 23.1953 18.0245 23.2639 18.0044 23.3372L16.8309 27.6051L16.8317 27.6048ZM21.1234 26.026L17.3422 29.7987C17.2789 29.8746 17.1983 29.9322 17.108 29.9659C17.0176 29.9997 16.9206 30.0086 16.8262 29.9916C16.7317 29.9747 16.6429 29.9326 16.5682 29.8693C16.4935 29.806 16.4354 29.7235 16.3994 29.6299L12.7385 20.1359L7.26103 16.2884C7.17151 16.2286 7.09986 16.1432 7.05437 16.0422C7.00888 15.9413 6.9914 15.8288 7.00395 15.7178C7.01651 15.6068 7.05858 15.5018 7.1253 15.4149C7.19203 15.3281 7.2807 15.2629 7.38105 15.2269L30.2598 7.03136C30.3546 6.99742 30.4563 6.99089 30.5543 7.01245C30.6523 7.03401 30.743 7.08288 30.817 7.15397C30.891 7.22506 30.9456 7.31577 30.9751 7.41667C31.0046 7.51756 31.0079 7.62495 30.9848 7.72767L26.2304 28.6131C26.2173 28.6943 26.1883 28.7716 26.145 28.8402C26.1045 28.9052 26.0521 28.9611 25.991 29.0047C25.9299 29.0483 25.8612 29.0787 25.7889 29.0942C25.7166 29.1098 25.6422 29.1101 25.5697 29.0952C25.4973 29.0802 25.4284 29.0504 25.367 29.0073L21.1234 26.0251V26.026ZM29.2895 10.117L25.3211 27.5511L19.3596 23.3643L29.2895 10.117Z" fill="url(#paint1_linear_2_5856)"/>
                        <defs>
                            <linearGradient id="paint0_linear_2_5856" x1="20.5" y1="0" x2="20.5" y2="38" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#226E9F"/>
                            <stop offset="1" stop-color="#6A9DBC"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_2_5856" x1="19" y1="7" x2="19" y2="30" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#226E9F"/>
                            <stop offset="1" stop-color="#6A9DBC"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </SvgIcon>
                <SvgIcon sx={{ fontSize: 22, position: 'absolute', top: '-0.01%', right: '-0.1%', zIndex: 9999999999}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="14" fill="#226E9F"/>
                    </svg>
                </SvgIcon>
                <Typography sx={{ color: '#fff', fontSize: 14, position: 'absolute', top: '2%', right: '-0.01%', left: '97%', bottom: '100%', zIndex: 99999999999}}>{unReadMessages}</Typography>
            </Box>
        </>
    )
}
