// import { createContext } from 'react'
import Header from './studentInterface/header/Header'
import { Outlet } from 'react-router-dom'
// import useAuth from './authentication/auth/AuthProvider'
import Chats from './studentInterface/chat/Chats'

// export const PageContext = createContext()

export default function Layout() 
{
  // const [page, setPage] = useState('profile')
  // const { user } = useAuth()

  // const navigate = useNavigate()

  // function handleSignUp()
  // {
  //   navigate('/signup')
  //   setPage('signup')
  // }

  // useLayoutEffect(() => {
  //   user ?
  //   page === 'exambank' ? 
  //   navigate('/exambank') : 
  //   page === 'exam' ? 
  //   navigate('/exam') : 
  //   page === 'programs' ? 
  //   navigate('/programs') : 
  //   page === 'quiz' ? 
  //   navigate('/quiz') : 
  //   page === 'assessment' ?
  //   navigate('/assessment') :
  //   page === 'knowledgebank' ? 
  //   navigate('/knowledgebank') :
  //   navigate('/profile') :
  //   handleSignUp()
  //   //eslint-disable-next-line
  // }, [page, navigate, user])

  return (
    <>
        <Header />
          <Outlet />
        <Chats />
    </>
  )
}
