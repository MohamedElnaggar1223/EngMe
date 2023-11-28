import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import ExamQuestionOptions from "./ExamQuestionOptions";
import ExamQuestionSelects from "./ExamQuestionSelects";
import ExamQuestionPic from "./ExamQuestionPic";

export default function Exam() 
{
    const [index, setIndex] = useState(Number(localStorage.getItem('index')) || 0)
    const [questions, setQuestions] = useState<number[]>([])

    useEffect(() => {
        setQuestions([1, 2, 3, 4])
    }, [])

    useEffect(() => {
        localStorage.setItem('index', JSON.stringify(index))
    }, [index])

    return (
        <Box
            width='100%'
        >
            <Stack
                justifyContent='space-between'
                direction='row'
            >
                <Stack
                    direction='column'
                    bgcolor='#FEF4EB'
                    px={12}
                    py={4}
                >
                    <Typography sx={{ color: '#226E9F' }} fontSize={16} fontFamily='Inter' fontWeight={800}>Final Exam</Typography>
                    <Typography sx={{ color: '#226E9F' }} fontSize={16} fontFamily='Inter' fontWeight={600}>Version 1</Typography>
                </Stack>
                <Box
                    boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                    textAlign='center'
                    borderRadius='15px'
                    mr={14}
                    mt={4}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='60px'
                    width='180px'
                >
                    <Typography fontSize={16} fontFamily='Inter' fontWeight={500}>
                        Timer
                    </Typography>
                </Box>
            </Stack>
            <Box
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                {
                    index === 0 ?
                    <ExamQuestionOptions 
                        number={questions[index]} 
                        setIndex={setIndex}
                        total={questions.length}
                    />
                    : index === 1 ?
                    <ExamQuestionSelects
                        number={questions[index]} 
                        setIndex={setIndex}
                        total={questions.length}
                    />
                    : index === 2 ?
                    <ExamQuestionPic
                        number={questions[index]} 
                        setIndex={setIndex}
                        total={questions.length}
                    />
                    :
                    <ExamQuestionOptions 
                        number={questions[index]} 
                        setIndex={setIndex}
                        total={questions.length}
                    />
                }
            </Box>
        </Box>
    )
}
