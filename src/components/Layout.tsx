import { createContext, useLayoutEffect, useState } from 'react'
import Header from './studentInterface/header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from './authentication/auth/Auth'
import Chats from './studentInterface/chat/Chats'

//@ts-expect-error context
export const PageContext = createContext()

export default function Layout() 
{
  const [page, setPage] = useState('profile')
  const { user } = useAuth()

  const navigate = useNavigate()

  function handleSignUp()
  {
    setPage('signup')
    navigate('/signup')
  }

  useLayoutEffect(() => {
    user ?
    page === 'profile' ? 
    navigate('/profile') : 
    page === 'exam' ? 
    navigate('/exam') : 
    page === 'programs' ? 
    navigate('/programs') : 
    page === 'quiz' ? 
    navigate('/quiz') : 
    page === 'assessment' ?
    navigate('/assessment') :
    page === 'knowledgebank' ? 
    navigate('/knowledgebank') :
    navigate('/exambank') :
    handleSignUp()
  }, [page, navigate, user])

  return (
    <PageContext.Provider value={{page, setPage, user}} >
        { user && <Header /> }
        <Outlet />
        { user && <Chats />}
    </PageContext.Provider>
  )
}
