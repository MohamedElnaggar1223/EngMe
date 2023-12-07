import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../helpers/getUserData'
import { Avatar, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface LetterProps{
    teacherId: string
}

export default function LetterCard({teacherId}: LetterProps) 
{
    const { data: teacherData } = useQuery({
        queryKey: ['teacherLetterData', teacherId],
        queryFn: () => getUserData(teacherId)
    })

    const navigate = useNavigate()
    
    return (
        <Stack
            alignItems='center'
            width='fit-content'
            gap={1.5}
        >
            {/*//@ts-expect-error teacher */}
            <Avatar src={teacherData?.image} sx={{ width: '82px', height: '82px' }} />
            <Typography
                fontSize={18}
                fontFamily='Inter'
                fontWeight={800}
                sx={{
                    color: '#226E9F',
                    cursor: 'pointer'
                }}
                onClick={() => navigate(`/teacherprofile/${teacherData?.id}`)}
            >
                {/*//@ts-expect-error teacher */}
                {teacherData?.name}
            </Typography>
        </Stack>
    )
}
