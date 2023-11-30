import { Box } from "@mui/material";
import { Suspense, createContext, lazy, useContext, useState } from "react";
import ChatRoom from "./ChatRoom";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import UserProps from "../../../interfaces/UserProps";
const ChatsHome = lazy(() => import("./ChatsHome"))

//@ts-expect-error context
export const ChatContext = createContext()

export default function Chats() 
{
    const [chatDisplayed, setChatDisplayed] = useState(false)
    const [chat, setChat] = useState<UserProps[]>()
    const [chatUserData, setChatUserData] = useState()
    //@ts-expect-error context
    const { user } = useContext(AuthContext)

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
