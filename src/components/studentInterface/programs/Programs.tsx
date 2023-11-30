import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ProgramsCompleted from './Completed/ProgramsCompleted'
import ProgramsCurrent from './Current/ProgramsCurrent'
import ProgramsExplore from './Explore/ProgramsExplore'
import ProgramsFavorites from './Favorites/ProgramsFavorites'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'

export default function Programs() 
{
    const userData = useQueryClient().getQueryData(['userData'])
    
    const [tab, setTab] = useState('Explore')

    const { data: currentPrograms } = useQuery({
        //@ts-expect-error idk man
        queryKey: ['currentPrograms', userData?.id],
        queryFn: () => getCurrentPrograms(),
        //@ts-expect-error idk man
        enabled: !!userData?.id
    })

    const { data: explorePrograms } = useQuery({
        //@ts-expect-error idk man
        queryKey: ['explorePrograms', userData?.id],
        queryFn: () => getExplorePrograms(),
        //@ts-expect-error idk man
        enabled: !!userData?.id && !!currentPrograms
    })

    async function getCurrentPrograms()
    {
        const studentProgramsRef = collection(db, 'studentProgram')
        //@ts-expect-error query
        const q = query(studentProgramsRef, where('studentId', '==', userData?.id))

        const querySnapshot  = await getDocs(q)

        const currentProgramsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return currentProgramsData
    }

    async function getExplorePrograms()
    {
        const programsRef = collection(db, 'programs')

        if(currentPrograms?.length)
        {
            //@ts-expect-error idd
            const q = query(programsRef, where(documentId(), 'not-in', currentPrograms?.map(program => program.programId)))
    
            const querySnapshot  = await getDocs(q)
    
            const exploreProgramsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
    
            return exploreProgramsData
        }
        else
        {
            const querySnapshot  = await getDocs(programsRef)
    
            const exploreProgramsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
    
            return exploreProgramsData
        }
    }

    console.log(explorePrograms)

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
                <ProgramsExplore /> :
                tab === 'Current' ?
                <ProgramsCurrent /> :
                tab === 'Completed' ?
                <ProgramsCompleted /> :
                <ProgramsFavorites />
            }
        </Box>
    )
}
