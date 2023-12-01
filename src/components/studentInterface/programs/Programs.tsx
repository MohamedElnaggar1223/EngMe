import { Box, Stack, Typography } from '@mui/material'
import { lazy, useState, useContext } from 'react'
const ProgramsCompleted = lazy(() => import('./Completed/ProgramsCompleted'))
const ProgramsCurrent = lazy(() => import('./Current/ProgramsCurrent'))
const ProgramsExplore = lazy(() => import('./Explore/ProgramsExplore'))
const ProgramsFavorites = lazy(() => import('./Favorites/ProgramsFavorites'))
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import ProgramProps from '../../../interfaces/ProgramProps'

export default function Programs() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    
    const [tab, setTab] = useState('Explore')

    const { data: currentPrograms } = useQuery({
        queryKey: ['currentPrograms', userData?.id],
        queryFn: () => getCurrentPrograms(),
        enabled: !!userData?.id,
        refetchOnMount: false
    })

    async function getCurrentPrograms()
    {
        const studentProgramsRef = collection(db, 'studentProgram')
        const q = query(studentProgramsRef, where('studentId', '==', userData?.id))

        const querySnapshot  = await getDocs(q)

        const currentProgramsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return currentProgramsData as ProgramProps[]
    }

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
                    justifyContent='space-between'
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
                        onClick={() => setTab('Current')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Current</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Current' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Completed')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Completed</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Completed' ? '#FF9F06' : '#fff'}
                            width={{xs: '80px', sm: '120px', lg: '180px'}}
                        >

                        </Box>
                    </Stack>
                    <Stack
                        alignItems='center'
                        onClick={() => setTab('Favorites')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography>Favorites</Typography>
                        <Box
                            position='relative'
                            border='0px'
                            height='6px'
                            bgcolor={tab === 'Favorites' ? '#FF9F06' : '#fff'}
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
                tab === 'Explore' ?
                <ProgramsExplore currentPrograms={currentPrograms} /> :
                tab === 'Current' ?
                <ProgramsCurrent currentPrograms={currentPrograms} /> :
                tab === 'Completed' ?
                <ProgramsCompleted /> :
                <ProgramsFavorites favoritePrograms={userData.favoritePrograms} />
            }
        </Box>
    )
}
