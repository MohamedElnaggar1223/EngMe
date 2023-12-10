import { ExpandMore } from "@mui/icons-material";
import { Box, Stack, Button, InputLabel, Input, SvgIcon, Typography, Switch, SwitchProps, styled, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAssessmentData } from "../../../helpers/setAssessmentData";

//@ts-expect-error anytype
export default function ComponentCardEditAssessment({ course, setEdited, assessment }) 
{
    const queryClient = useQueryClient()

    console.log(assessment)

    const [questions, setQuestions] = useState(assessment?.questions.slice() ?? [''])

    function handleQuestionChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: string, option?: number, order?: number)
    {
        const newQuestions = [...questions]
        const oldQuestion = questions[index]
        if(order !== undefined && option !== undefined)
        {
            if(type === 'question')
            {
                if(questions[index])
                {
                    newQuestions[index] = {...oldQuestion, question: e.target.value}
                }
            }
            else if(type === 'option')
            {
                if(order === 0)
                {
                    newQuestions[index].firstOptions[option] = e.target.value
                }
                else if(order === 1)
                {
                    newQuestions[index].secondOptions[option] = e.target.value
                }
                else if(order === 2)
                {
                    newQuestions[index].thirdOptions[option] = e.target.value
                }
                else if(order === 3)
                {
                    newQuestions[index].fourthOptions[option] = e.target.value
                }
            }
            else if(type === 'label')
            {
                if(order === 0)
                {
                    newQuestions[index].firstLabel = e.target.value
                }
                else if(order === 1)
                {
                    newQuestions[index].secondLabel = e.target.value
                }
                else if(order === 2)
                {
                    newQuestions[index].thirdLabel = e.target.value
                }
                else if(order === 3)
                {
                    newQuestions[index].fourthLabel = e.target.value
                }
            }
            else if(type === 'correctOption')
            {
                if(order === 0)
                {
                    newQuestions[index].firstCorrect = option.toString()
                }
                else if(order === 1)
                {
                    newQuestions[index].secondCorrect = option.toString()
                }
                else if(order === 2)
                {
                    newQuestions[index].thirdCorrect = option.toString()
                }
                else if(order === 3)
                {
                    newQuestions[index].fourthCorrect = option.toString()
                }
            }
            else if(type === 'type')
            {
                newQuestions[index] = { question: oldQuestion.question, correctOption: '0', options: [oldQuestion.firstOptions[oldQuestion.firstCorrect], oldQuestion.secondOptions[oldQuestion.secondCorrect], oldQuestion.thirdOptions[oldQuestion.thirdCorrect], oldQuestion.fourthOptions[oldQuestion.fourthCorrect]], type: 'options' }
            }
        }
        else
        {
            if(type === 'question')
            {
                if(questions[index])
                {
                    newQuestions[index] = {...oldQuestion, question: e.target.value}
                }
            }
            else if(type === 'option')
            {
                if(questions[index] && option !== undefined)
                {
                    newQuestions[index].options[option] = e.target.value
                }
            }
            else if(type === 'correctOption')
            {
                if(questions[index] && option !== undefined)
                {
                    newQuestions[index].correctOption = option.toString()
                }
            }
            else if(type === 'type')
            {
                newQuestions[index] = { question: oldQuestion.question, firstCorrect: '0', secondCorrect: '0', thirdCorrect: '0', fourthCorrect: '0', firstLabel: '', secondLabel: '', thirdLabel: '', fourthLabel: '', firstOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], secondOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], thirdOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], fourthOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], type: 'dropdowns' }
            }
        }
        setQuestions(newQuestions)
    }

    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
            opacity: 1,
            border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
        },
        '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        },
        '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#FF3333' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        },
    }));

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['assessments', course.programId, course.id])

            queryClient.setQueryData(['assessments', course.programId, course.id], (oldData: []) => {
                //@ts-expect-error lesson
                const filteredArray = oldData.slice().filter(assessmentData => assessmentData.id !== assessment.id)
                const newArray = [...filteredArray, {...assessment, questions}]

                return newArray
            })

            return () => queryClient.setQueryData(['assessments', course.programId, course.id], previousData)
        },
        mutationFn: () => setAssessmentData(questions, assessment, course)
    })

    //@ts-expect-error question
    const displayedQuestions = questions.map((question, index) => (
        question.type === 'options' ?
        <Stack
            direction='column'
            flex={1}
            // alignItems='center'
            justifyContent='center'
            my={4}
            gap={4}
        >
            <Stack
                gap={1.5}
                flex={1}
                // alignItems='center'
                justifyContent='center'
                px={18}
            >
                <Stack
                    direction='row'
                    flex={1}
                    gap={1}
                >
                    {/*//@ts-expect-error prev */}
                    <HighlightOffIcon onClick={() => setQuestions(prev => prev.slice().filter((_, indexData) => indexData !== index))} sx={{ cursor: 'pointer', color: '#000', ml: -5.2, alignSelf: 'flex-end', mb: 2 }} />
                    <Stack
                        flex={1}
                        gap={1.5}
                        minWidth= '100%'
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Question {index + 1}</InputLabel>
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                flex: 1,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { textAlign: 'center', fontSize: 22 } }}
                            value={question.question}
                            onChange={(e) => handleQuestionChange(e, index, 'question')}
                        />
                    </Stack>
                    <Stack
                        gap={1.5}
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Type</InputLabel>
                        <Select
                            // labelId="demo-select-small-label"
                            // id="demo-select-small"
                            sx={{
                                width: '140px !important',
                                flex: 1,
                                boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                borderRadius: '4px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#F8F8F8',
                                paddingX: 1,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                    background: '#F8F8F8',
                                }, fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000',
                                textAlign: 'left'
                            }}
                            // value={day}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(0, 0, 0, 0.20)', color: '#000', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '75%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            color='primary'
                            labelId="Level"
                            value={question.type}
                            // value={level}
                            //@ts-expect-error index
                            onChange={(e) => handleQuestionChange(e, index, 'type')}
                        >
                            <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='options'>Options</MenuItem>
                            <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='dropdowns'>Drop Downs</MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                gap={40}
                flex={1}
                // alignItems='center'
                justifyContent='center'
                px={18}
                direction='row'
            >
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={3}
                    direction='row'
                >
                    <Stack
                        direction='column'
                        gap={1.5}
                        flex={1}
                        justifyContent='center'
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Option 1</InputLabel>
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                flex: 1,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                            value={question.options[0]}
                            onChange={(e) => handleQuestionChange(e, index, 'option', 0)}
                        />
                    </Stack>
                    <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 0)} checked={question.correctOption === '0'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                </Stack>
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={3}
                    direction='row'
                >
                    <Stack
                        direction='column'
                        gap={1.5}
                        flex={1}
                        justifyContent='center'
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Option 2</InputLabel>
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                flex: 1,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                            value={question.options[1]}
                            onChange={(e) => handleQuestionChange(e, index, 'option', 1)}
                        />
                    </Stack>
                    <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 1)} checked={question.correctOption === '1'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                </Stack>
            </Stack>
            <Stack
                gap={40}
                flex={1}
                // alignItems='center'
                justifyContent='center'
                px={18}
                direction='row'
            >
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={1.5}
                >
                    <Stack
                        justifyContent='center'
                        flex={1}
                        gap={3}
                        direction='row'
                    >
                        <Stack
                            direction='column'
                            gap={1.5}
                            flex={1}
                            justifyContent='center'
                        >
                            <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Option 3</InputLabel>
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    flex: 1,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center'
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.options[2]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 2)}
                            />
                        </Stack>
                        <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 2)} checked={question.correctOption === '2'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                    </Stack>
                </Stack>
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={1.5}
                >
                    <Stack
                        justifyContent='center'
                        flex={1}
                        gap={3}
                        direction='row'
                    >
                        <Stack
                            direction='column'
                            gap={1.5}
                            flex={1}
                            justifyContent='center'
                        >
                            <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Option 4</InputLabel>
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    flex: 1,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center'
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.options[3]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 3)}
                            />
                        </Stack>
                        <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 3)} checked={question.correctOption === '3'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
        :
        <Stack
            direction='column'
            flex={1}
            // alignItems='center'
            justifyContent='center'
            my={4}
            gap={4}
        >
            <Stack
                gap={1.5}
                flex={1}
                // alignItems='center'
                justifyContent='center'
                px={18}
            >
                <Stack
                    direction='row'
                    flex={1}
                    gap={1}
                >
                    {/*//@ts-expect-error prev */}
                    <HighlightOffIcon onClick={() => setQuestions(prev => prev.slice().filter((_, indexData) => indexData !== index))} sx={{ cursor: 'pointer', color: '#000', ml: -5.2, alignSelf: 'flex-end', mb: 2 }} />
                    <Stack
                        flex={1}
                        gap={1.5}
                        minWidth= '100%'
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Question {index + 1}</InputLabel>
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                flex: 1,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { textAlign: 'center', fontSize: 22 } }}
                            value={question.question}
                            onChange={(e) => handleQuestionChange(e, index, 'question')}
                        />
                    </Stack>
                    <Stack
                        gap={1.5}
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600, alignSelf: 'center' }} id='LessonDescription'>Type</InputLabel>
                        <Select
                            // labelId="demo-select-small-label"
                            // id="demo-select-small"
                            sx={{
                                width: '140px !important',
                                flex: 1,
                                boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                borderRadius: '4px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#F8F8F8',
                                paddingX: 1,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.20)',
                                    background: '#F8F8F8',
                                }, fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000',
                                textAlign: 'left'
                            }}
                            // value={day}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1.5px solid rgba(0, 0, 0, 0.20)', color: '#000', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '75%' }} />}
                            inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
                            color='primary'
                            labelId="Level"
                            value={question.type}
                            // value={level}
                            // onChange={(e) => setLevel(e.target.value)}
                            //@ts-expect-error index
                            onChange={(e) => handleQuestionChange(e, index, 'type', 1, 1)}
                        >
                            <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='options'>Options</MenuItem>
                            <MenuItem sx={{ background: '#F8F8F8', fontSize: 16, fontWeight: 500, fontFamily: 'Inter', color: '#000' }} value='dropdowns'>Drop Downs</MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                gap={40}
                flex={1}
                // alignItems='center'
                justifyContent='center'
                px={18}
                direction='row'
            >
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={3}
                    direction='row'
                >
                    <Stack
                        direction='column'
                        gap={1.5}
                        flex={1}
                        justifyContent='center'
                    >
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { fontWeight: 600, textAlign: 'center', fontSize: 16 } }}
                            value={question.firstLabel}
                            onChange={(e) => handleQuestionChange(e, index, 'label', 0, 0)}
                        />
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.firstOptions[0]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 0, 0)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 0, 0)} checked={question.firstCorrect === '0'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.firstOptions[1]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 1, 0)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 1, 0)} checked={question.firstCorrect === '1'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.firstOptions[2]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 2, 0)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 2, 0)} checked={question.firstCorrect === '2'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.firstOptions[3]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 3, 0)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 3, 0)} checked={question.firstCorrect === '3'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={3}
                    direction='row'
                >
                    <Stack
                        direction='column'
                        gap={1.5}
                        flex={1}
                        justifyContent='center'
                    >
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { fontWeight: 600, textAlign: 'center', fontSize: 16 } }}
                            value={question.secondLabel}
                            onChange={(e) => handleQuestionChange(e, index, 'label', 1, 1)}
                        />
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.secondOptions[0]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 0, 1)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 0, 1)} checked={question.secondCorrect === '0'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.secondOptions[1]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 1, 1)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 1, 1)} checked={question.secondCorrect === '1'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.secondOptions[2]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 2, 1)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 2, 1)} checked={question.secondCorrect === '2'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.secondOptions[3]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 3, 1)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 3, 1)} checked={question.secondCorrect === '3'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                gap={40}
                flex={1}
                // alignItems='center'
                justifyContent='center'
                px={18}
                direction='row'
            >
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={3}
                    direction='row'
                >
                    <Stack
                        direction='column'
                        gap={1.5}
                        flex={1}
                        justifyContent='center'
                    >
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { fontWeight: 600, textAlign: 'center', fontSize: 16 } }}
                            value={question.thirdLabel}
                            onChange={(e) => handleQuestionChange(e, index, 'label', 2, 2)}
                        />
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.thirdOptions[0]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 0, 2)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 0, 2)} checked={question.thirdCorrect === '0'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.thirdOptions[1]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 1, 2)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 1, 2)} checked={question.thirdCorrect === '1'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.thirdOptions[2]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 2, 2)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 2, 2)} checked={question.thirdCorrect === '2'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.thirdOptions[3]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 3, 2)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 3, 2)} checked={question.thirdCorrect === '3'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    justifyContent='center'
                    flex={1}
                    gap={3}
                    direction='row'
                >
                    <Stack
                        direction='column'
                        gap={1.5}
                        flex={1}
                        justifyContent='center'
                    >
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonDescription'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                bgcolor: '#F8F8F8',
                                textAlign: 'center'
                            }}
                            inputProps={{ style: { fontWeight: 600, textAlign: 'center', fontSize: 16 } }}
                            value={question.fourthLabel}
                            onChange={(e) => handleQuestionChange(e, index, 'label', 3, 3)}
                        />
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.fourthOptions[0]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 0, 3)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 0, 3)} checked={question.fourthCorrect === '0'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.fourthOptions[1]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 1, 3)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 1, 3)} checked={question.fourthCorrect === '1'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.fourthOptions[2]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 2, 3)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 2, 3)} checked={question.fourthCorrect === '2'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                        <Stack
                            direction='row'
                            flex={1}
                            gap={2}
                        >
                            <Input 
                                color='primary' 
                                disableUnderline
                                aria-labelledby='LessonDescription'
                                sx={{
                                    border: '1px solid rgba(0, 0, 0, 0.20)',
                                    background: '#fff',
                                    borderRadius: '5px',
                                    paddingX: 1,
                                    paddingY: 0.5,
                                    bgcolor: '#F8F8F8',
                                    textAlign: 'center',
                                    flex: 1,
                                    ml: 6
                                }}
                                inputProps={{ style: { textAlign: 'center', fontSize: 20 } }}
                                value={question.fourthOptions[3]}
                                onChange={(e) => handleQuestionChange(e, index, 'option', 3, 3)}
                            />
                            <IOSSwitch onChange={(e) => handleQuestionChange(e, index, 'correctOption', 3, 3)} checked={question.fourthCorrect === '3'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    ))

    return (
        <Box
            display='flex'
            flexDirection='column' 
            bgcolor='#fff'
            py={2}
            flex={1}
        >
            {displayedQuestions}
            <Button
                sx={{
                    background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                    color: '#fff',
                    fontFamily: 'Inter',
                    fontSize: 18,
                    textTransform: 'none',
                    fontWeight: 500,
                    border: '1px solid linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                    borderRadius: '8px',
                    '&:hover': {
                        background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        opacity: 1
                    },
                    paddingY: 1.95,
                    paddingX: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '160px',
                    alignSelf: 'flex-end'
                }}
                //@ts-expect-error prev
                onClick={() => setQuestions(prev => [...prev, { correctOption: '0', question: '', options: ['', '', '', ''], type: 'options' }])}
            >
                <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                    </svg>
                </SvgIcon>
                <Typography noWrap fontFamily='Inter' fontSize={14}>Add Question</Typography>
            </Button>
            <Stack
                flex={1}
                justifyContent='flex-end'
                direction='row'
                mt={3}
                pb={6}
                alignItems='center'
            >
                <Stack
                    gap={1.5}
                    flex={1}
                    minHeight='75px'
                >
                    
                </Stack>
                <Stack
                    direction='row'
                    gap={3}
                    mt='auto'
                >
                    <Button
                        sx={{
                            width: '120px',
                            height: '35px',
                            background: '#fff',
                            color: '#226E9F',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '1px solid #226E9F',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#fff',
                                opacity: 1
                            },
                        }}
                        onClick={() => setEdited('')}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            width: '120px',
                            height: '35px',
                            background: '#6A9DBC',
                            color: '#fff',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 500,
                            border: '1px solid #6A9DBC',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#6A9DBC',
                                opacity: 1
                            },
                        }}
                        onClick={() => {
                            setEdited('')
                            mutate()
                        }}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}
