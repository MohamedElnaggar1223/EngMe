import { ReactNode, useContext, useEffect, useState } from 'react'
import { AuthContext } from "./AuthProvider"
import { useLocation, useNavigate } from 'react-router-dom'
import Login from '../login/Login'
import { Dialog, CircularProgress } from '@mui/material'

//@ts-expect-error children
export default function PrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user, userData, userIsSuccess } = useContext(AuthContext)
    const { pathname } = useLocation()

    const [page, setPage] = useState<ReactNode>()

    const navigate = useNavigate()

    // useEffect(() => {
    //     if(!user || !userData) {
    //         pathname === '/signup' ? navigate('/signup') : navigate(`/login`)
    //     }
    //     else if(userData?.role === 'teacher' && userData?.firstLoginLink) window.location.href = userData?.firstLoginLink
    //     else pathname === '/signup' || pathname === '/login' ? navigate('/') : navigate(`${pathname}`)
    // }, [user, userData, navigate, pathname])

    // if(!user || !userData){
    //     if(pathname === '/signup') 
    //     return <Signup />
    //     else return <Login />
    // }
    // else

    // useEffect(() => {
    //     if(userData)
    //     {
    //         setPage(children[userData.role])
    //         navigate(pathname)
    //     }
    //     else
    //     {
    //         navigate('/login')
    //     } 
    // }, [user, userData, navigate, children, pathname])

    // useEffect(() => {
    //     if(user)
    //     {
    //         navigate(pathname !== '/login' ? pathname : '/')
    //         console.log(userData?.role)
    //         if(userData) setPage(children[userData?.role])
    //         else setPage(<Login />)
    //     }
    //     else
    //     {
    //         setPage(<Login />)
    //     }
    // }, [user, userData, navigate])
    
    // return page

    // if(userData)
    // {
    //     <Navigate to={ pathname !== '/login' && children[userData.role] ? pathname : '/'} />
    //     return children[userData.role]
    // }
    // // else if(pathname === '/signup' ) return <Signup />
    // else return <Login />

    useEffect(() => {
        if(userIsSuccess)
        {
            if(user && userData) {
                navigate(pathname !== '/login' ? pathname : '/')
                setPage(children[userData?.role ?? 0])
            } 
            else 
            {
                setPage(<Login />)
            }
        }
    }, [user, userData, navigate, children, pathname, userIsSuccess])
    
    return page ? page : (
        <Dialog open={!userIsSuccess} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
            <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
        </Dialog>
    )
}
