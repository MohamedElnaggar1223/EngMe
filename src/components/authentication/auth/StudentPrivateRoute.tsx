import { useContext, useEffect } from 'react'
import { AuthContext } from "./AuthProvider"
import { useLocation, useNavigate } from 'react-router-dom'
import Signup from '../signup/Signup'

//@ts-expect-error children
export default function StudentPrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        if(!user) navigate('/signup')
        else pathname === '/signup' ? navigate('/') : navigate(`${pathname}`)
    }, [user, navigate, pathname])

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
