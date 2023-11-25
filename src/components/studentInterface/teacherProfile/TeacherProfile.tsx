import { Box } from '@mui/material'
import TeacherCard from './TeacherCard'
import TeacherCredentials from './TeacherCredentials'
import TeacherPrograms from './TeacherPrograms'
import TeacherFeedbacks from './TeacherFeedbacks'
import TeacherTestimonials from './TeacherTestimonials'

export default function TeacherProfile() 
{
    return (
        <Box
            gap={15}
            display='flex'
            flexDirection='column'
        >
            <TeacherCard />
            <TeacherCredentials />
            <TeacherPrograms />
            <TeacherFeedbacks />
            <TeacherTestimonials />
        </Box>
    )
}
