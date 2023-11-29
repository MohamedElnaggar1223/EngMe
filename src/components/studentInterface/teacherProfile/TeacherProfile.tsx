import { Box } from '@mui/material'
import { Suspense, lazy } from 'react'
const TeacherCard = lazy(() => import('./TeacherCard'))
const TeacherCredentials = lazy(() => import('./TeacherCredentials'))
const TeacherPrograms = lazy(() => import('./TeacherPrograms'))
const TeacherFeedbacks = lazy(() => import('./TeacherFeedbacks'))
const TeacherTestimonials = lazy(() => import('./TeacherTestimonials'))

export default function TeacherProfile() 
{
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
