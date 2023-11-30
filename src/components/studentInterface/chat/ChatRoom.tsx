import { lazy, useContext, useEffect, useState } from "react"
import { ChatContext } from "./Chats"
import { Box, Typography, SvgIcon, Stack, Input } from "@mui/material"
import { FieldValue, addDoc, and, collection, onSnapshot, or, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"
import useUnReadMessages from "./useUnReadMessages"
import UserProps from "../../../interfaces/UserProps"
const Message = lazy(() => import("./Message"))
const Avatar = lazy(() => import('./AvatarLazy'))

interface Props{
    user: UserProps,
    friend: UserProps
}

interface Message{
    id?: string,
    sender: string,
    receiver: string,
    message: string,
    createdAt: FieldValue,
    read: boolean
}

export default function ChatRoom({ user, friend }: Props)
{  
    //@ts-expect-error context
    const { chatDisplayed, setChatDisplayed, setChat } = useContext(ChatContext)
    const { unReadMessages } = useUnReadMessages()
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState<Message>({
        sender: user.id,
        receiver: friend.id,
        message: '',
        createdAt: serverTimestamp(),
        read: false
    })


    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messagesRef, or(and(where('sender', '==', user.id ?? ''), where('receiver', '==', friend?.id ?? '')),and(where('sender', '==', friend?.id ?? ''), where('receiver', '==', user.id ?? ''))), orderBy("createdAt", "asc"))

        const unsub = onSnapshot(queryMessages, (querySnapshot) => {
            //@ts-expect-error errrr
            const messagesData = []
            querySnapshot.forEach((doc) => {
                messagesData.push({...doc.data(), id: doc.id})
            })
            //@ts-expect-error errrr
            setMessages(messagesData)
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

    async function handleSendMessage(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        if(message.message === '') return
        await addDoc(messagesRef, {...message, createdAt: serverTimestamp(), read: false})
        setMessage(prev => ({...prev, message: ''}))
    }

    const displayedMessages = messages.map((message, index) => <Message isLast={messages.length === index + 1} isSender={message.sender === user.id} {...message} id={message.id ?? ''}></Message>)

    return (
        <>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                flexDirection='row'
                py={1}
                px={2}
                bgcolor={chatDisplayed ? '#226E9F' : 'transparent'}
            >
                {
                    chatDisplayed &&
                    <Stack
                        gap={2}
                        direction='row'
                    >
                        <SvgIcon onClick={() => setChat(null)} sx={{ marginBottom: 'auto', marginTop: 0.5, cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                                <path d="M0.177717 8.28605L6.47775 15.6361C6.71775 15.8461 7.10775 15.8461 7.31776 15.6061C7.49776 15.3961 7.52776 15.0961 7.37776 14.8561L1.91773 8.49605H19.4312C19.7612 8.49605 20.0312 8.22605 20.0312 7.89605C20.0312 7.56605 19.7612 7.29605 19.4312 7.29605H1.91773L7.37776 0.936042C7.55776 0.666042 7.49776 0.276042 7.22776 0.0960417C6.98775 -0.0539584 6.68775 -0.0239582 6.47775 0.156042L0.177717 7.50605C-0.00228447 7.71605 -0.0322846 8.04605 0.177717 8.28605Z" fill="white"/>
                            </svg>
                        </SvgIcon>
                        <Stack
                            direction='row'
                            gap={2}
                            alignItems='center'
                            // mr={7}
                        >
                            <Avatar />
                            <Stack
                                direction='column'
                                justifyContent='center'
                                gap={1.5}
                            >
                                <Typography noWrap sx={{ color: '#fff' }} fontFamily='Inter' fontSize={16} fontWeight={500}>{friend?.name}</Typography>
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    gap={1}
                                >
                                    <Typography sx={{ textDecoration: 'underline', color: '#fff' }} noWrap fontFamily='Inter' fontSize={12} fontWeight={400}>View Profile</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
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
                px={2.5}
                py={1}
                direction='column'
                gap={1.5}
            >
                {
                    chatDisplayed &&
                    displayedMessages
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
                <Box
                    px={3}
                    // py={0.4}
                    bgcolor='#fff'
                    width='88%'
                    height='80%'
                    display='flex'
                    position='absolute'
                    alignItems='center'
                    justifyContent='space-between'
                    borderRadius='10px'
                    border='2px solid #226E9F'
                    alignSelf='center'
                    top='7.8%'
                >
                    <form style={{ flex: 1, marginRight: 2, fontSize: 20 }} onSubmit={handleSendMessage}>
                        <Input 
                            sx={{ 
                                flex: 1,
                                marginRight: 2,
                                fontSize: 20
                            }}
                            disableUnderline
                            value={message.message}
                            onChange={(e) => setMessage(prev => ({...prev, message: e.target.value}))}
                        />
                    </form>
                </Box>
            </Box>
        </>
    )
}
