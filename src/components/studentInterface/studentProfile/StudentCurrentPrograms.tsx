import { Suspense, lazy, useContext } from 'react'
import { Box, Typography } from '@mui/material'
const CurrentCourseCard = lazy(() => import('./CurrentCourseCard/CurrentCourseCard'))
import { getStudentCurrentPrograms } from '../../helpers/getStudentCurrentPrograms'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../authentication/auth/AuthProvider'

export default function StudentCurrentPrograms() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: currentPrograms } = useQuery({
        queryKey: ['currentPrograms', userData?.id],
        queryFn: () => getStudentCurrentPrograms(userData.id),
        enabled: !!userData?.id
    })

    const displayedPrograms = currentPrograms?.map(program => 
        <Suspense>
            <CurrentCourseCard {...program} />
        </Suspense>
    )

    return (
        <Box
            mx={14}
            borderRadius='20px'
            bgcolor='#FEF4EB'
            overflow='hidden'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            sx={{
                // '*':{
                //     borderRadius: '20px'
                // }
            }}
            justifyContent={!displayedPrograms?.length ? 'center' : ''}
        >
            <Box
                px={3}
                //w
                bgcolor='#FEF4EB'
                py={3}
            >
                <Typography
                    fontWeight={900}
                    fontFamily='Inter'
                    fontSize={24}
                >
                    Current Programs
                </Typography>
            </Box>
            {
                displayedPrograms?.length ?
                displayedPrograms
                :
                <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No programs yet.</Typography>
            }
        </Box>
    )
}
