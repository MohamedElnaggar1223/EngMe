import { Box } from '@mui/material'
import { Suspense, lazy } from 'react'
const TeacherConsultations = lazy(() => import('./TeacherConsultations'))
const TeacherCard = lazy(() => import('./TeacherCard'))
const TeacherCredentials = lazy(() => import('./TeacherCredentials'))
const TeacherPrograms = lazy(() => import('./TeacherPrograms'))
const TeacherFeedbacks = lazy(() => import('./TeacherFeedbacks'))
const TeacherAnalytics = lazy(() => import('./TeacherAnalytics'))

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
                <TeacherConsultations />
            </Suspense>

            <Suspense>
                <TeacherPrograms />
            </Suspense>

            <Suspense>
                <TeacherFeedbacks />
            </Suspense>
            
            <Suspense>
                <TeacherAnalytics />
            </Suspense>
        </Box>
    )
}
