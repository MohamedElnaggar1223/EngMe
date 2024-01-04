import { Box, SvgIcon, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getKnowledgeBank } from "../../helpers/getKnowledgeBank"
import KnowledgeBankContent from "./KnowledgeBankContent"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function KnowledgeBank() 
{
    const [selectedMajor, setSelectedMajor] = useState(null)
    const [open, setOpen] = useState(true)

    const { data: knowledgeBankMajors } = useQuery({
        queryKey: ['knowledgeBankMajors'],
        queryFn: () => getKnowledgeBank()
    })

    const displayedMajors = knowledgeBankMajors?.map(major => (
        <Box
            px={8}
            my={3.5}
            py={2}
            width='60%'
            //@ts-expect-error major
            bgcolor={selectedMajor?.id === major?.id ? '#fff' : ''}
            //@ts-expect-error major
            onClick={() => setSelectedMajor(major)}
            key={major?.id}
            sx={{
                cursor: 'pointer'
            }}
            textAlign='center'
        >
            {/*//@ts-expect-error major */}
            <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>{major?.major}</Typography>
        </Box>
    ))

    const displayedContent = selectedMajor ?
    //@ts-expect-error major
    <KnowledgeBankContent {...selectedMajor} />
    :
    <></>

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='row'
            zIndex={1}
            minHeight='77.8vh'
            sx={{
                transition: '0.3s'
            }}
        >
            <Box
                bgcolor='#FEF4EB'
                position='sticky'
                left={0}
                minHeight='77.8vh'
                width={open ? 'auto' : '50px'}
                sx={{
                    transition: '0.3s'
                }}
            >
                <Box
                    px={8}
                    pb={4.5}
                    pt={6}
                    textAlign='center'
                >
                    <SvgIcon onClick={() => setOpen(prev => !prev)} sx={{ cursor: 'pointer', position: 'absolute', zIndex: 2, top: '2.5%', left: !open ? '20%' : '85%', ':hover': { boxShadow: 'inset 0px 0px 0px 9999px rgba(0, 0, 0, 0.05)', borderRadius: '9999px' }, p: 0.5, alignSelf: 'center' }}>
                        {
                            open 
                            ?
                            <ArrowBackIosIcon sx={{ color: '#FF7E00' }} />
                            :
                            <ArrowForwardIosIcon sx={{ color: '#FF7E00' }} />
                        }
                    </SvgIcon>
                    <Typography noWrap sx={{ color: '#FF7E00' }} fontSize={18} fontFamily='Inter' fontWeight={700}>Knowledge Bank</Typography>
                </Box>
                {open && displayedMajors}
            </Box>
            {displayedContent}
        </Box>
    )
}
