import { Stack, Avatar, Typography, Box, SvgIcon } from "@mui/material";
import avatar from '../../../assets/Ellipse 3.png'
import { ChatContext } from "./Chats";
import { useContext, useEffect } from "react";
import { DocumentData, DocumentReference, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
// import UserProps from "../../../interfaces/UserProps";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getLastMessage } from "../../helpers/getLastMessage";

interface Props{
    id: string,
    search: boolean,
    searchFriends: string
}

export default function ChatCard({ id, search, searchFriends }: Props) 
{
    //@ts-expect-error dad
    const { setChat } = useContext(ChatContext)
    //@ts-expect-error dad
    const { userData } = useContext(AuthContext)
    const userRef = doc(db, userData.role === 'teacher' ? 'students' : 'teachers', id)
    // const [chatUserData, setChatUserData] = useState()

    async function getInitialFriendData(userRef: DocumentReference<DocumentData, DocumentData>)
    {
        const data = await getDoc(userRef)
        return data.exists() ? {...data.data(), id: data.id} : {}
    }

    const { data: chatUserData, refetch } = useQuery({
        queryKey: ['chatUserData', id],
        queryFn: () => getInitialFriendData(userRef),
    })

    const { data: lastMessage, refetch: refetchLastMessage } = useQuery({
        queryKey: ['lastMessageChat', id],
        queryFn: () => getLastMessage(userData.id, id)
    })

    //@ts-expect-error read
    const hour = lastMessage?.createdAt.toDate().getHours() >= 12 ?  lastMessage?.createdAt.toDate().getHours() % 12 === 0 ? '12' : lastMessage?.createdAt.toDate().getHours() % 12 : lastMessage?.createdAt.toDate().getHours()
    //@ts-expect-error read
    const pmOram = lastMessage?.createdAt.toDate().getHours() >= 12 ? 'PM' : 'AM'
    //@ts-expect-error read
    const minutes = lastMessage?.createdAt.toDate().getMinutes().toString().padStart(2, '0')

    useEffect(() => {

        const unsub = onSnapshot(userRef, (querySnapshot) => {
            //@ts-expect-error errrr
            if(querySnapshot.exists)
            {
                refetch()
                refetchLastMessage()
            }
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

    if(!userData || !chatUserData) return <></>

    return (
        //@ts-expect-error name
        search && !chatUserData?.name.toLowerCase().includes(searchFriends.toLowerCase()) ?
        <></> :
        <Box
            display='flex'
            flexDirection='row'
            width='97.5%'
            justifyContent='space-between'
            px={2.5}
            py={3}
            gap={3}
            sx={{
                cursor: 'pointer',
                borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
            }}
            key={id}
            onClick={() => setChat([userData, chatUserData])}
        >
            <Stack
                direction='row'
                gap={2}
                alignItems='center'
                // mr={7}
            >
                <Avatar src={avatar ?? ''} sx={{ width: '70px', height: '70px' }} />
                <Stack
                    direction='column'
                    justifyContent='center'
                    gap={1}
                >
                    {/*//@ts-expect-error erraa*/}
                    <Typography noWrap sx={{ color: '#000' }} fontFamily='Inter' fontSize={14} fontWeight={600}>{chatUserData?.name}</Typography>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        gap={1}
                    >
                        {/*//@ts-expect-error message */}
                        <Typography noWrap fontFamily='Inter' fontSize={12} fontWeight={700}>{lastMessage?.message.slice(0, 30)}{lastMessage?.message.length > 30 ? '...' : ''}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                alignItems='center'
                justifyContent='center'
            >
                {
                    //@ts-expect-error read
                    lastMessage?.receiver === userData.id && lastMessage?.read === false &&
                    <SvgIcon sx={{ marginTop: 1, fontSize: 10 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <circle cx="6.5" cy="6.5" r="6.5" fill="#226E9F"/>
                        </svg>
                    </SvgIcon>
                }
                <Typography sx={{ marginTop: 'auto' }} fontSize={12} fontWeight={500} fontFamily='Inter'>{hour}{!isNaN(hour) && ':'}{minutes}{!isNaN(hour) && pmOram}</Typography>
            </Stack>
        </Box>
    )
}
