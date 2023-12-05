import { InputLabel, MenuItem, Select } from "@mui/material"
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useContext, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { setLastQuestionExamSessionAssessment } from "../../../helpers/setLastQuestionExamSessionAssessment";
import { setLastQuestionExamSessionQuiz } from "../../../helpers/setLastQuestionExamSessionQuiz";
import { setSubmitExamSessionAssessment } from "../../../helpers/setSubmitExamSessionAssessment";
import { setSubmitExamSessionQuiz } from "../../../helpers/setSubmitExamSessionQuiz";

interface Question{
    firstOptions: string[],
    secondOptions: string[],
    thirdOptions: string[],
    fourthOptions: string[],
    firstLabel: string,
    secondLabel: string,
    thirdLabel: string,
    fourthLabel: string,
    question: string
}

interface ExamQuestionProps{
    question: Question,
    index: number,
    total: number,
    assessmentId?: string,
    quizId?: string
}

export default function ExamQuestionSelects({ quizId, assessmentId, question, index, total }: ExamQuestionProps)
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)   
    const [firstSelectOption, setFirstSelectOption] = useState('')
    const [secondSelectOption, setSecondSelectOption] = useState('')
    const [thirdSelectOption, setThirdSelectOption] = useState('')
    const [fourthSelectOption, setFourthSelectOption] = useState('')

    const navigate = useNavigate()

    const handleSetLastQuestionExamSession = async () => {
        if(assessmentId)
        {
            await setLastQuestionExamSessionAssessment(userData.id, assessmentId, index, [firstSelectOption, secondSelectOption, thirdSelectOption, fourthSelectOption])
        }
        else if(quizId)
        {
            await setLastQuestionExamSessionQuiz(userData.id, quizId, index, [firstSelectOption, secondSelectOption, thirdSelectOption, fourthSelectOption])
        }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
    }

    const handleSubmitExamSession = async () => {
        if(assessmentId)
        {
            await setLastQuestionExamSessionAssessment(userData.id, assessmentId, index, [firstSelectOption, secondSelectOption, thirdSelectOption, fourthSelectOption])
            await setSubmitExamSessionAssessment(userData.id, assessmentId)
        }
        else if(quizId)
        {
            await setLastQuestionExamSessionQuiz(userData.id, quizId, index, [firstSelectOption, secondSelectOption, thirdSelectOption, fourthSelectOption])
            await setSubmitExamSessionQuiz(userData.id, quizId)
        }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
        navigate('/')
    }

    const { mutate: mutateLastQuestionSession } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['examSession'])

            queryClient.setQueryData(['examSession'], (oldData: unknown) => {
                //@ts-expect-error unknown
                const oldDataArray = oldData[0]
                return {...oldDataArray, lastQuestion: oldDataArray.lastQuestion + 1}
            })

            return () => queryClient.setQueryData(['examSession'], previousData)
        },
        mutationFn: () => handleSetLastQuestionExamSession()
    })

    const { mutate: mutateSubmitExamSession } = useMutation({
        mutationFn: () => handleSubmitExamSession()
    })

    // function handleNext()
    // {
    //     setFirstSelectOption('')
    //     setSecondSelectOption('')
    //     setThirdSelectOption('')
    //     setFourthSelectOption('')
    //     setIndex(prev => prev + 1)
    // }
    
    // const end = number === total

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
                                boxShadow: '0px 0px 0px 1px rgba(0,0,0,1)',
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
                                boxShadow: '0px 0px 0px 1px rgba(0,0,0,1)',
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
                                boxShadow: '0px 0px 0px 1px rgba(0,0,0,1)',
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
                                boxShadow: '0px 0px 0px 1px rgba(0,0,0,1)',
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
                    disabled={true}
                >
                    Skip
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
                        onClick={() => mutateSubmitExamSession()}
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
                        onClick={() => mutateLastQuestionSession()}
                    >
                        Next
                    </Button>
                }
            </Stack>
        </Stack>
    )
}
