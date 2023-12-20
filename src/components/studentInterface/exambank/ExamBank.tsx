import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createContext, lazy, useState } from "react";
import { getExamBank } from "../../helpers/getExamBank";
import ExamBankContent from "./ExamBankContent";
const QuizBank = lazy(() => import("./QuizBank"))

interface ExamBankProps{
    admin?: boolean
}

//@ts-expect-error context
export const ExamBankContext = createContext()

export default function ExamBank({ admin }: ExamBankProps) 
{
    const [selected, setSelected] = useState('')
    const [examClicked, setExamClicked] = useState(null)

    const { data: examBankMajors } = useQuery({
        queryKey: ['examBankMajors'],
        queryFn: () => getExamBank()
    })

    const displayedMajors = examBankMajors?.map(major => (
        <Box
            px={8}
            my={3.5}
            py={2}
            bgcolor={selected === major.id ? '#fff' : ''}
            onClick={() => setSelected(major.id)}
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
        <ExamBankContext.Provider value={{ setExamClicked }}>
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
                    {
                        !admin &&
                        <Box
                            px={8}
                            pb={4.5}
                            pt={6}
                            textAlign='center'
                        >
                            <Typography noWrap sx={{ color: '#226E9F' }} fontSize={18} fontFamily='Inter' fontWeight={700}>Exam Bank</Typography>
                        </Box>
                    }
                    {displayedMajors}
                </Box>
                {
                examClicked 
                ?
                    //@ts-expect-error content
                    <QuizBank {...examClicked} />
                :
                    <ExamBankContent id={selected} />
                }
            </Box>
        </ExamBankContext.Provider>
    )
}
