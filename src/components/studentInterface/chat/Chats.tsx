import { Box } from "@mui/material";
import { Suspense, createContext, lazy, useState } from "react";
import ChatRoom from "./ChatRoom";
import useAuth from "../authentication/auth/Auth";
const ChatsHome = lazy(() => import("./ChatsHome"))

export interface UserProps{
    friends?: [],
    id: string,
    name: string,
    email: string
}

//@ts-expect-error context
export const ChatContext = createContext()

export default function Chats() 
{
    const [chatDisplayed, setChatDisplayed] = useState(false)
    const [chat, setChat] = useState<UserProps[]>()
    const [chatUserData, setChatUserData] = useState()
    const { user } = useAuth()

    console.log(user?.email)

    return (
        <ChatContext.Provider value={{ chat, setChat, setChatDisplayed, chatDisplayed, user, chatUserData, setChatUserData }}>
            <Box
                display='flex'
                flexDirection='column'
                sx={{
                    position: 'fixed',
                    bottom: '-0.1%',
                    right: '-0.01%',
                    fontSize: 60,
                    zIndex: 99999998
                }}
                width='fit-content'
            >
                {
                    chat && chatDisplayed 
                    ?
                        <Suspense>
                            {/*//@ts-expect-error context */}
                            <ChatRoom user={chat[0]} friend={chat[1]} />
                        </Suspense>
                    :
                        <Suspense fallback={<></>}>
                            <ChatsHome />
                        </Suspense>
                }
            </Box>
        </ChatContext.Provider>
    )
}
