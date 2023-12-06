import { useContext, useEffect } from 'react'
import { AuthContext } from "./AuthProvider"
import { useLocation, useNavigate } from 'react-router-dom'
import Signup from '../signup/Signup'
import Login from '../login/Login'

//@ts-expect-error children
export default function StudentPrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.log(user)
        if(!user) {
            pathname === '/signup' ? navigate('/signup') : navigate(`/login`)
        }
        else pathname === '/signup' || pathname === '/login' ? navigate('/') : navigate(`${pathname}`)
    }, [user, navigate, pathname])

    if(!user) {
        if(pathname === '/signup') 
        return <Signup />
        else return <Login />
    }
    else
    return (
        <>
            {children}
        </>
    )
}
