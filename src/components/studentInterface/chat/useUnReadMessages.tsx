import { onSnapshot, collection, query, where } from "firebase/firestore"
import { useEffect, useContext, useState } from "react"
import { db } from "../../../firebase/firebaseConfig"
// import { PageContext } from "../../Layout"
import { UserProps } from "./Chats"
import { AuthContext } from "../../authentication/auth/AuthProvider"

export default function useUnReadMessages()
{
    //@ts-expect-error context
    const { user } = useContext(AuthContext)
    const [unReadMessages, setUnReadMessages] = useState(0)
    const [userData, setUserData] = useState<UserProps>()

    const usersRef = collection(db, 'users')
    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        
        const queryFriends = query(usersRef, where('email', '==', user?.email))

        const unsub = onSnapshot(queryFriends, (querySnapshot) => {
            //@ts-expect-error errrr
            const users = []
            querySnapshot.forEach((doc) => {
                users.push({...doc.data(), id: doc.id})
            })
            //@ts-expect-error errrr
            setUserData({...users[0]})
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [user])

    useEffect(() => {
        const queryMessages = query(messagesRef, where('receiver', '==', userData?.id ?? ''))

        const unsub = onSnapshot(queryMessages, (querySnapshot) => {
            const messagesData = []
            querySnapshot.forEach((doc) => {
                !doc.data().read &&
                messagesData.push({...doc.data(), id: doc.id})
            })
            setUnReadMessages(messagesData.length)
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [userData])

    return { unReadMessages }
}