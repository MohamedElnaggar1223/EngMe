import { createContext, useLayoutEffect, useState } from 'react'
import Header from './studentInterface/header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from './studentInterface/authentication/auth/Auth'
import Chats from './studentInterface/chat/Chats'

//@ts-expect-error context
export const PageContext = createContext()

export default function Layout() 
{
  const [page, setPage] = useState('profile')
  const { user } = useAuth()

  const navigate = useNavigate()

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
    navigate('/assessment') : 
    navigate('/signup')
  }, [page, navigate, user])

  return (
    <PageContext.Provider value={{page, setPage, user}} >
        { user && <Header /> }
        <Outlet />
        { user && <Chats />}
    </PageContext.Provider>
  )
}
