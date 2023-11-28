import { Box } from "@mui/material";
import { createContext, useState } from "react";
import ChatsHome from "./ChatsHome";

//@ts-expect-error context
export const ChatContext = createContext()

export default function Chats() 
{
    const [chatDisplayed, setChatDisplayed] = useState(true)
    const [chat, setChat] = useState()

    return (
        <ChatContext.Provider value={{ chat, setChat, setChatDisplayed, chatDisplayed }}>
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
                    chat && chatDisplayed ?
                    <></> :
                    <ChatsHome />
                }
            </Box>
        </ChatContext.Provider>
    )
}
