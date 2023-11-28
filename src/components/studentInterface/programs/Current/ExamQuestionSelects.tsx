import { FormControl, InputLabel, Select } from "@mui/material"
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from "react"

interface ExamQuestionProps{
    number: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    total: number
}

export default function ExamQuestionSelects({ number, setIndex, total }: ExamQuestionProps)
{
    const [firstSelectOption, setFirstSelectOption] = useState('')
    const [secondSelectOption, setSecondSelectOption] = useState('')
    const [thirdSelectOption, setThirdSelectOption] = useState('')
    const [fourthSelectOption, setFourthSelectOption] = useState('')

    function handleNext()
    {
        setFirstSelectOption('')
        setSecondSelectOption('')
        setThirdSelectOption('')
        setFourthSelectOption('')
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
                <Stack
                    direction='row'
                    gap={2}
                >
                    <Stack
                        direction='column'
                        gap={2}
                    >
                        <InputLabel htmlFor="firstSelect">
                            Orange
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#D0EBFC',
                                paddingX: 1,
                                paddingY: 0.5,
                                position: 'relative',
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#D0EBFC',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='firstSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '90%' }} />}
                            variant='standard'
                            disableUnderline
                        >
                            
                        </Select>
                    </Stack>
                    <Stack
                        direction='column'
                        gap={2}
                    >
                        <InputLabel htmlFor="secondSelect">
                            Orange
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#D0EBFC',
                                paddingX: 1,
                                paddingY: 0.5,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#D0EBFC',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='secondSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '90%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                        >
                            
                        </Select>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    gap={2}
                >
                    <Stack
                        direction='column'
                        gap={2}
                    >
                        <InputLabel htmlFor="thirdSelect">
                            Orange
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#D0EBFC',
                                paddingX: 1,
                                paddingY: 0.5,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#D0EBFC',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='thirdSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '90%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                        >
                            
                        </Select>
                    </Stack>
                    <Stack
                        direction='column'
                        gap={2}
                    >
                        <InputLabel htmlFor="fourthSelect">
                            Orange
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#D0EBFC',
                                paddingX: 1,
                                paddingY: 0.5,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#D0EBFC',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='fourthSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '90%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                        >
                            
                        </Select>
                    </Stack>
                </Stack>
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
