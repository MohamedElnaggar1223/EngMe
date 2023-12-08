import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Suspense, lazy, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setTeacherProfileViews } from '../../helpers/setTeacherProfileViews'
const TeacherCard = lazy(() => import('./TeacherCard'))
const TeacherCredentials = lazy(() => import('./TeacherCredentials'))
const TeacherPrograms = lazy(() => import('./TeacherPrograms'))
const TeacherFeedbacks = lazy(() => import('./TeacherFeedbacks'))
const TeacherTestimonials = lazy(() => import('./TeacherTestimonials'))

export default function TeacherProfile() 
{
    const { id } = useParams()

    const { mutate } = useMutation({
        //@ts-expect-error teacherId
        mutationFn: () => setTeacherProfileViews(id)
    })

    useEffect(() => {
        mutate()
    }, [mutate])

    return (
        <Box
            gap={15}
            display='flex'
            flexDirection='column'
        >
            <Suspense>
                <TeacherCard />
            </Suspense>

            <Suspense>
                <TeacherCredentials />
            </Suspense>

            <Suspense>
                <TeacherPrograms />
            </Suspense>

            <Suspense>
                <TeacherFeedbacks />
            </Suspense>
            
            <Suspense>
                <TeacherTestimonials />
            </Suspense>
        </Box>
    )
}
