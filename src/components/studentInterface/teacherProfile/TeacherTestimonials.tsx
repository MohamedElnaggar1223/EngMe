import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getTeacherTestimonials } from '../../helpers/getTeacherTestimonials'
import TeacherTestimonialCard from './TeacherTestimonialCard'

export default function TeacherTestimonials() 
{
    const { id } = useParams()

    const { data: teacherTestimonials } = useQuery({
        queryKey: ['teacherTestimonials', id],
        //@ts-expect-error teacherId
        queryFn: () => getTeacherTestimonials(id),
        enabled: !!id
    })

    const displayedTestimonials = teacherTestimonials?.map(testimonial => (
        //@ts-expect-error card
        <TeacherTestimonialCard {...testimonial} />
    ))

    return (
        <Box
            mx={14}
            sx={{
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
            }}
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        >
            <Box
                p={2}
                px={4}
                bgcolor='#D0EBFC'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    fontWeight={900}
                    fontFamily='Inter'
                    fontSize={24}
                >
                    Student Testimonials
                </Typography>
                <Typography
                    fontWeight={700}
                    fontFamily='Inter'
                    fontSize={18}
                    mr={6}
                    sx={{
                        color: '#226E9F'
                    }}
                >
                    View All
                </Typography>
            </Box>
            <Box
                py={3}
                px={3}
                height='auto'
                display='flex'
                flexDirection='row'
                // flexWrap='wrap'
                // width={{ xs: '70%', sm: '50%', lg: '20%' }}
            >
                {
                    displayedTestimonials && displayedTestimonials?.length > 1 ?
                    <>
                        {displayedTestimonials[0]}
                        {displayedTestimonials[1]}
                    </>
                    :
                    displayedTestimonials && displayedTestimonials?.length > 0 ?
                    <>
                        {displayedTestimonials[0]}
                    </>
                    :
                    <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No testimonials yet.</Typography>
                }
            </Box>
        </Box>
    )
}
