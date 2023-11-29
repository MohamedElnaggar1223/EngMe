import { Box, Stack, Typography } from "@mui/material";
import { lazy, useState } from "react";
const ExamBankCard = lazy(() => import("./ExamBankCard"))
const QuizBank = lazy(() => import("./QuizBank"))

export default function ExamBank() 
{
    const [selected, setSelected] = useState(1)
    const [examClicked, setExamClicked] = useState(false)

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='row'
            zIndex={1}
        >
            <Box
                bgcolor='#D0EBFC;'
            >
                <Box
                    px={8}
                    pb={4.5}
                    pt={6}
                    textAlign='center'
                >
                    <Typography noWrap sx={{ color: '#226E9F' }} fontSize={18} fontFamily='Inter' fontWeight={700}>Exam Bank</Typography>
                </Box>
                <Box
                    px={8}
                    my={3.5}
                    py={2}
                    bgcolor={selected === 1 ? '#fff' : ''}
                    onClick={() => setSelected(1)}
                    sx={{
                        cursor: 'pointer'
                    }}
                    textAlign='center'
                >
                    <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>Civil Engineering</Typography>
                </Box>
                <Box
                    px={8}
                    my={3.5}
                    py={2}
                    bgcolor={selected === 2 ? '#fff' : ''}
                    onClick={() => setSelected(2)}
                    sx={{
                        cursor: 'pointer'
                    }}
                    textAlign='center'
                >
                    <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>Civil Engineering</Typography>
                </Box>
                <Box
                    px={8}
                    my={3.5}
                    py={2}
                    bgcolor={selected === 3 ? '#fff' : ''}
                    onClick={() => setSelected(3)}
                    sx={{
                        cursor: 'pointer'
                    }}
                    textAlign='center'
                >
                    <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>Civil Engineering</Typography>
                </Box>
                <Box
                    px={8}
                    my={3.5}
                    py={2}
                    bgcolor={selected === 4 ? '#fff' : ''}
                    onClick={() => setSelected(4)}
                    sx={{
                        cursor: 'pointer'
                    }}
                    textAlign='center'
                >
                    <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>Civil Engineering</Typography>
                </Box>
                <Box
                    px={8}
                    my={3.5}
                    py={2}
                    bgcolor={selected === 5 ? '#fff' : ''}
                    onClick={() => setSelected(5)}
                    sx={{
                        cursor: 'pointer'
                    }}
                    textAlign='center'
                >
                    <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>Civil Engineering</Typography>
                </Box>
            </Box>
            {
               examClicked 
               ?
                <QuizBank />
               :
                <Stack
                    flexWrap='wrap'
                    flexDirection='row'
                    p={16}
                    justifyContent='space-evenly'
                    gap={12}
                >
                    <ExamBankCard setExamClicked={setExamClicked} />
                    <ExamBankCard setExamClicked={setExamClicked} />
                    <ExamBankCard setExamClicked={setExamClicked} />
                    <ExamBankCard setExamClicked={setExamClicked} />
                    <ExamBankCard setExamClicked={setExamClicked} />
                    <ExamBankCard setExamClicked={setExamClicked} />
                </Stack>
            }
        </Box>
    )
}
