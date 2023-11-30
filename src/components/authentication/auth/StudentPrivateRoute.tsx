import { useContext } from 'react'
import { AuthContext } from "./AuthProvider"
import { useNavigate } from 'react-router-dom'
import Signup from '../signup/Signup'

//@ts-expect-error children
export default function StudentPrivateRoute({ children }) 
{
    //@ts-expect-error context
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    console.log(user)

    if(!user) {
        navigate('/signup')
        return <Signup />
    }
    else
    return (
        <>
            {children}
        </>
    )
}
