import { Box, Stack, Typography } from '@mui/material'
import { lazy, useState, useContext, Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getTeacherPrograms } from '../../helpers/getTeacherPrograms'
import CircularProgress from '@mui/material/CircularProgress'
import ExamBank from '../examBankAdmin/ExamBank'
import KnowledgeBank from '../knowledgeBankAdmin/KnowledgeBank'
import InstructorsApplications from './InstructorsApplications/InstructorsApplications'
import ProgramsPriceShare from './ProgramsPriceShare/ProgramsPriceShare'
import ProgramsExplore from '../../studentInterface/programs/Explore/ProgramsExplore'
import TeacherBundles from './TeacherMyPrograms/TeacherBundles'
import DeletePrograms from './TeacherMyPrograms/DeletePrograms'
const TeacherMyPrograms = lazy(() => import('./TeacherMyPrograms/TeacherMyPrograms'))

export default function Programs() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const isAdmin = userData?.email === import.meta.env.VITE_ADMIN_EMAIL

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
                        onClick={() => setTab('Bundles')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>My Bundles</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Bundles' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    {
                        //@ts-expect-error paused
                        teacherPrograms?.find(program => program.paused) && 
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
                    }
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Knowledge Bank')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Knowledge Bank</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Knowledge Bank' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Exam Bank')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Exam Bank</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Exam Bank' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    {isAdmin && (
                        <Stack
                            alignItems='center'
                            onClick={() => setTab('Delete Programs')}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography>Delete Programs</Typography>
                            <Box
                                position='relative'
                                border='0px'
                                height='6px'
                                bgcolor={tab === 'Delete Programs' ? '#FF9F06' : '#fff'}
                                width={{xs: '80px', sm: '120px', lg: '180px'}}
                            >

                            </Box>
                        </Stack>
                    )}
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
                !isLoading && 
                (
                    tab === 'Explore' ?
                    <Suspense>
                        {/*//@ts-expect-error programs */}
                        <ProgramsExplore programs={teacherPrograms} teacherId={userData.id} />
                    </Suspense>
                    :
                    tab === 'Programs' ?
                    <Suspense>
                        {/*//@ts-expect-error programs */}
                        <TeacherMyPrograms programs={teacherPrograms?.slice().filter(program => !program.paused)} />
                    </Suspense>
                    :
                    tab === 'Bundles' ?
                    <Suspense>
                        {/*//@ts-expect-error programs */}
                        <TeacherBundles programs={teacherPrograms?.slice().filter(program => !program.paused)} />
                    </Suspense>
                    :
                    tab === 'Paused' ?
                    <Suspense>
                        {/*//@ts-expect-error programs */}
                        <TeacherMyPrograms programs={teacherPrograms?.slice().filter(program => program.paused)} />
                    </Suspense>
                    :
                    tab === 'Knowledge Bank' ?
                    <Suspense>
                        <KnowledgeBank />
                    </Suspense>
                    :
                    tab === 'Exam Bank' ?
                    <Suspense>
                        <ExamBank />
                    </Suspense>
                    :
                    tab === 'Instructors' ?
                    <Suspense>
                        <InstructorsApplications />
                    </Suspense>
                    :
                    tab === "Programs' Price Share" ?
                    <Suspense>
                        <ProgramsPriceShare />
                    </Suspense>
                    :
                    tab === 'Delete Programs' ?
                    <Suspense>
                        <DeletePrograms />
                    </Suspense>
                    :
                    <></>
                )
            }
        </Box>
    )
}
