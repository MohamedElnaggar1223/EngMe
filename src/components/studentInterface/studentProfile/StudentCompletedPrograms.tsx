import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext, lazy } from 'react'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getStudentCompletedPrograms } from '../../helpers/getStudentCompletedPrograms'
const StudentCompletedCard = lazy(() => import('./StudentCompletedCard'))

export default function StudentCompletedPrograms() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: completedPrograms } = useQuery({
        queryKey: ['completedPrograms', userData?.id],
        queryFn: () => getStudentCompletedPrograms(userData?.id)
    })

    const displayedPrograms = completedPrograms?.map(program => <StudentCompletedCard {...program} />)

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
                Completed Programs
            </Typography>
            <Stack
                direction='row'
                gap={3}
                mx={15}
                flexWrap='wrap'
                justifyContent={{xs: 'center !important', sm: 'center !important', lg: !displayedPrograms?.length ? 'center' : 'space-between'}}
            >
                {
                    displayedPrograms?.length ?
                    displayedPrograms
                    :
                    <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No programs yet.</Typography>
                }
            </Stack>
        </Box>
    )
}
