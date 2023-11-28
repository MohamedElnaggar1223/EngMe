import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"

interface ExamQuestionProps{
    number: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    total: number
}

export default function ExamQuestionOptions({ number, setIndex, total }: ExamQuestionProps)
{
    const [selectedOption, setSelectedOption] = useState(0)

    function handleNext()
    {
        setSelectedOption(0)
        setIndex(prev => prev + 1)
    }
    
    const end = number === total

    return (
        <Stack
            direction='column'
            gap={4}
            flex={1}
            alignItems='center'
            mt={6}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                // alignSelf='stretch'
                // mx={14}
                width='760px'
            >
                <Typography></Typography>
                <Typography>Q{number}: What color is an Orange</Typography>
                <Typography sx={{ justifySelf: 'flex-end' }}>{number}/{total}</Typography>
            </Stack>
            <Stack 
                flex={1}
                gap={4}
            >
                <Box
                    boxShadow={selectedOption === 1 ? '0px 0px 0px 5px rgba(255,126,0,1)' :'0px 0px 0px 1px rgba(0,0,0,1)'}
                    borderRadius='10px'
                    sx={{
                        textIndent: '25px',
                        cursor: 'pointer'
                    }}
                    width='790px'
                    py={2}
                    onClick={() => setSelectedOption(1)}
                >
                    <Typography>Orange</Typography>
                </Box>
                <Box
                    boxShadow={selectedOption === 2 ? '0px 0px 0px 5px rgba(255,126,0,1)' :'0px 0px 0px 1px rgba(0,0,0,1)'}
                    borderRadius='10px'
                    sx={{
                        textIndent: '25px',
                        cursor: 'pointer'
                    }}
                    width='790px'
                    py={2}
                    onClick={() => setSelectedOption(2)}
                >
                    <Typography>Orange</Typography>
                </Box>
                <Box
                    boxShadow={selectedOption === 3 ? '0px 0px 0px 5px rgba(255,126,0,1)' :'0px 0px 0px 1px rgba(0,0,0,1)'}
                    borderRadius='10px'
                    sx={{
                        textIndent: '25px',
                        cursor: 'pointer'
                    }}
                    width='790px'
                    py={2}
                    onClick={() => setSelectedOption(3)}
                >
                    <Typography>Orange</Typography>
                </Box>
                <Box
                    boxShadow={selectedOption === 4 ? '0px 0px 0px 5px rgba(255,126,0,1)' :'0px 0px 0px 1px rgba(0,0,0,1)'}
                    borderRadius='10px'
                    sx={{
                        textIndent: '25px',
                        cursor: 'pointer'
                    }}
                    width='790px'
                    py={2}
                    onClick={() => setSelectedOption(4)}
                >
                    <Typography>Orange</Typography>
                </Box>
            </Stack>
            <Stack
                direction='row'
                gap={2}
            >
                <Button
                    sx={{
                        width: '180px',
                        height: '54px',
                        background: '#FEF4EB',
                        color: '#000',
                        fontFamily: 'Inter',
                        fontSize: 14,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '0px',
                        borderRadius: '15px',
                        '&:hover': {
                            background: '#FEF4EB',
                            opacity: 1
                        },
                        marginBottom: 3
                    }}
                    onClick={handleNext}
                    disabled={end}
                >
                    Skip
                </Button>
                {
                    end ?
                    <Button
                        sx={{
                            width: '180px',
                            height: '54px',
                            background: '#9D9D9D',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '0px',
                            borderRadius: '15px',
                            '&:hover': {
                                background: '#9D9D9D',
                                opacity: 1
                            },
                            marginBottom: 3
                        }}
                    >
                        Submit
                    </Button>
                    :
                    <Button
                        sx={{
                            width: '180px',
                            height: '54px',
                            background: '#9D9D9D',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '0px',
                            borderRadius: '15px',
                            '&:hover': {
                                background: '#9D9D9D',
                                opacity: 1
                            },
                            marginBottom: 3
                        }}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                }
            </Stack>
        </Stack>
    )
}
