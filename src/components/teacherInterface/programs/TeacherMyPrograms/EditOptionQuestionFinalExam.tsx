import { ExpandMore } from '@mui/icons-material'
import { Stack, InputLabel, Input, Select, MenuItem, Switch, SwitchProps, styled } from '@mui/material'
import { memo } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import { EditFinalExamContext } from './ComponentCardEditFinalExam';
import { useQueryClient } from '@tanstack/react-query';

//@ts-expect-error anytype
// eslint-disable-next-line react-refresh/only-export-components
function EditOptionQuestion({ program, finalExam, index, question })
{
    const queryClient = useQueryClient()

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

    return (
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
                    <HighlightOffIcon onClick={() => queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                        //@ts-expect-error oldata
                        const newData = oldData.slice().filter((_, indexData) => indexData !== index)
                        return newData
                    })} sx={{ cursor: 'pointer', color: '#000', ml: -5.2, alignSelf: 'flex-end', mb: 2 }} />
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
                            onChange={(e) => {
                                queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                    //@ts-expect-error oldata
                                    const newData = [...oldData]
                                    const oldQuestion = newData[index]
                                    newData[index] = {...oldQuestion, question: e.target.value}
                                    return newData
                                })
                            }}
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
                            // onChange={(e) => handleQuestionChange(e, index, 'type')}
                            onChange={() => {
                                queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                    //@ts-expect-error oldata
                                    const newData = [...oldData]
                                    const oldQuestion = newData[index]
                                    newData[index] = { question: oldQuestion.question, firstCorrect: '0', secondCorrect: '0', thirdCorrect: '0', fourthCorrect: '0', firstLabel: '', secondLabel: '', thirdLabel: '', fourthLabel: '', firstOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], secondOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], thirdOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], fourthOptions: [oldQuestion.options[0], oldQuestion.options[1], oldQuestion.options[2], oldQuestion.options[3]], type: 'dropdowns' }
                                    return newData
                                })
                            }}
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
                            onChange={(e) => {
                                queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                    //@ts-expect-error oldata
                                    const newData = [...oldData]
                                    //@ts-expect-error oldata
                                    newData[index] = {...newData[index], options: newData[index].options.map((option, index) => index === 0 ? e.target.value : option)}
                                    return newData
                                })
                            }}
                        />
                    </Stack>
                    <IOSSwitch onChange={() => {
                        queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                            //@ts-expect-error oldata
                            const newData = [...oldData]
                            newData[index] = {...newData[index], correctOption: '0'}
                            return newData
                        })
                    }} checked={question.correctOption === '0'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
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
                            onChange={(e) => {
                                queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                    //@ts-expect-error oldata
                                    const newData = [...oldData]
                                    //@ts-expect-error oldata
                                    newData[index] = {...newData[index], options: newData[index].options.map((option, index) => index === 1 ? e.target.value : option)}
                                    return newData
                                })
                            }}
                        />
                    </Stack>
                    <IOSSwitch onChange={() => {
                        queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                            //@ts-expect-error oldata
                            const newData = [...oldData]
                            newData[index] = {...newData[index], correctOption: '1'}
                            return newData
                        })
                    }} checked={question.correctOption === '1'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
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
                                onChange={(e) => {
                                    queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                        //@ts-expect-error oldata
                                        const newData = [...oldData]
                                        // newData[index].options[2] = e.target.value
                                        //@ts-expect-error oldata
                                        newData[index] = {...newData[index], options: newData[index].options.map((option, index) => index === 2 ? e.target.value : option)}
                                        return newData
                                    })
                                }}
                            />
                        </Stack>

                        <IOSSwitch onChange={() => {
                            queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                //@ts-expect-error oldata
                                const newData = [...oldData]
                                // newData[index].correctOption = '2'
                                newData[index] = {...newData[index], correctOption: '2'}
                                return newData
                            })
                        }} checked={question.correctOption === '2'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
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
                                onChange={(e) => {
                                    queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                        //@ts-expect-error oldata
                                        const newData = [...oldData]
                                        // newData[index].options[3] = e.target.value
                                        //@ts-expect-error oldata
                                        newData[index] = {...newData[index], options: newData[index].options.map((option, index) => index === 3 ? e.target.value : option)}
                                        return newData
                                    })
                                }}
                            />
                        </Stack>

                        <IOSSwitch onChange={() => {
                            queryClient.setQueryData(['finalExamEdit', finalExam?.id ?? '', program.id], (oldData: unknown) => {
                                //@ts-expect-error oldata
                                const newData = [...oldData]
                                // newData[index].correctOption = '3'
                                newData[index] = {...newData[index], correctOption: '3'}
                                return newData
                            })
                        }} checked={question.correctOption === '3'} sx={{ alignSelf: 'flex-end', mb: 1.5 }} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

const memoizedEditOptionQuestion = memo(EditOptionQuestion)
export default memoizedEditOptionQuestion