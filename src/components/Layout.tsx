import { createContext, useEffect, useState } from 'react'
import Header from './studentInterface/header/Header'
import { Outlet, useNavigate } from 'react-router-dom'

//@ts-expect-error context
export const PageContext = createContext()

export default function Layout() 
{
  const [page, setPage] = useState('profile')

  const navigate = useNavigate()

  useEffect(() => {
    page === 'profile' ? navigate('/profile') : navigate('/programs')
  }, [page, navigate])

  return (
    <PageContext.Provider value={{page, setPage}} >
        <Header />
        <Outlet />
    </PageContext.Provider>
  )
}
