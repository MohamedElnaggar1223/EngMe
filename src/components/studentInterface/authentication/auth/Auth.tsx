import { useEffect, useState } from 'react'
import { auth } from '../../../../firebase/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'

export default function useAuth() 
{
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
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

    return { user }
}
