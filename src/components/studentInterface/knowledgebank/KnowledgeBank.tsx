import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getKnowledgeBank } from "../../helpers/getKnowledgeBank";
import KnowledgeBankContent from "./KnowledgeBankContent";

export default function KnowledgeBank() 
{
    const [selectedMajor, setSelectedMajor] = useState(null)

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
        >
            <Box
                bgcolor='#FEF4EB'
            >
                <Box
                    px={8}
                    pb={4.5}
                    pt={6}
                    textAlign='center'
                >
                    <Typography noWrap sx={{ color: '#FF7E00' }} fontSize={18} fontFamily='Inter' fontWeight={700}>Knowledge Bank</Typography>
                </Box>
                {displayedMajors}
            </Box>
            {displayedContent}
        </Box>
    )
}
