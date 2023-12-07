import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../helpers/getUserData'
import { Avatar, Stack, Typography } from '@mui/material'

interface LetterProps{
    teacherId: string
}

export default function LetterCard({teacherId}: LetterProps) 
{
    const { data: teacherData } = useQuery({
        queryKey: ['teacherLetterData', teacherId],
        queryFn: () => getUserData(teacherId)
    })
    
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
                    color: '#226E9F'
                }}
            >
                {/*//@ts-expect-error teacher */}
                {teacherData?.name}
            </Typography>
        </Stack>
    )
}
