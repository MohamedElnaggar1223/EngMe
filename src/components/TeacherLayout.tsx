// import { createContext } from 'react'
import Header from './teacherInterface/header/Header'
import { Outlet } from 'react-router-dom'
// import useAuth from './authentication/auth/AuthProvider'
import Chats from './studentInterface/chat/Chats'
import { useContext } from 'react'
import { AuthContext } from './authentication/auth/AuthProvider'

// export const PageContext = createContext()

export default function TeacherLayout() 
{
  // const [page, setPage] = useState('profile')
  // const { user } = useAuth()
  //@ts-expect-error context
  const { user } = useContext(AuthContext)

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
        { user && <Header /> }
          <Outlet />
        { user && <Chats /> }
    </>
  )
}
