import { useContext, useEffect } from 'react'
import { AuthContext } from "./AuthProvider"
import { useLocation, useNavigate } from 'react-router-dom'
import Signup from '../signup/Signup'
import Login from '../login/Login'

//@ts-expect-error children
export default function PrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user, userData } = useContext(AuthContext)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        console.log(userData)
        if(!user || !userData) {
            pathname === '/signup' ? navigate('/signup') : navigate(`/login`)
        }
        else pathname === '/signup' || pathname === '/login' ? navigate('/') : navigate(`${pathname}`)
    }, [user, userData, navigate, pathname])

    if(!user || !userData){
        if(pathname === '/signup') 
        return <Signup />
        else return <Login />
    }
    else
    return (
        <>
            {userData?.role === 'student' ? children.student : children.teacher}
        </>
    )
}
