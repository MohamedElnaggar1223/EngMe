import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ProgramsCompleted from './Completed/ProgramsCompleted'
import ProgramsCurrent from './Current/ProgramsCurrent'
import ProgramsExplore from './Explore/ProgramsExplore'
import ProgramsFavorites from './Favorites/ProgramsFavorites'

export default function Programs() 
{
    const [tab, setTab] = useState('Explore')

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
