import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../../helpers/getUserData"
import { Stack, Avatar, Typography } from "@mui/material"

interface TeacherTestimonialCard{
    teacherId: string,
    studentId: string,
    testimonial: string
}

export default function TeacherTestimonialCard({studentId, testimonial}: TeacherTestimonialCard) 
{
    const { data: studentData } = useQuery({
        queryKey: ['studentData', studentId],
        queryFn: () => getUserData(studentId)
    }) 
    return (
        <Stack
            direction='row'
            alignItems='center'
            gap={4}
        >
            <Stack
                alignItems='center'
                width='fit-content'
                gap={1.5}
            >
                {/*//@ts-expect-error image */}
                <Avatar src={studentData?.image} sx={{ width: '82px', height: '82px' }} />
                <Typography
                    fontSize={18}
                    fontFamily='Inter'
                    fontWeight={800}
                    sx={{
                        color: '#226E9F',
                        textAlign: 'center'
                    }}
                >
                    {/*//@ts-expect-error image */}
                    {studentData?.name}
                </Typography>
            </Stack>
            <Typography
                fontSize={14}
                fontWeight={500}
                fontFamily='Inter'
                display='flex'
                flexShrink={1}
                width={{ xs: '70%', sm: '50%', lg: '70%' }}
            >
                {testimonial}
            </Typography>
        </Stack>
    )
}
