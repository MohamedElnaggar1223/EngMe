import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export async function getUserData(uid: string)
    {
        try
        {
            const userRef = doc(db, 'students', uid ?? '')
            const userSnapshot = await getDoc(userRef)
    
            if(userSnapshot.exists())
            {
                const userData = {...userSnapshot.data(), id: userSnapshot.id, role: 'student'}
                return userData
            }
            else
            {
                const userRef = doc(db, 'teachers', uid ?? '')
                const userSnapshot = await getDoc(userRef)
        
                if(userSnapshot.exists())
                {
                    const userData = {...userSnapshot.data(), id: userSnapshot.id, role: userSnapshot.data().email === import.meta.env.VITE_ADMIN_EMAIL ? 'admin' : 'teacher'}
                    return userData
                }
                else
                {
                    return null
                }
            }
        }
        catch(e)
        {
            console.error(e)
            return null
        }
    }