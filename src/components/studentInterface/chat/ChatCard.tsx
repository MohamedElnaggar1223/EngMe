import { Stack, Avatar, Typography, Box, SvgIcon } from "@mui/material";
import avatar from '../../../assets/Ellipse 3.png'
import { ChatContext } from "./Chats";
import { useContext, useEffect } from "react";
import { DocumentData, DocumentReference, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
// import UserProps from "../../../interfaces/UserProps";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

interface Props{
    id: string
}

export default function ChatCard({ id }: Props) 
{
    //@ts-expect-error dad
    const { setChat } = useContext(ChatContext)
    //@ts-expect-error dad
    const { userData } = useContext(AuthContext)
    const userRef = doc(db, 'students', id)
    // const [chatUserData, setChatUserData] = useState()

    async function getInitialFriendData(userRef: DocumentReference<DocumentData, DocumentData>)
    {
        console.log('hi')
        const data = await getDoc(userRef)
        return data.exists() ? {...data.data(), id: data.id} : {}
    }

    const { data: chatUserData, refetch } = useQuery({
        queryKey: ['chatUserData', id],
        queryFn: () => getInitialFriendData(userRef),
    })

    useEffect(() => {

        const unsub = onSnapshot(userRef, (querySnapshot) => {
            //@ts-expect-error errrr
            if(querySnapshot.exists)
            {
                refetch()
            }
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

    if(!userData || !chatUserData) return <></>

    return (
        <Box
            display='flex'
            flexDirection='row'
            px={1}
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
                    <Typography noWrap sx={{ color: '#000' }} fontFamily='Inter' fontSize={14} fontWeight={600}>{chatUserData?.name}: {chatUserData?.email.slice(0, 5)}... </Typography>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        gap={1}
                    >
                        <Typography noWrap fontFamily='Inter' fontSize={12} fontWeight={700}>You have to submit the paper first thing in the...</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                alignItems='center'
                justifyContent='center'
            >
                <SvgIcon sx={{ marginTop: 1, fontSize: 10 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="6.5" fill="#226E9F"/>
                    </svg>
                </SvgIcon>
                <Typography sx={{ marginTop: 'auto' }} fontSize={12} fontWeight={500} fontFamily='Inter'>3:45PM</Typography>
            </Stack>
        </Box>
    )
}