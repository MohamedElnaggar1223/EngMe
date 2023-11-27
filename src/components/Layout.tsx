import { createContext, useEffect, useState } from 'react'
import Header from './studentInterface/header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from './studentInterface/authentication/auth/Auth'

//@ts-expect-error context
export const PageContext = createContext()

export default function Layout() 
{
  const [page, setPage] = useState('profile')
  const { user } = useAuth()

  const navigate = useNavigate()

  // useEffect(() => {
  //   user ?
  //   page === 'profile' ? navigate('/profile') : navigate('/programs') :
  //   navigate('/login')
  // }, [page, navigate, user])

  return (
    <PageContext.Provider value={{page, setPage}} >
        { user ? <Header /> : <></> }
        <Outlet />
    </PageContext.Provider>
  )
}
