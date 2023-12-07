import { Suspense, lazy } from 'react'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getTeacherCredentials } from '../../helpers/getTeacherCredentials'
const CredentialCard = lazy(() => import('./CredentialCard'))

export default function TeacherCredentials() 
{
    const { id } = useParams()

    const { data: teacherCredentials } = useQuery({
        queryKey: ['teacherCredentials', id],
        //@ts-expect-error teacherId
        queryFn: () => getTeacherCredentials(id),
        enabled: !!id
    })

    const displayedCredentials = teacherCredentials?.map(credential => 
        <Suspense>
            {/*//@ts-expect-error credential*/}
            <CredentialCard {...credential} />
        </Suspense>
    )

    return (
        <Box
            mx={14}
            borderRadius='20px'
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        >
            <Box
                p={2}
                px={4}
                bgcolor='#D0EBFC'
            >
                <Typography
                    fontWeight={900}
                    fontFamily='Inter'
                    fontSize={24}
                >
                    Credentials
                </Typography>
            </Box>
            <Box
                py={3}
                px={2}
                height='auto'
                display='flex'
                gap={8}
                flexDirection='row'
                flexWrap='wrap'
            >
                {
                    displayedCredentials?.length ?
                    displayedCredentials
                    :
                    <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No certificates yet.</Typography>
                }
            </Box>
        </Box>
    )
}
