import { useContext, useEffect } from 'react'
import { PageContext } from '../Layout'
import { Outlet, useNavigate } from 'react-router-dom'

export default function HomeLayout() 
{
    //@ts-expect-error context
    const { page } = useContext(PageContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        page === 'profile' ? navigate('/profile') : navigate('/programs')
    }, [page, navigate])

    return (
        <Outlet />
    )
}
