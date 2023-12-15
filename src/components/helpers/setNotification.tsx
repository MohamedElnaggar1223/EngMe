import { collection, Timestamp, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setNotification = async(notification: string) => {
    const notificationRef = collection(db, 'notifications')

    const newNotification = {
        notification,
        createdAt: Timestamp.now()
    }

    await addDoc(notificationRef, newNotification)
}