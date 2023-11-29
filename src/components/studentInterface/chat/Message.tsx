import { Box, Typography } from "@mui/material"
import { FieldValue } from "firebase/firestore"
import { memo, useEffect, useRef } from "react"

interface Message{
    isSender: boolean,
    isLast: boolean,
    id: string,
    sender: string,
    receiver: string,
    message: string,
    createdAt: FieldValue
}

// eslint-disable-next-line react-refresh/only-export-components
function Message({ isSender, isLast, createdAt, message }: Message) 
{
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        isLast && scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [scrollRef, isLast])

    return (
        <Box
            flex={1}
            alignItems={isSender ? 'flex-end' : 'flex-start'}
            justifyContent='center'
            display='flex'
            flexDirection='column'
            alignSelf='stretch'
            maxHeight='fit-content'
            minHeight='50px'
            my={4}
        >
            <Box
                bgcolor={isSender ? '#226E9F' : '#F8F8F8'}
                width='fit-content'
                pl={2.5}
                pr={1}
                py={1}
                borderRadius='15px'
                maxWidth='450px'
                height='fit-content'
                flexWrap='wrap'
            >
                <Typography noWrap={false} fontSize={16} sx={{ color: isSender ? '#fff' : '#000', width: 'fit-content', marginLeft: 'auto', marginRight: 5, wordBreak: 'break-all' }}>
                    {message}
                </Typography>
                <Typography fontSize={10} sx={{ marginLeft: 'auto', width: 'fit-content' }}>
                    {/*//@ts-expect-error ddd */}
                    {createdAt?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Typography>
                <div ref={scrollRef}></div>
            </Box>
        </Box>
    )
}

const memoizedMessage = memo(Message)
export default memoizedMessage