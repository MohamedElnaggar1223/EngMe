import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import ExamQuestionOptions from "./ExamQuestionOptions";
import ExamQuestionSelects from "./ExamQuestionSelects";
import ExamQuestionPic from "./ExamQuestionPic";

export default function Quiz() 
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
                    bgcolor='#D0EBFC'
                    px={12}
                    py={4}
                >
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={800}>Quiz</Typography>
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={600}>Course 3</Typography>
                </Stack>
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
