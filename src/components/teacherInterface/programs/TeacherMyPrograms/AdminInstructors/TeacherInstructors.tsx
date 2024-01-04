import { Box, Stack, Typography } from '@mui/material'
import { useState, useContext, Suspense } from 'react'
import { AuthContext } from '../../../../authentication/auth/AuthProvider'
import InstructorsApplications from '../../InstructorsApplications/InstructorsApplications'
import ProgramsPriceShare from '../../ProgramsPriceShare/ProgramsPriceShare'

export default function TeacherInstructors() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const isAdmin = userData?.email === import.meta.env.VITE_ADMIN_EMAIL
    
    const [tab, setTab] = useState('Instructors')
    
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
                    {
                        isAdmin &&
                        <Stack
                            alignItems='center'
                            onClick={() => setTab('Instructors')}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography>Instructors</Typography>
                            <Box
                                position='relative'
                                border='0px'
                                height='6px'
                                bgcolor={tab === 'Instructors' ? '#FF9F06' : '#fff'}
                                width={{xs: '80px', sm: '120px', lg: '180px'}}
                            >

                            </Box>
                        </Stack>
                    }
                    {
                        isAdmin &&
                        <Stack
                            alignItems='center'
                            onClick={() => setTab("Programs' Price Share")}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography>Programs' Price Share</Typography>
                            <Box
                                position='relative'
                                border='0px'
                                height='6px'
                                bgcolor={tab === "Programs' Price Share" ? '#FF9F06' : '#fff'}
                                width={{xs: '80px', sm: '120px', lg: '180px'}}
                            >

                            </Box>
                        </Stack>
                    }
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
                (
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
                    <></>
                )
            }
        </Box>
    )
}