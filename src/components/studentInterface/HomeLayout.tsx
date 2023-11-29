import { Outlet } from 'react-router-dom'

export default function HomeLayout() 
{
    // const { page } = useContext(PageContext)
    // const navigate = useNavigate()
    
    // useEffect(() => {
    //     page === 'profile' ? 
    //     navigate('/profile') : 
    //     page === 'exam' ? 
    //     navigate('/exam') : 
    //     page === 'programs' ? 
    //     navigate('/programs') : 
    //     page === 'quiz' ? 
    //     navigate('/quiz') : 
    //     page === 'assessment' ?
    //     navigate('/assessment') :
    //     page === 'knowledgebank' ?
    //     navigate('/knowledgebank') :
    //     navigate('/exambank')
    // }, [page, navigate])

    return (
        <Outlet />
    )
}
