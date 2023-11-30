import { Suspense, lazy, memo } from 'react'
import { Box } from '@mui/material'
const StudentCard = lazy(() => import('./StudentCard'))
const StudentCertificates = lazy(() => import('./StudentCredentials'))
const StudentLetters = lazy(() => import('./StudentLetters'))
const StudentCompletedPrograms = lazy(() => import('./StudentCompletedPrograms'))
const StudentConsultations = lazy(() => import('./StudentConsultations'))
const StudentCurrentPrograms = lazy(() => import('./StudentCurrentPrograms'))

//eslint-disable-next-line
function StudentProfile() 
{
    return (
        <Box
            gap={15}
            display='flex'
            flexDirection='column'
        >
            <Suspense>
                <StudentCard />
            </Suspense>
            <Suspense>
                <StudentCertificates />
            </Suspense>
            <Suspense>
                <StudentConsultations />
            </Suspense>
            <Suspense>
                <StudentCurrentPrograms />
            </Suspense>
            <Suspense>
                <StudentCompletedPrograms />
            </Suspense>
            <Suspense>
                <StudentLetters />
            </Suspense>
        </Box>
    )
}

const memoizedStudentProfile = memo(StudentProfile)
export default memoizedStudentProfile