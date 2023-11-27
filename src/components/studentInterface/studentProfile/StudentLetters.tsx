import { Box, Stack, Typography } from '@mui/material'
import { lazy } from 'react'
const Avatar = lazy(() => import('./AvatarLazyLoad'))
 
export default function StudentLetters() 
{
    return (
        <Box
            mx={14}
            borderRadius='20px'
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            mb={5}
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
                    Recommendation Letters
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
                <Stack
                    alignItems='center'
                    width='fit-content'
                    gap={1.5}
                >
                    <Avatar />
                    <Typography
                        fontSize={18}
                        fontFamily='Inter'
                        fontWeight={800}
                        sx={{
                            color: '#226E9F'
                        }}
                    >
                        Dr.Mayada Abdelrahman
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}
