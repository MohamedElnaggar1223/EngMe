import { Avatar, Stack, Typography } from '@mui/material'
import avatar from '../../../../../assets/profile1.png'

export default function Comment() 
{
    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            px={20}
            // pt={2}
            // my={4}
            py={4}
            flex={1}
            sx={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
            }}
        >
            <Stack
                alignItems='center'
                width='fit-content'
                gap={1.5}
                my={2}
            >
                <Avatar src={avatar} sx={{ width: '82px', height: '82px' }} />
                <Typography
                    fontSize={18}
                    fontFamily='Inter'
                    noWrap
                    fontWeight={800}
                    sx={{
                        color: '#226E9F',
                        textAlign: 'center'
                    }}
                >
                    Eyad Raslan
                </Typography>
            </Stack>
            <Stack
                direction='column'
                justifyContent='center'
                position='relative'
            >
                <Typography
                    fontSize={14}
                    fontWeight={600}
                    fontFamily='Inter'
                    display='flex'
                    flexShrink={1}
                    width={{ xs: '70%', sm: '50%', lg: '90%' }}
                    sx={{
                        color: '#000',
                        alignSelf: 'center'
                    }}
                >
                    Good communication with her students and is very helpful and friendly. 
                    Can easily converse with her and ask for useful feedback at any point in time 
                    and would always receive advice that is helpful to the end goal of our proposal.
                </Typography>
                <Typography fontSize={12} sx={{ alignSelf: 'flex-end', opacity: 0.6, position: 'absolute', left: '82%', top: '80%' }}>22 Hours ago</Typography>
            </Stack>
        </Stack>
    )
}
