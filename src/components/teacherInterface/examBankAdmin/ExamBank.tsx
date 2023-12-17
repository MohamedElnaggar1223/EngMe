import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getExamBank } from "../../helpers/getExamBank";
import ExamBankContent from "./ExamBankContent";
// const ExamBankCard = lazy(() => import("./ExamBankCard"))
// const QuizBank = lazy(() => import("./QuizBank"))

export default function ExamBank() 
{
    const [selectedMajor, setSelectedMajor] = useState(null)

    const { data: examBankMajors } = useQuery({
        queryKey: ['examBankMajors'],
        queryFn: () => getExamBank()
    })

    const displayedMajors = examBankMajors?.map(major => (
        <Box
            px={8}
            my={3.5}
            py={2}
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

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='row'
            zIndex={1}
            minHeight='77.8vh'
        >
            <Box
                bgcolor='#D0EBFC;'
            >
                {displayedMajors}
            </Box>
            {
                selectedMajor ?
                //@ts-expect-error major
                <ExamBankContent {...selectedMajor} />
                :
                <></>
            }
        </Box>
    )
}
