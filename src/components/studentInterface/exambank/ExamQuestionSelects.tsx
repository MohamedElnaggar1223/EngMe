import { InputLabel, MenuItem, Select } from "@mui/material"
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useContext, useState } from "react"
import { ExamBankContext } from "./ExamBank";

interface Question{
    firstOptions: string[],
    secondOptions: string[],
    thirdOptions: string[],
    fourthOptions: string[],
    firstLabel: string,
    secondLabel: string,
    thirdLabel: string,
    fourthLabel: string,
    question: string,
    image?: string,
    explanation?: string,
    firstCorrect: string,
    secondCorrect: string,
    thirdCorrect: string,
    fourthCorrect: string,
}

interface ExamQuestionProps{
    question: Question,
    index: number,
    total: number,
    assessmentId?: string,
    quizId?: string,
    finalExamId?: string,
    setNumber: React.Dispatch<React.SetStateAction<number>>
}

export default function ExamQuestionSelects({ question, index, total, setNumber }: ExamQuestionProps)
{ 
    //@ts-expect-error context
    const { setExamClicked } = useContext(ExamBankContext)

    const [firstSelectOption, setFirstSelectOption] = useState('')
    const [secondSelectOption, setSecondSelectOption] = useState('')
    const [thirdSelectOption, setThirdSelectOption] = useState('')
    const [fourthSelectOption, setFourthSelectOption] = useState('')

    const [check, setCheck] = useState(false)

    const displayedFirstOptions = question.firstOptions.map((option, index) => (
        <MenuItem key={index} value={index}>{option}</MenuItem>
    ))

    const displayedSecondOptions = question.secondOptions.map((option, index) => (
        <MenuItem key={index} value={index}>{option}</MenuItem>
    ))

    const displayedThirdOptions = question.thirdOptions.map((option, index) => (
        <MenuItem key={index} value={index}>{option}</MenuItem>
    ))

    const displayedFourthOptions = question.fourthOptions.map((option, index) => (
        <MenuItem key={index} value={index}>{option}</MenuItem>
    ))

    return (
        <Stack
            direction='column'
            gap={4}
            flex={1}
            alignItems='center'
            mt={6}
        >
            {
                question?.image &&
                <img src={question?.image} height='225px' />
            }
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                // alignSelf='stretch'
                // mx={14}
                width='760px'
            >
                <Typography></Typography>
                <Typography fontFamily='Inter'>Q{index + 1}: What color is an {question.firstLabel}</Typography>
                <Typography fontFamily='Inter' sx={{ justifySelf: 'flex-end' }}>{index + 1}/{total}</Typography>
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
                        <InputLabel sx={{ fontWeight: 500, color: '#000', fontFamily: 'Inter' }} htmlFor="firstSelect">
                            {question.firstLabel}
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: check ? question.firstCorrect === firstSelectOption.toString() ? '0px 0px 0px 2px rgba(0,195,66,1)' : '0px 0px 0px 2px rgba(255,0,0,1)' :  '0px 0px 0px 1px rgba(0,0,0,1)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                paddingY: 0.5,
                                position: 'relative',
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='firstSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 3, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
                            variant='standard'
                            disableUnderline
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            value={firstSelectOption}
                            onChange={(e) => setFirstSelectOption(e.target.value)}
                        >
                            {displayedFirstOptions}
                        </Select>
                    </Stack>
                    <Stack
                        direction='column'
                        gap={2}
                    >
                        <InputLabel sx={{ fontWeight: 500, color: '#000', fontFamily: 'Inter' }} htmlFor="secondSelect">
                            {question.secondLabel}
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: check ? question.secondCorrect === secondSelectOption.toString() ? '0px 0px 0px 2px rgba(0,195,66,1)' : '0px 0px 0px 2px rgba(255,0,0,1)' :  '0px 0px 0px 1px rgba(0,0,0,1)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                paddingY: 0.5,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='secondSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 3, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            value={secondSelectOption}
                            onChange={(e) => setSecondSelectOption(e.target.value)}
                        >
                            {displayedSecondOptions}
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
                        <InputLabel sx={{ fontWeight: 500, color: '#000', fontFamily: 'Inter' }} htmlFor="thirdSelect">
                            {question.thirdLabel}
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: check ? question.thirdCorrect === thirdSelectOption.toString() ? '0px 0px 0px 2px rgba(0,195,66,1)' : '0px 0px 0px 2px rgba(255,0,0,1)' :  '0px 0px 0px 1px rgba(0,0,0,1)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                paddingY: 0.5,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='thirdSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 3, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            value={thirdSelectOption}
                            onChange={(e) => setThirdSelectOption(e.target.value)}
                        >
                            {displayedThirdOptions}
                        </Select>
                    </Stack>
                    <Stack
                        direction='column'
                        gap={2}
                    >
                        <InputLabel sx={{ fontWeight: 500, color: '#000', fontFamily: 'Inter' }} htmlFor="fourthSelect">
                            {question.fourthLabel}
                        </InputLabel>
                        <Select
                            sx={{
                                width: '380px !important',
                                height: '45px !important',
                                boxShadow: check ? question.fourthCorrect === fourthSelectOption.toString() ? '0px 0px 0px 2px rgba(0,195,66,1)' : '0px 0px 0px 2px rgba(255,0,0,1)' :  '0px 0px 0px 1px rgba(0,0,0,1)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                paddingY: 0.5,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
                                
                            }}
                            id='fourthSelect'
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 3, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            value={fourthSelectOption}
                            onChange={(e) => setFourthSelectOption(e.target.value)}
                        >
                            {displayedFourthOptions}
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
                    // onClick={handleNext}
                    disabled={firstSelectOption === '' || secondSelectOption === '' || thirdSelectOption === '' || fourthSelectOption === ''}
                    onClick={() => setCheck(true)}
                >
                    Check
                </Button>
                {
                    index + 1 === total ?
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
                        onClick={() => setExamClicked(null)}
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
                        onClick={() => {
                            setFirstSelectOption('')
                            setSecondSelectOption('')
                            setThirdSelectOption('')
                            setFourthSelectOption('')
                            setCheck(false)
                            setNumber(index + 1)
                        }}
                    >
                        Next
                    </Button>
                }
            </Stack>
            {
                check  && (question.firstCorrect !== firstSelectOption.toString() || question.secondCorrect !== secondSelectOption.toString() || question.thirdCorrect !== thirdSelectOption.toString() || question.fourthCorrect !== fourthSelectOption.toString()) &&
                <Stack
                    bgcolor='#FEF4EB'
                    borderRadius='20px'
                    width='740px'
                    p={3}
                    textAlign='center'
                    border='2px solid #FF9F06'
                >
                    <Typography
                        fontWeight={500}
                        fontFamily='Inter'
                    >
                        {question?.explanation}
                    </Typography>
                </Stack>
            }
        </Stack>
    )
}
