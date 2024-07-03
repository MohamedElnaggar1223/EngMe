import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Box, Button, Input, Stack, Typography } from "@mui/material"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import axios from "axios"
import { setDeleteTeacherRequest } from "../../../helpers/setDeleteTeacherRequest"

interface RequestProps{
    id: string, 
    name: string, 
    email: string, 
    number: string,
    cv: string,
    why: string,
}

export default function InstructorApplicatiosRequest(request: RequestProps) 
{
    const queryClient = useQueryClient()

    const [password, setPassword] = useState('')
    const [accept, setAccept] = useState(false)

    const [cv, setCv] = useState(null)
    const [showCv, setShowCv] = useState(false)
    const [showWhy, setShowWhy] = useState(false)

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['teacherRequests'])
            const previousDataLogin = queryClient.getQueryData(['teacherFirstLogins'])

            queryClient.setQueryData(['teacherRequests'], (oldData: RequestProps[]) => {
                return oldData ? oldData.slice().filter(req => req.id !== request.id) : []
            })

            queryClient.setQueryData(['teacherFirstLogins'], (oldData: []) => {
                return oldData ? [...oldData, { id: request.id, name: request.name, email: request.email, number: request.number }] : [{ id: request.id, name: request.name, email: request.email, number: request.number }]
            })

            return () => {
                queryClient.setQueryData(['teacherRequests'], previousData)
                queryClient.setQueryData(['teacherFirstLogins'], previousDataLogin)
            }
        },
        // mutationFn: () => setTeacherRequest(undefined, undefined, undefined, undefined, undefined, request, password)
        mutationFn: () => axios.post('https://engmestripeapi.vercel.app/create-teacher-account', { request, password }, { headers: { "Content-Type": "application/json" } })
        // mutationFn: () => axios.post('http://localhost:3001/create-teacher-account', { request, password }, { headers: { "Content-Type": "application/json" } })
    })

    const { mutate: mutateDelete } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['teacherRequests'])

            queryClient.setQueryData(['teacherRequests'], (oldData: RequestProps[]) => {
                return oldData ? oldData.slice().filter(req => req.id !== request.id) : []
            })

            return () => {
                queryClient.setQueryData(['teacherRequests'], previousData)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['teacherRequests'] })
        },
        mutationFn: () => setDeleteTeacherRequest(request.id)
    })

    const getCv = async () => {
        const storage = getStorage();
        const storageRef = ref(storage, `CVs/${request.cv}`);
        const dataDisplayed = await getDownloadURL(storageRef)

        //@ts-expect-error data
        setCv(dataDisplayed)
    }

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
                    <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={20}>{request.name}</Typography>
                    <Stack
                        direction='row'
                        gap={8}
                    >
                        <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{request.email}</Typography>
                        <Stack
                            direction='row'
                            gap={2}
                        >
                            <Button
                                onClick={() => {
                                    getCv()
                                    setShowCv(prev => !prev)
                                    setShowWhy(false)
                                }}
                            >
                                Show CV
                            </Button>
                            <Button
                                onClick={() => {
                                    getCv()
                                    setShowWhy(prev => !prev)
                                    setShowCv(false)
                                }}
                            >
                                Reason For Applying
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    direction='column'
                    gap={4} 
                >
                    <Typography alignSelf='flex-end' noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{request.number}</Typography>
                    <Stack
                        direction='row'
                        height='35px'
                    >
                        {
                            accept &&
                            <Input
                                sx={{ 
                                    flex: 1,
                                    marginRight: 2,
                                    fontSize: 20,
                                    width: accept ? '400px' : '0px',
                                    transition: '0.5s',
                                    bgcolor: '#fcfcfc',
                                    borderRadius: '5px',
                                    border: accept ? '1px solid #6A9DBC' : '',
                                    paddingX: 2
                                }}
                                disableUnderline
                                type='password'
                                placeholder='Password (min 6 characters)'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        }
                        <Button
                            sx={{
                                background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                                    opacity: 1
                                },
                                paddingX: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '160px',
                                alignSelf: 'flex-end',
                                height: '38px'
                            }}
                            disabled={[accept, password, password.length < 6].every(Boolean)}
                            onClick={() => {
                                if(!accept)
                                {
                                    setAccept(true)
                                }
                                else if(accept && !password)
                                {
                                    setAccept(false)
                                }
                                else if(accept && password)
                                {
                                    mutate()
                                }
                            }}
                        >
                            Accept
                        </Button>
                        <Button
                            sx={{
                                background: '#D30000',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #D30000',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: '#D30000',
                                    opacity: 1
                                },
                                paddingX: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '160px',
                                alignSelf: 'flex-end',
                                height: '38px',
                                ml: 2
                            }}
                            onClick={() => mutateDelete()}
                        >
                            Decline
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            {
                (cv && showCv && !showWhy) &&
                <embed style={{ marginTop: 24 }} src={cv} type="application/pdf" width="70%" height="600px" />
            }
            {
                (showWhy && !showCv) &&
                <Typography sx={{ marginTop: 6 }} fontFamily='Inter' fontWeight={500} fontSize={16}>{request.why}</Typography>
            }
        </Box>
    )
}
