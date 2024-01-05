import { Stack, Button, SvgIcon, Typography, Box } from '@mui/material'
import ProgramProps from '../../../../interfaces/ProgramProps'
import TeacherMyProgramCard from './TeacherMyProgramCard'
import { useState } from 'react'
import TeacherEditMyProgramCard from './TeacherEditMyProgramCard'

interface TeacherMyProgramsProps{
    programs: ProgramProps[]
}

export default function TeacherMyPrograms({ programs }: TeacherMyProgramsProps) 
{
    const [add, setAdd] = useState(false)

    const displayedPrograms = programs?.map(program => <TeacherMyProgramCard key={program.id} {...program} />)

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap={8}
            mb={8}
        >
            <Stack
                flex={1}
                alignItems='flex-end'
                justifyContent='center'
                mt={6}
            >
                <Button
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                        borderRadius: '20px',
                        '&:hover': {
                            background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                            opacity: 1
                        },
                        paddingY: 1.95,
                        paddingX: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2
                    }}
                    onClick={() => setAdd(true)}
                >
                    <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    <Typography fontFamily='Inter' fontSize={14}>Add a New Program</Typography>
                </Button>
            </Stack>
            {
                add &&
                <TeacherEditMyProgramCard setEdit={setAdd} program={undefined} />
            }
            {displayedPrograms}
        </Box>
    )
}
