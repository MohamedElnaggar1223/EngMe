import { useMutation } from "@tanstack/react-query"
import { Alert, Box, Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface teacherProps{
    id: string, 
    name: string, 
    email: string, 
    number: string,
}

export default function InstructorExisting(teacher: teacherProps) 
{
    const [success, setSuccess] = useState(false)

    const { mutate } = useMutation({
        onSettled: () => setSuccess(true),
        // mutationFn: () => setTeacherRequest(undefined, undefined, undefined, undefined, undefined, request, password)
        mutationFn: async () => {

        }
        // mutationFn: () => axios.post('http://localhost:3001/generate-teacher-account', { teacher }, { headers: { "Content-Type": "application/json" } })
    })

    useEffect(() => {
        if(success) setTimeout(() => setSuccess(false), 1000)
    }, [success])

    return (
        <Box
            display='flex'
            flexDirection='column'
            px={8}
            py={4}
            bgcolor='#FFFBF8'
            borderRadius='25px'
            flex={1}
            alignItems='center'
            justifyContent='space-between'
            boxShadow='0px 4px 6px 0px rgba(0, 0, 0, 0.25)'
        >
            <Stack
                direction='row'
                flex={1}
                width='100%'
                alignItems='center'
                justifyContent='space-between'
            >
                <Stack
                    direction='column'
                    gap={4} 
                >
                    <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={20}>{teacher.name}</Typography>
                    <Stack
                        direction='row'
                        gap={8}
                    >
                        <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{teacher.email}</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='column'
                    gap={4} 
                >
                    <Typography alignSelf='flex-end' noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{teacher.number}</Typography>
                    <Stack
                        direction='row'
                        height='35px'
                    >
                        {success && <Alert severity="success">Regenerated link successfully!</Alert>}
                        <Button
                            sx={{
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                borderRadius: '10px',
                                paddingX: 1.5,
                                bgcolor: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '160px',
                                alignSelf: 'flex-end',
                                height: '38px'
                            }}
                            onClick={() => {
                                mutate()
                            }}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}
