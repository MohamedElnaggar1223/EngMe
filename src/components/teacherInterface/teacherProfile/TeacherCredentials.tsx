import { Suspense, lazy, useContext, useState } from 'react'
import { Box, Button, Stack, SvgIcon, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getTeacherCredentials } from '../../helpers/getTeacherCredentials'
import { AuthContext } from '../../authentication/auth/AuthProvider'
const CredentialCard = lazy(() => import('./CredentialCard'))

export default function TeacherCredentials() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const [edit, setEdit] = useState(false)

    const { data: teacherCredentials } = useQuery({
        queryKey: ['teacherCredentials', userData?.id],
        queryFn: () => getTeacherCredentials(userData?.id),
        enabled: !!userData?.id
    })

    const displayedCredentials = teacherCredentials?.map(credential => 
        <Suspense>
            {/*//@ts-expect-error credential*/}
            <CredentialCard edit={edit} {...credential} />
        </Suspense>
    )

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
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    fontWeight={900}
                    fontFamily='Inter'
                    fontSize={24}
                >
                    Credentials
                </Typography>
                {
                    edit ?
                    <Button 
                        sx={{
                            width: '120px',
                            height: '35px',
                            background: '#fff',
                            color: '#226E9F',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '1px solid #226E9F',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#fff',
                                opacity: 1
                            },
                        }}
                        onClick={() => setEdit(prev => !prev)}
                    >
                        Done
                    </Button>
                    :
                    <SvgIcon onClick={() => setEdit(prev => !prev)} sx={{ cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                            <rect width="27" height="25" rx="5" fill="white"/>
                            <path d="M22.1835 11.238C21.7321 11.238 21.366 11.604 21.366 12.0554V19.5213C21.366 20.5377 20.5395 21.3651 19.5223 21.3651H6.47956C5.46231 21.3651 4.63579 20.5377 4.63579 19.5213V6.47866C4.63579 5.46231 5.46231 4.63488 6.47956 4.63488H14.0354C14.4868 4.63488 14.8529 4.26885 14.8529 3.81744C14.8529 3.36603 14.4868 3 14.0354 3H6.47956C4.56131 3 3 4.5604 3 6.47866V19.5213C3 21.4396 4.56131 23 6.47956 23H19.5223C21.4405 23 23.0018 21.4396 23.0018 19.5213V12.0554C23.0018 11.604 22.6349 11.238 22.1835 11.238Z" fill="#226E9F"/>
                            <path d="M17.4441 3.82134L10.1716 11.0938C9.61938 11.6451 9.35145 12.4281 9.44681 13.2019L9.42774 15.7487C9.42683 15.9676 9.51312 16.1783 9.66752 16.3327C9.82102 16.4862 10.029 16.5725 10.2461 16.5725C10.2479 16.5725 10.2506 16.5725 10.2524 16.5725L12.7992 16.5534C13.5694 16.6488 14.3551 16.3817 14.9064 15.8295L22.1798 8.55704C22.633 8.10381 22.8864 7.50345 22.8937 6.86676C22.9019 6.2237 22.6566 5.61971 22.2052 5.16921L20.8319 3.79682C19.9037 2.86857 18.3841 2.88129 17.4441 3.82134ZM21.2579 6.84677C21.2561 7.05386 21.1716 7.25004 21.0217 7.39991L13.7484 14.6724C13.5458 14.874 13.2615 14.9721 12.9736 14.9267C12.9318 14.9203 12.891 14.9176 12.8492 14.9176C12.8474 14.9176 12.8446 14.9176 12.8428 14.9176L11.0681 14.9312L11.0817 13.1556C11.0817 13.112 11.0781 13.0693 11.0717 13.0257C11.0281 12.7423 11.1235 12.4517 11.326 12.25L18.5985 4.97756C18.9037 4.67511 19.3851 4.6624 19.6757 4.95122L21.049 6.32361C21.1861 6.46167 21.2606 6.64696 21.2579 6.84677Z" fill="#226E9F"/>
                        </svg>
                    </SvgIcon>
                }
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
                {
                    displayedCredentials
                }
                {
                    (edit || !displayedCredentials?.length) &&
                    <Stack
                        direction='column'
                        gap={1}
                        alignItems='center'
                        ml={8}
                    >
                        <SvgIcon sx={{ fontSize: 78, cursor: 'pointer'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
                                <circle cx="41" cy="41" r="41" fill="#226E9F"/>
                                <path d="M41.8633 37.6064V55.1412C41.8633 55.6064 41.4673 56 40.9994 56C40.5314 56 40.1354 55.6064 40.1354 55.1412V37.6064L36.7155 41.1849C36.3915 41.5428 35.8155 41.5428 35.4556 41.2207C35.0956 40.8987 35.0956 40.3261 35.4196 39.9683L40.3514 34.851C40.5314 34.672 40.7474 34.5647 40.9994 34.5647C41.2513 34.5647 41.4673 34.672 41.6473 34.851L46.5792 39.9683C46.9031 40.3261 46.9031 40.8629 46.5432 41.2207C46.3632 41.3997 46.1472 41.4712 45.9312 41.4712C45.7152 41.4712 45.4632 41.3639 45.2832 41.1849L41.8633 37.6064ZM58.9987 41.5786C58.8907 37.3917 55.9028 33.1333 50.431 33.1333C50.287 33.1333 50.143 33.1333 49.999 33.1333C49.639 31.4514 48.8831 29.9484 47.6951 28.7317C46.4352 27.4434 44.7792 26.5488 42.9433 26.191C39.1994 25.4395 35.5635 26.9425 33.5116 30.0558C31.3877 29.8053 29.3358 30.4852 27.7158 31.9166C26.0599 33.3838 25.1959 35.4593 25.3039 37.6064C23.828 39.0021 23 40.9345 23 42.9384C23 47.0179 26.3479 50.3102 30.4157 50.3102H37.4715C37.9395 50.3102 38.3355 49.9165 38.3355 49.4513C38.3355 48.9861 37.9395 48.5925 37.4715 48.5925H30.4157C27.2838 48.5925 24.7639 46.0517 24.7639 42.9742C24.7639 41.3281 25.5199 39.7535 26.8159 38.6442C27.0319 38.4653 27.1399 38.179 27.1399 37.8927C26.9599 36.1035 27.6438 34.4216 28.9758 33.2049C30.3077 32.0239 32.0717 31.523 33.8356 31.8808C34.1956 31.9524 34.5916 31.7734 34.7716 31.4514C36.3555 28.6601 39.4154 27.2645 42.6193 27.9444C45.1392 28.4454 47.9831 30.3778 48.4151 34.2068C48.4511 34.4573 48.5591 34.672 48.7391 34.8152C48.9191 34.9583 49.1711 35.0299 49.4231 34.9941C49.747 34.9583 50.107 34.9225 50.467 34.9225C55.0389 34.9225 57.1988 38.4295 57.2708 41.6502C57.3428 44.9424 55.2548 48.3778 50.431 48.5925H44.5272C44.0592 48.5925 43.6633 48.9861 43.6633 49.4513C43.6633 49.9165 44.0592 50.3102 44.5272 50.3102H50.431H50.467C53.1669 50.167 55.4348 49.165 56.9828 47.4116C58.3147 45.8728 59.0347 43.7973 58.9987 41.5786Z" fill="white"/>
                            </svg>
                        </SvgIcon>
                        <Typography sx={{ cursor: 'pointer', color: '#226E9F' }} fontFamily='Inter' fontSize={16} fontWeight={400}>Add Certificate</Typography>
                    </Stack>
                }
            </Box>
        </Box>
    )
}
