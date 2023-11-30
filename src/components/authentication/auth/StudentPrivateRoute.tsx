import { useContext } from 'react'
import { AuthContext } from "./AuthProvider"
import { useNavigate } from 'react-router-dom'

//@ts-expect-error children
export default function StudentPrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    if(!user) navigate('/signup')

    return (
        <>
            {children}
        </>
    )
}
