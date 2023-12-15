import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Suspense, useContext } from 'react'
import TeacherFeedbackCard from './TeacherFeedbackCard'
import { getTeacherProgramsComments } from '../../helpers/getTeacherProgramsComments'
import { AuthContext } from '../../authentication/auth/AuthProvider'

export default function TeacherFeedbacks() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: programsComments } = useQuery({
        queryKey: ['programsComments', userData?.id],
        queryFn: () => getTeacherProgramsComments(userData?.programs),
        enabled: !!userData
    })

    const displayedComments = programsComments?.map(programComments => {
        return programComments.map(comment => (
            <Suspense>
                {/*//@ts-expect-error comment*/}
                <TeacherFeedbackCard {...comment} />
            </Suspense>
        ))
    })

    const finalDisplayedComments = displayedComments?.slice().flat()
    
    return (
        <Box
            display='flex'
            flexDirection='column'
            gap={2}
            mx={14}
            py={4}
            bgcolor='#FEF4EB'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            borderRadius='20px'
        >
            <Typography
                fontFamily='Inter'
                fontSize={26}
                fontWeight={900}
                px={6}
                sx={{
                    wordSpacing: 8
                }}
                mb={3}
            >
                Recent  Feedbacks
            </Typography>
            <Stack
                direction='row'
                gap={3}
                mx={15}
                flexWrap='wrap'
                justifyContent={{ xs: 'center', sm: 'center', lg: finalDisplayedComments?.length ? 'space-between' : 'center' }}
            >
                {
                    finalDisplayedComments && finalDisplayedComments?.length > 1 ?
                    <>
                        {finalDisplayedComments[0]}
                        {finalDisplayedComments[1]}
                    </>
                    :
                    finalDisplayedComments && finalDisplayedComments?.length > 0 ?
                    <>
                        {finalDisplayedComments[0]}
                    </>
                    :
                    <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No feedbacks yet.</Typography>
                }
            </Stack>
        </Box>
    )
}
