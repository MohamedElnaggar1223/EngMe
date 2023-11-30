import { useContext, useEffect } from 'react'
import { AuthContext } from "./AuthProvider"
import { useNavigate } from 'react-router-dom'
import Signup from '../signup/Signup'

//@ts-expect-error children
export default function StudentPrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(!user) navigate('/signup')
        else navigate('/')
    }, [user, navigate])

    if(!user) {
        return <Signup />
    }
    else
    return (
        <>
            {children}
        </>
    )
}
