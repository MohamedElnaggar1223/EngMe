import { createContext, useLayoutEffect, useState } from 'react'
import { auth } from '../../../firebase/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'

//@ts-expect-error context
export const AuthContext = createContext()

//@ts-expect-error children
export default function AuthProvider({ children }) 
{   
    const [user, setUser] = useState<User | null>(null)

    useLayoutEffect(() => {
        const listen = onAuthStateChanged(auth, (authUser) => {
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

    return (
        <AuthContext.Provider
            value={{ user }}
        >
            { children }
        </AuthContext.Provider>
    )
}
