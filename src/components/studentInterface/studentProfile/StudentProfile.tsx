import { Box } from '@mui/material'
import StudentCard from './StudentCard'
import StudentCertificates from './StudentCredentials'
import StudentLetters from './StudentLetters'
import StudentCompletedPrograms from './StudentCompletedPrograms'
import StudentConsultations from './StudentConsultations'
import StudentCurrentPrograms from './StudentCurrentPrograms'

export default function StudentProfile() 
{
    return (
        <Box
            gap={15}
            display='flex'
            flexDirection='column'
        >
            <StudentCard />
            <StudentCertificates />
            <StudentConsultations />
            <StudentCurrentPrograms />
            <StudentCompletedPrograms />
            <StudentLetters />
        </Box>
    )
}
