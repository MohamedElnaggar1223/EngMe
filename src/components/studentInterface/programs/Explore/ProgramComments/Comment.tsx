import { Avatar, Stack, Typography } from '@mui/material'
import CommentProps from '../../../../../interfaces/CommentProps'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../../../helpers/getUserData'
import { memo } from 'react'
import { Timestamp } from 'firebase/firestore'

// eslint-disable-next-line react-refresh/only-export-components
function Comment(comment: CommentProps) 
{
    const {data: student} = useQuery({
        queryKey: ['studentComments', comment.id, comment.studentId],
        queryFn: () => getUserData(comment.studentId)
    })

    const hoursAgo = (Timestamp.now().toDate().getTime() - comment.createdAt.toDate().getTime()) / (1000 * 60 * 60)
    const minutesAgo = (Timestamp.now().toDate().getTime() - comment.createdAt.toDate().getTime()) / (1000 * 60)

    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            px={20}
            // pt={2}
            // my={4}
            py={4}
            flex={1}
            sx={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
            }}
        >
            <Stack
                alignItems='center'
                width='fit-content'
                gap={1.5}
                my={2}
                alignSelf='center'
            >
                {/*//@ts-expect-error name*/}
                <Avatar src={student?.image} sx={{ width: '82px', height: '82px' }} />
                <Typography
                    fontSize={18}
                    fontFamily='Inter'
                    noWrap
                    fontWeight={800}
                    sx={{
                        color: '#226E9F',
                        textAlign: 'center'
                    }}
                >
                    {/*//@ts-expect-error name*/}
                    {student?.name}
                </Typography>
            </Stack>
            <Stack
                direction='column'
                justifyContent='center'
                position='relative'
                flex={1}
            >
                <Typography
                    fontSize={14}
                    fontWeight={600}
                    fontFamily='Inter'
                    display='flex'
                    flexShrink={1}
                    alignSelf='flex-start'
                    width={{ xs: '70%', sm: '50%', lg: '90%' }}
                    sx={{
                        color: '#000',
                        alignSelf: 'center'
                    }}
                >
                    {comment.comment}
                </Typography>
                <Typography fontSize={12} sx={{ alignSelf: 'flex-end', opacity: 0.6, position: 'absolute', left: '82%', top: '80%' }}>{hoursAgo > 1 ? `${hoursAgo.toFixed(0)} Hours Ago` : `${minutesAgo.toFixed(0)} Minutes Ago`}</Typography>
            </Stack>
        </Stack>
    )
}

const memoizedComment = memo(Comment)
export default memoizedComment