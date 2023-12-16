import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getUserByEmail = async(email: string) => {
    const usersRef = collection(db, 'users')
    const queryUser = query(usersRef, where('userId', '==', email))

    const userDocs = await getDocs(queryUser)
    
    if(userDocs.docs.length > 0)
    {
        return userDocs.docs[0]
    }
    else
    {
        return null
    }
}