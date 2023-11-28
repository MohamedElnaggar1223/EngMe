import { Stack, Avatar, Typography, Box, SvgIcon } from "@mui/material";
import avatar from '../../../assets/Ellipse 3.png'

export default function ChatCard() {
    return (
        <Box
            display='flex'
            flexDirection='row'
            px={1}
            py={3}
            gap={3}
            sx={{
                cursor: 'pointer',
                borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
            }}
        >
            <Stack
                direction='row'
                gap={2}
                alignItems='center'
                // mr={7}
            >
                <Avatar src={avatar} sx={{ width: '70px', height: '70px' }} />
                <Stack
                    direction='column'
                    justifyContent='center'
                    gap={1}
                >
                    <Typography noWrap sx={{ color: '#000' }} fontFamily='Inter' fontSize={14} fontWeight={600}>Dr.Mohamed El Tokhy</Typography>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        gap={1}
                    >
                        <Typography noWrap fontFamily='Inter' fontSize={12} fontWeight={700}>You have to submit the paper first thing in the...</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                alignItems='center'
                justifyContent='center'
            >
                <SvgIcon sx={{ marginTop: 1, fontSize: 10 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="6.5" fill="#226E9F"/>
                    </svg>
                </SvgIcon>
                <Typography sx={{ marginTop: 'auto' }} fontSize={12} fontWeight={500} fontFamily='Inter'>3:45PM</Typography>
            </Stack>
        </Box>
    )
}
