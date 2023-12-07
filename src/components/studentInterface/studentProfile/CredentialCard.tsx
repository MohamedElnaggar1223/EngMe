import { Avatar, Stack, Typography } from '@mui/material'
import ProgramProps from '../../../interfaces/ProgramProps'

export default function CredentialCard(program: ProgramProps) 
{
    return (
        <Stack
            alignItems='center'
            width='fit-content'
            gap={1.5}
        >
            <Avatar src={program?.image} sx={{ width: '82px', height: '82px' }} />
            <Typography
                fontSize={18}
                fontFamily='Inter'
                fontWeight={800}
                sx={{
                    color: '#226E9F'
                }}
            >
                {program?.name}
            </Typography>
        </Stack>
    )
}
