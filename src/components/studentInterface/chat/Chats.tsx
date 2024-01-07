import { Box } from "@mui/material";
import { Suspense, createContext, lazy, useContext, useEffect, useRef, useState } from "react";
import ChatRoom from "./ChatRoom";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import UserProps from "../../../interfaces/UserProps";
import { query, or, where, orderBy, onSnapshot, updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";
const ChatsHome = lazy(() => import("./ChatsHome"))

//@ts-expect-error context
export const ChatContext = createContext()

export default function Chats() 
{
    const queryClient = useQueryClient()

    const [chatDisplayed, setChatDisplayed] = useState(false)
    const [chat, setChat] = useState<UserProps[]>()
    const [chatUserData, setChatUserData] = useState()
    //@ts-expect-error context
    const { user, userData } = useContext(AuthContext)

    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        //@ts-expect-error event
        const handleClickOutside = (event) => {
            // console.log(chatRef.current)
            // console.log(event.target)

            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setChatDisplayed(false);  // Update your state as needed
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    useEffect(() => {
        const messagesRef = collection(db, 'messages')
        const queryMessages = query(messagesRef, or(where('sender', '==', userData?.id ?? ''), where('receiver', '==', userData?.id ?? '')), orderBy("createdAt", "asc"))

        const unsub = onSnapshot(queryMessages, async (querySnapshot) => {
            await queryClient.invalidateQueries({ queryKey: ['userData'] })
            const newFriendsData = querySnapshot.docs.filter(doc => !(userData?.friends.includes(doc.data().sender)))
            if(newFriendsData.length > 0 && userData?.role === 'teacher')
            {
                const newFriends = newFriendsData.map(doc => doc.data()?.sender)
                const newFriendsAdded = [...userData.friends, ...newFriends]
                const newFriendsAddedRef = doc(db, userData.role === 'student' ? 'students' : 'teachers', userData?.id)
                await updateDoc(newFriendsAddedRef, { friends: newFriendsAdded })
            }
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

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
                }}
                className='chatBox'
                width='fit-content'
                ref={chatRef}
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
