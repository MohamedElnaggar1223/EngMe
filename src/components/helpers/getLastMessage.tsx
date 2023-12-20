import { collection, query, or, and, where, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getLastMessage = async (userId: string, friendId: string) => {
    const messagesRef = collection(db, 'messages')
    const queryMessages = query(messagesRef, or(and(where('sender', '==', userId), where('receiver', '==', friendId)), and(where('receiver', '==', userId), where('sender', '==', friendId))), orderBy('createdAt', 'desc'), limit(1))

    const messagesDoc = await getDocs(queryMessages)

    const messageData = {...messagesDoc.docs[0].data(), id: messagesDoc.docs[0].id}

    return messageData
}