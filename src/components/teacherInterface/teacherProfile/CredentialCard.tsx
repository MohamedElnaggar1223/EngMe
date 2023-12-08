import { Stack, Avatar, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import { setRemoveTeacherCredential } from "../../helpers/setRemoveTeacherCredential";

interface CredentialCard{
    id: string
    teacherId: string,
    credential: string,
    image: string,
    edit: boolean
}

export default function CredentialCard({id, edit, credential, image}: CredentialCard) 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    
    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['teacherCredentials', userData?.id])

            queryClient.setQueryData(['teacherCredentials', userData?.id], (oldData: unknown) => {
                //@ts-expect-error oldData
                const filteredCredentails = oldData.slice().filter(credentialData => credentialData.credential !== credential)
                return filteredCredentails
            })

            return () => queryClient.setQueryData(['teacherCredentials', userData?.id], previousData)
        },
        mutationFn: () => setRemoveTeacherCredential(id)
    })
    return (
        <Stack
            alignItems='center'
            width='fit-content'
            gap={1.5}
            position='relative'
        >
            {edit && <ClearIcon onClick={() => mutate()} sx={{ bgcolor: '#D9D9D9', borderRadius: '50%', fontSize: 16, position: 'absolute', top: '0%', left: '80%', cursor: 'pointer' }} />}
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
