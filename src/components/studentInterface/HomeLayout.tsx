import { useContext, useEffect } from 'react'
import { PageContext } from '../Layout'
import { Outlet, useNavigate } from 'react-router-dom'

export default function HomeLayout() 
{
    //@ts-expect-error context
    const { page } = useContext(PageContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        page === 'profile' ? 
        navigate('/profile') : 
        page === 'exam' ? 
        navigate('/exam') : 
        page === 'programs' ? 
        navigate('/programs') : 
        page === 'quiz' ? 
        navigate('/quiz') : 
        navigate('/assessment')
    }, [page, navigate])

    return (
        <Outlet />
    )
}
