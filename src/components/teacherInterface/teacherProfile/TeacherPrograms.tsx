import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Suspense, lazy, useContext, useState } from 'react'
import { getTeacherPrograms } from '../../helpers/getTeacherPrograms'
import { AuthContext } from '../../authentication/auth/AuthProvider'
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'))
const TeacherProgramCard = lazy(() => import('./TeacherProgramCard'))

export default function TeacherPrograms() 
{
    const [open, setOpen] = useState(false)
    
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: teacherPrograms } = useQuery({
        queryKey: ['teacherPrograms', userData?.id],
        queryFn: () => getTeacherPrograms(userData?.id),
        enabled: open
    })

    const displayedPrograms = teacherPrograms?.map(program => 
        <Suspense>
            <TeacherProgramCard {...program} />
        </Suspense>
    )

    return (
        <Box
            mx={14}
            sx={{
                borderRadius: '30px',
                height: 'auto',
                overflow: 'hidden'
            }}
        >
            <Suspense>
                <Accordion
                    sx={{
                        background: '#FEF4EB',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        borderTop: 0
                    }}
                    expanded={open}
                    onClick={() => setOpen(prev => !prev)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ fontSize: '32px' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ marginLeft: 8, marginRight: 2, paddingY: 1.5 }}
                    >
                        <Typography
                            fontSize={24}
                            fontWeight={900}
                            fontFamily='Inter'
                            sx={{
                                wordSpacing: 8
                            }}
                        >
                            All Programs
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack
                            direction='row'
                            gap={3}
                            flexWrap='wrap'
                            p={0.5}
                            justifyContent={{xs: 'center', sm: 'center', lg: displayedPrograms?.length ? 'flex-start' : 'center'}}
                        >
                            
                            {
                                displayedPrograms?.length ?
                                displayedPrograms 
                                :
                                <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No programs yet.</Typography>
                            }
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Suspense>
        </Box>
    )
}
