import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useQuery } from '@tanstack/react-query'

//@ts-expect-error context
export const AuthContext = createContext()

//@ts-expect-error children
export default function AuthProvider({ children }) 
{   
    const [user, setUser] = useState<User | null>(null)
    const { data: userData, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(user?.uid ?? '')
    })

    useEffect(() => {
        refetch()
    }, [user, refetch])

    // const []
    async function getUserData(uid: string)
    {
        try
        {
            const userRef = doc(db, 'students', uid ?? '')
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
        catch(e)
        {
            console.error(e)
            return null
        }
    }


    useLayoutEffect(() => {
        const listen = onAuthStateChanged(auth, async (authUser) => {
            if(authUser)
            {
                setUser(authUser)
            }
            else
            {
                setUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    console.log(userData)

    return (
        <AuthContext.Provider
            value={{ user, userData }}
        >
            { children }
        </AuthContext.Provider>
    )
}
