import { Suspense, lazy, useContext } from 'react'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getStudentProgramCertificate } from '../../helpers/getStudentProgramCertificate'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getProgramsData } from '../../helpers/getProgramsData'
const CredentialCard = lazy(() => import('./CredentialCard'))

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
        <Suspense>
            <CredentialCard {...program}/>
        </Suspense>
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
                justifyContent={!displayedCerts?.length ? 'center' : ''}
            >
                {
                    displayedCerts?.length ?
                    displayedCerts
                    :
                    <Typography fontSize={16} fontWeight={500} fontFamily='Inter' textAlign='center' alignSelf='center' sx={{ p: 8 }}>No certificates yet.</Typography>
                }
            </Box>
        </Box>
    )
}
