import { collection, getDocs, limit, query } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getNotifications = async() => {
    const notificationsRef = collection(db, 'notifications')

    const queryNotifications = query(notificationsRef, limit(5));

    const notificationsDocs = await getDocs(queryNotifications)

    const notificationsData = notificationsDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

    //@ts-expect-error notif
    const sortedArray = notificationsData.sort((a, b) => b.createdAt - a.createdAt);
    
    return sortedArray
}