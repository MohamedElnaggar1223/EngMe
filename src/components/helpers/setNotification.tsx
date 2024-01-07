import { collection, Timestamp, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setNotification = async(notification: string, to: string[], followers: string[], path: string) => {
    const notificationRef = collection(db, 'notifications')

    const newNotification = {
        notification,
        createdAt: Timestamp.now(),
        to,
        followers,
        path
    }

    await addDoc(notificationRef, newNotification)
}