import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getUserByNumber = async(number: string) => {
    const usersRef = collection(db, 'users')
    const queryUser = query(usersRef, where('number', '==', number))

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