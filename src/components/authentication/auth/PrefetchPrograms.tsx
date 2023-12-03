import { collection, getDocs } from 'firebase/firestore'
import { Outlet } from 'react-router-dom'
import { db } from '../../../firebase/firebaseConfig'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function PrefetchPrograms() 
{
    const queryClient = useQueryClient()

    const prefetchPrograms = async () => {
        const programsRef = collection(db, 'programs')

        const programsData = await getDocs(programsRef)

        const programsArray = programsData.docs.map(doc => ({...doc.data(), id: doc.id}))

        return programsArray
    }

    useEffect(() => {
        const prefetch = async () => {
            await queryClient.prefetchQuery({
                queryKey: ['programs'],
                queryFn: () => prefetchPrograms(),
            })
        }

        prefetch()
    }, [])

    return <Outlet />
}
