import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Stack } from '@mui/material'
import { Suspense, lazy } from 'react'
const ExpandMoreIcon = lazy(() => import('@mui/icons-material/ExpandMore'))
const TeacherProgramCard = lazy(() => import('./TeacherProgramCard'))

export default function TeacherPrograms() 
{
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
                            justifyContent={{xs: 'center', sm: 'center', lg: 'space-between'}}
                        >
                            
                            <TeacherProgramCard />
                            <TeacherProgramCard />
                            <TeacherProgramCard />
                            <TeacherProgramCard />
                            <TeacherProgramCard />
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Suspense>
        </Box>
    )
}
