import { createContext, useLayoutEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { User, onAuthStateChanged } from 'firebase/auth'
import UserProps from '../../../interfaces/UserProps'

//@ts-expect-error context
export const AuthContext = createContext()

//@ts-expect-error children
export default function AuthProvider({ children }) 
{   
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserProps | null>()

    // const []
    async function getUserData(uid: string)
    {
        const userRef = doc(db, 'students', uid)
        const userSnapshot = await getDoc(userRef)

        if(userSnapshot.exists())
        {
            const userData = {...userSnapshot.data(), id: userSnapshot.id}
            return userData
        }
        else
        {
            return null
        }
    }


    useLayoutEffect(() => {
        const listen = onAuthStateChanged(auth, async (authUser) => {
            if(authUser)
            {
                setUser(authUser)
                const userDataFetched = await getUserData(authUser.uid)
                setUserData(userDataFetched as UserProps)
            }
            else
            {
                setUser(null)
                setUserData(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{ user, userData }}
        >
            { children }
        </AuthContext.Provider>
    )
}
