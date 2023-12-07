import { Stack, Avatar, Typography } from "@mui/material";

interface CredentialCard{
    teacherId: string,
    credential: string,
    image: string
}

export default function CredentialCard({credential, image}: CredentialCard) 
{
    return (
        <Stack
            alignItems='center'
            width='fit-content'
            gap={1.5}
        >
            <Avatar src={image} sx={{ width: '82px', height: '82px' }} />
            <Typography
                fontSize={18}
                fontFamily='Inter'
                fontWeight={800}
                sx={{
                    color: '#226E9F'
                }}
            >
                {credential}
            </Typography>
        </Stack>
    )
}
