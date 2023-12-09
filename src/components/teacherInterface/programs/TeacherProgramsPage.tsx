import { Box, Stack, Typography } from '@mui/material'
import { lazy, useState, useContext, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getTeacherPrograms } from '../../helpers/getTeacherPrograms'
import CircularProgress from '@mui/material/CircularProgress'
const TeacherMyPrograms = lazy(() => import('./TeacherMyPrograms/TeacherMyPrograms'))

export default function Programs() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    
    const [tab, setTab] = useState('Explore')

    const { data: teacherPrograms, isLoading } = useQuery({
        queryKey: ['teacherPrograms', userData?.id],
        queryFn: () => getTeacherPrograms(userData?.id),
        enabled: !!userData?.id
    })

    if(isLoading) return (
        <Box width='100%' height='95vh' display='flex' alignItems='center' justifyContent='center'>
            <CircularProgress />
        </Box>  
    )
    return (
        <Box
            mx={14}
        >
            <Stack
                direction='column'
                gap={0.2}
            >
                <Stack
                    flex={1}
                    alignItems='center'
                    justifyContent='flex-start'
                    mt={10}
                    // mx={8}
                    direction='row'
                >
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Explore')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Explore</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Explore' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Programs')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>My Programs</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Programs' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Paused')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Paused Programs</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Paused' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                </Stack>
                <Box
                    position='relative'
                    border='0px'
                    height='6px'
                    bgcolor='#FEF4EB'
                >
                </Box>
            </Stack>
            {
                // !isLoading &&
                // (
                //     tab === 'Explore' ?
                //     <Suspense>
                //         <ProgramsExplore setTab={setTab} />
                //     </Suspense> 
                //     :
                //     tab === 'Current' ?
                //     <Suspense>
                //         <ProgramsCurrent />
                //     </Suspense> 
                //     :
                //     tab === 'Completed' ?
                //     <Suspense>
                //         <ProgramsCompleted />
                //     </Suspense> 
                //     :
                //     <Suspense>
                //         <ProgramsFavorites />
                //     </Suspense>
                // )
                !isLoading && tab === 'Programs' &&
                <Suspense>
                    {/*//@ts-expect-error programs */}
                    <TeacherMyPrograms programs={teacherPrograms} />
                </Suspense>
            }
        </Box>
    )
}