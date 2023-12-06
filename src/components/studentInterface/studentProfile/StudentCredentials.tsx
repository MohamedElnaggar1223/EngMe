import { useContext } from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getStudentProgramCertificate } from '../../helpers/getStudentProgramCertificate'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getProgramsData } from '../../helpers/getProgramsData'

export default function StudentCertificates() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: studentProgramCertificate } = useQuery({
        queryKey: ['studentProgramCertificate', userData?.id],
        queryFn: () => getStudentProgramCertificate(userData?.id)
    })

    const { data: programsCertificate } = useQuery({
        queryKey: ['programsCertificate', userData?.id],
        //@ts-expect-error filter
        queryFn: () => getProgramsData(studentProgramCertificate?.slice().filter(program => program.status === 'accepted').map(studentProgram => studentProgram.programId)),
        enabled: !!studentProgramCertificate
    })

    const displayedCerts = programsCertificate?.map(program => (
        <Stack
            alignItems='center'
            width='fit-content'
            gap={1.5}
        >
            {/*//@ts-expect-error image*/}
            <Avatar src={program?.image} sx={{ width: '82px', height: '82px' }} />
            <Typography
                fontSize={18}
                fontFamily='Inter'
                fontWeight={800}
                sx={{
                    color: '#226E9F'
                }}
            >
                {/*//@ts-expect-error image*/}
                {program?.name}
            </Typography>
        </Stack>
    ))

    return (
        <Box
            mx={14}
            borderRadius='20px'
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
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
                    Certificates
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
            >
                {displayedCerts}
            </Box>
        </Box>
    )
}
