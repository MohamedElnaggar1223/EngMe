import { Box, Typography } from '@mui/material'
import { Suspense, lazy, useContext } from 'react'
import { getStudentRecommendationLetters } from '../../helpers/getStudentRecommendationLetters'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../authentication/auth/AuthProvider'
const LetterCard = lazy(() => import('./LetterCard'))
 
export default function StudentLetters() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: recommendationLetters } = useQuery({
        queryKey: ['recommendationLetters', userData?.id],
        queryFn: () => getStudentRecommendationLetters(userData?.id),
        enabled: !!userData?.id
    })

    const displayedLetters = recommendationLetters?.map(letter => (
        <Suspense>
            {/*//@ts-expect-error teacherId*/}
            <LetterCard teacherId={letter.teacherId} />
        </Suspense>
    ))

    return (
        <Box
            mx={14}
            borderRadius='20px'
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            mb={5}
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
                    Recommendation Letters
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
                justifyContent={!displayedLetters?.length ? 'center' : ''}
            >
                {
                    displayedLetters?.length ?
                    displayedLetters
                    :
                    <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No letters yet.</Typography>
                }
            </Box>
        </Box>
    )
}
