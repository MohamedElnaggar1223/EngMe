import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { setLastQuestionExamSessionAssessment } from "../../../helpers/setLastQuestionExamSessionAssessment";
import { setLastQuestionExamSessionQuiz } from "../../../helpers/setLastQuestionExamSessionQuiz";
import { setSubmitExamSessionAssessment } from "../../../helpers/setSubmitExamSessionAssessment";
import { setSubmitExamSessionQuiz } from "../../../helpers/setSubmitExamSessionQuiz";
import { setLastQuestionExamSessionFinalExam } from "../../../helpers/setLastQuestionExamSessionFinalExam";
import { setSubmitExamSessionFinalExam } from "../../../helpers/setSubmitExamSessionFinalExam";
import image from '../../../../assets/watermark.png'
import { setBackQuestionAssessment } from "../../../helpers/setBackQuestionAssessment";
import { setBackQuestionFinalExam } from "../../../helpers/setBackQuestionFinalExam";
import { setBackQuestionQuiz } from "../../../helpers/setBackQuestionQuiz";
import { cn } from "../../../libs/utils";
import CancelIcon from '@mui/icons-material/Cancel';
import { setBackQuestionTroubleshoot } from "../../../helpers/setBackQuestionTroubleshoot";
import { setLastQuestionExamSessionTroubleshoot } from "../../../helpers/setLastQuestionExamSessionTroubleshoot";
import { setSubmitExamSessionTroubleshoot } from "../../../helpers/setSubmitExamSessionTroubleshoot";

interface Question{
    firstCorrect: string,
    secondCorrect: string,
    thirdCorrect: string,
    fourthCorrect: string,
    firstLabel: string,
    secondLabel: string,
    thirdLabel: string,
    fourthLabel: string,
    question: string,
    image?: string
}

interface ExamQuestionProps{
    question: Question,
    index: number,
    total: number,
    programId?: string,
    troubleshootId?: string,
    assessmentId?: string,
    quizId?: string,
    finalExamId?: string
}

// eslint-disable-next-line react-refresh/only-export-components
function ExamQuestionSelects({ finalExamId, quizId, assessmentId, question, index, total, programId, troubleshootId }: ExamQuestionProps)
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)   

    const [firstLabelConnected, setFirstLabelConnected] = useState(false)
    const [secondLabelConnected, setSecondLabelConnected] = useState(false)
    const [thirdLabelConnected, setThirdLabelConnected] = useState(false)
    const [fourthLabelConnected, setFourthLabelConnected] = useState(false)

    const [firstSelectOption, setFirstSelectOption] = useState({
        isDragging: false,
        isConnected: false,
        connectedOption: ''
    })
    const [secondSelectOption, setSecondSelectOption] = useState({
        isDragging: false,
        isConnected: false,
        connectedOption: ''
    })
    const [thirdSelectOption, setThirdSelectOption] = useState({
        isDragging: false,
        isConnected: false,
        connectedOption: ''
    })
    const [fourthSelectOption, setFourthSelectOption] = useState({
        isDragging: false,
        isConnected: false,
        connectedOption: ''
    })

    const parentFirstOption = useRef<HTMLDivElement>(null)
    const parentSecondOption = useRef<HTMLDivElement>(null)
    const parentThirdOption = useRef<HTMLDivElement>(null)
    const parentFourthOption = useRef<HTMLDivElement>(null)

    const firstOptionLine = useRef<HTMLDivElement>(null)
    const secondOptionLine = useRef<HTMLDivElement>(null)
    const thirdOptionLine = useRef<HTMLDivElement>(null)
    const fourthOptionLine = useRef<HTMLDivElement>(null)

    const connectedFirstOption = useRef<HTMLDivElement>(null)
    const connectedSecondOption = useRef<HTMLDivElement>(null)
    const connectedThirdOption = useRef<HTMLDivElement>(null)
    const connectedFourthOption = useRef<HTMLDivElement>(null)
    
    const navigate = useNavigate()

    function shuffleArray(array: Array<string>) {
        const newArray = [...array]; // Create a shallow copy of the original array
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
        }
        return newArray;
    }

    const getAngle = (cx: number, cy: number, ex: number, ey: number) => {
        const dy = ey - cy;
        const dx = ex - cx;
        let theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI;
        return theta;
    }

    const correctOptionsShuffled = useMemo(() => {
        return shuffleArray([question.firstCorrect, question.secondCorrect, question.thirdCorrect, question.fourthCorrect])
    }, [question])

    const handleBackQuestion = async () => {
        if(assessmentId)
        {
            await setBackQuestionAssessment(userData.id, assessmentId, index)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(quizId)
        {
            await setBackQuestionQuiz(userData.id, quizId, index)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(finalExamId)
        {
            await setBackQuestionFinalExam(userData.id, finalExamId, index)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(troubleshootId)
            {
                await setBackQuestionTroubleshoot(userData.id, troubleshootId, index)
                setFirstSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
                setSecondSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
                setThirdSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
                setFourthSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
            }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
    }

    const handleSetLastQuestionExamSession = async () => {
        if(assessmentId)
        {
            await setLastQuestionExamSessionAssessment(userData.id, assessmentId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(quizId)
        {
            await setLastQuestionExamSessionQuiz(userData.id, quizId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if (finalExamId)
        {
            await setLastQuestionExamSessionFinalExam(userData.id, finalExamId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(troubleshootId)
            {
                await setLastQuestionExamSessionTroubleshoot(userData.id, troubleshootId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
                setFirstSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
                setSecondSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
                setThirdSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
                setFourthSelectOption({
                    isDragging: false,
                    isConnected: false,
                    connectedOption: ''
                })
            }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
    }

    const handleSubmitExamSession = async () => {
        if(assessmentId)
        {
            await setLastQuestionExamSessionAssessment(userData.id, assessmentId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            await setSubmitExamSessionAssessment(userData.id, assessmentId)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            navigate(`/programs/current/${programId}`)
        }
        else if(quizId)
        {
            await setLastQuestionExamSessionQuiz(userData.id, quizId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            await setSubmitExamSessionQuiz(userData.id, quizId)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(finalExamId)
        {
            await setLastQuestionExamSessionFinalExam(userData.id, finalExamId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            await setSubmitExamSessionFinalExam(userData.id, finalExamId)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
        }
        else if(troubleshootId)
        {
            await setLastQuestionExamSessionTroubleshoot(userData.id, troubleshootId, index, [firstSelectOption.connectedOption, secondSelectOption.connectedOption, thirdSelectOption.connectedOption, fourthSelectOption.connectedOption])
            await setSubmitExamSessionTroubleshoot(userData.id, troubleshootId)
            setFirstSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setSecondSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setThirdSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            setFourthSelectOption({
                isDragging: false,
                isConnected: false,
                connectedOption: ''
            })
            navigate(`/programs/current/${programId}`)
        }
        await queryClient.invalidateQueries({queryKey: ['examSession']})
        navigate('/')
    }

    const { mutate: mutateLastQuestionSession } = useMutation({
        onMutate: () => {
            // if(quizId)
            // {
            //     const previousData = queryClient.getQueryData(['examSession', quizId])
    
            //     queryClient.setQueryData(['examSession', quizId], (oldData: unknown) => {
            //         //@ts-expect-error unknown
            //         const oldDataArray = oldData[0]
            //         return {...oldDataArray, lastQuestion: oldDataArray.lastQuestion + 1}
            //     })
    
            //     return () => queryClient.setQueryData(['examSession', quizId], previousData)
            // }
            // else if(assessmentId)
            // {
            //     const previousData = queryClient.getQueryData(['examSession', assessmentId])
    
            //     queryClient.setQueryData(['examSession', assessmentId], (oldData: unknown) => {
            //         //@ts-expect-error unknown
            //         const oldDataArray = oldData[0]
            //         return {...oldDataArray, lastQuestion: oldDataArray.lastQuestion + 1}
            //     })
    
            //     return () => queryClient.setQueryData(['examSession', assessmentId], previousData)
            // }
        },
        mutationFn: () => handleSetLastQuestionExamSession()
    })

    const { mutate: mutateSubmitExamSession } = useMutation({
        mutationFn: () => handleSubmitExamSession()
    })

    useEffect(() => {
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentFirstOption.current?.getBoundingClientRect()
            if(firstOptionLine.current && lineRect)
            {
                const lineRectX = ((lineRect.x + 104) + lineRect.width / 2)
                const lineRectY = (lineRect.y + lineRect.height / 2)

                console.log(lineRectX, lineRectY, clientX, clientY)

                const xDistance = Math.abs(clientX - lineRectX);
                const yDistance = Math.abs(clientY - lineRectY)

                const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
                
                const angle = getAngle(lineRectX, lineRectY, clientX, clientY)
                
                firstOptionLine.current.style.width = `${distance}px`
                firstOptionLine.current.style.transformOrigin = 'top left'
                firstOptionLine.current.style.transform = `rotate(${angle}deg)`
                // console.log(angle)
            }
        }
        if(firstSelectOption.isDragging)
        {
            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if(firstSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [firstSelectOption])

    useEffect(() => {
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentSecondOption.current?.getBoundingClientRect()
            if(secondOptionLine.current && lineRect)
            {
                const lineRectX = ((lineRect.x + 104) + lineRect.width / 2)
                const lineRectY = (lineRect.y + lineRect.height / 2)

                console.log(lineRectX, lineRectY, clientX, clientY)

                const xDistance = Math.abs(clientX - lineRectX);
                const yDistance = Math.abs(clientY - lineRectY)

                const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
                
                const angle = getAngle(lineRectX, lineRectY, clientX, clientY)
                
                secondOptionLine.current.style.width = `${distance}px`
                secondOptionLine.current.style.transformOrigin = 'top left'
                secondOptionLine.current.style.transform = `rotate(${angle}deg)`
                // console.log(angle)
            }
        }
        if(secondSelectOption.isDragging)
        {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if(secondSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [secondSelectOption])

    useEffect(() => {
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentThirdOption.current?.getBoundingClientRect()
            if(thirdOptionLine.current && lineRect)
            {
                const lineRectX = ((lineRect.x + 104) + lineRect.width / 2)
                const lineRectY = (lineRect.y + lineRect.height / 2)

                console.log(lineRectX, lineRectY, clientX, clientY)

                const xDistance = Math.abs(clientX - lineRectX);
                const yDistance = Math.abs(clientY - lineRectY)

                const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
                
                const angle = getAngle(lineRectX, lineRectY, clientX, clientY)
                
                thirdOptionLine.current.style.width = `${distance}px`
                thirdOptionLine.current.style.transformOrigin = 'top left'
                thirdOptionLine.current.style.transform = `rotate(${angle}deg)`
                // console.log(angle)
            }
        }
        if(thirdSelectOption.isDragging)
        {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if(thirdSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [thirdSelectOption])

    useEffect(() => {
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentFourthOption.current?.getBoundingClientRect()
            if(fourthOptionLine.current && lineRect)
            {
                const lineRectX = ((lineRect.x + 104) + lineRect.width / 2)
                const lineRectY = (lineRect.y + lineRect.height / 2)

                console.log(lineRectX, lineRectY, clientX, clientY)

                const xDistance = Math.abs(clientX - lineRectX);
                const yDistance = Math.abs(clientY - lineRectY)

                const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
                
                const angle = getAngle(lineRectX, lineRectY, clientX, clientY)
                
                fourthOptionLine.current.style.width = `${distance}px`
                fourthOptionLine.current.style.transformOrigin = 'top left'
                fourthOptionLine.current.style.transform = `rotate(${angle}deg)`
                // console.log(angle)
            }
        }
        if(fourthSelectOption.isDragging)
        {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if(fourthSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [fourthSelectOption])

    // function handleNext()
    // {
    //     setFirstSelectOption('')
    //     setSecondSelectOption('')
    //     setThirdSelectOption('')
    //     setFourthSelectOption('')
    //     setIndex(prev => prev + 1)
    // }
    
    // const end = number === total

    // const questionsOptions = [question.firstCorrect, question.secondCorrect, question.thirdCorrect, question.fourthCorrect]

    // const displayedFirstOptions = questionsOptions.map((option, index) => (
    //     option === firstSelectOption || option === secondSelectOption || option === thirdSelectOption || option === fourthSelectOption 
    //     ?
    //     <MenuItem key={index} value={option} disabled={true}>{option}</MenuItem>
    //     :
    //     <MenuItem key={index} value={option}>{option}</MenuItem>
    // ))

    // const displayedSecondOptions = questionsOptions.map((option, index) => (
    //     option === firstSelectOption || option === secondSelectOption || option === thirdSelectOption || option === fourthSelectOption 
    //     ?
    //     <MenuItem key={index} value={option} disabled={true}>{option}</MenuItem>
    //     :
    //     <MenuItem key={index} value={option}>{option}</MenuItem>
    // ))

    // const displayedThirdOptions = questionsOptions.map((option, index) => (
    //     option === firstSelectOption || option === secondSelectOption || option === thirdSelectOption || option === fourthSelectOption 
    //     ?
    //     <MenuItem key={index} value={option} disabled={true}>{option}</MenuItem>
    //     :
    //     <MenuItem key={index} value={option}>{option}</MenuItem>
    // ))

    // const displayedFourthOptions = questionsOptions.map((option, index) => (
    //     option === firstSelectOption || option === secondSelectOption || option === thirdSelectOption || option === fourthSelectOption 
    //     ?
    //     <MenuItem key={index} value={option} disabled={true}>{option}</MenuItem>
    //     :
    //     <MenuItem key={index} value={option}>{option}</MenuItem>
    // ))

    console.log(firstSelectOption, secondSelectOption, thirdSelectOption, fourthSelectOption)

    const handleConnect = (connectedRef: React.RefObject<HTMLDivElement>, answer: string) => {

        const activeLine = firstSelectOption.isDragging ? firstOptionLine : secondSelectOption.isDragging ? secondOptionLine : thirdSelectOption.isDragging ? thirdOptionLine : fourthSelectOption.isDragging ? fourthOptionLine : null
        const activeParent = firstSelectOption.isDragging ? parentFirstOption : secondSelectOption.isDragging ? parentSecondOption : thirdSelectOption.isDragging ? parentThirdOption : fourthSelectOption.isDragging ? parentFourthOption : null

        if(firstSelectOption.isDragging)
        {
            setFirstSelectOption(prev => ({...prev, connectedOption: answer, isDragging: false}))
        }
        else if(secondSelectOption.isDragging)
        {
            setSecondSelectOption(prev => ({...prev, connectedOption: answer, isDragging: false}))
        }
        else if(thirdSelectOption.isDragging)
        {
            setThirdSelectOption(prev => ({...prev, connectedOption: answer, isDragging: false}))
        }
        else if(fourthSelectOption.isDragging)
        {
            setFourthSelectOption(prev => ({...prev, connectedOption: answer, isDragging: false}))
        }

        const lineRect = activeParent?.current?.getBoundingClientRect()
        const connectedRect = connectedRef.current?.getBoundingClientRect()



        if(lineRect && connectedRect && activeLine?.current)
        {
            const lineRectX = ((lineRect.x + 208) + lineRect.width / 2)
            const lineRectY = (lineRect.y + lineRect.height / 2)

            const connectedRectX = (connectedRect.x + connectedRect.width / 2)
            const connectedRectY = (connectedRect.y + connectedRect.height / 2)

            const xDistance = Math.abs(connectedRectX - lineRectX);
            const yDistance = Math.abs(connectedRectY - lineRectY)

            const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
            
            const angle = getAngle(lineRectX, lineRectY, connectedRectX, connectedRectY)
            
            activeLine.current.style.width = `${distance}px`
            activeLine.current.style.transformOrigin = 'top left'
            activeLine.current.style.transform = `rotate(${angle}deg)`
        }
    }

    return (
        <Stack
            direction='column'
            gap={4}
            flex={1}
            alignItems='center'
            mt={6}
            style={{
                backgroundImage: `url("${image}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: '50%',
                backgroundBlendMode: ''
            }}
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
                <Typography fontFamily='Inter'>Q{index + 1}: {question.question}</Typography>
                <Typography fontFamily='Inter' sx={{ justifySelf: 'flex-end' }}>{index + 1}/{total}</Typography>
            </Stack>
            <div className='flex justify-between w-screen max-w-[1024px]'>
                <div className='flex flex-col gap-12'>
                    <div 
                        onClick={() => {
                            setFirstSelectOption(prev => ({...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: ''}))
                            setSecondSelectOption(prev => ({...prev, isDragging: false}))
                            setThirdSelectOption(prev => ({...prev, isDragging: false}))
                            setFourthSelectOption(prev => ({...prev, isDragging: false}))
                        }} 
                        ref={parentFirstOption} 
                        className='relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={question.firstLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        <div ref={firstOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !firstSelectOption.isDragging && firstSelectOption.connectedOption === '' && 'hidden')} />
                    </div>
                    <div 
                        onClick={() => {
                            setFirstSelectOption(prev => ({...prev, isDragging: false}))
                            setSecondSelectOption(prev => ({...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: ''}))
                            setThirdSelectOption(prev => ({...prev, isDragging: false}))
                            setFourthSelectOption(prev => ({...prev, isDragging: false}))
                        }}
                        ref={parentSecondOption} 
                        className='relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={question.secondLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        <div ref={secondOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !secondSelectOption.isDragging && secondSelectOption.connectedOption === '' && 'hidden')} />
                    </div>
                    <div 
                        onClick={() => {
                            setFirstSelectOption(prev => ({...prev, isDragging: false}))
                            setSecondSelectOption(prev => ({...prev, isDragging: false}))
                            setThirdSelectOption(prev => ({...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: ''}))
                            setFourthSelectOption(prev => ({...prev, isDragging: false}))
                        }}
                        ref={parentThirdOption} 
                        className='relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={question.thirdLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        <div ref={thirdOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !thirdSelectOption.isDragging && thirdSelectOption.connectedOption === '' && 'hidden')} />
                    </div>
                    <div 
                        onClick={() => {
                            setFirstSelectOption(prev => ({...prev, isDragging: false}))
                            setSecondSelectOption(prev => ({...prev, isDragging: false}))
                            setThirdSelectOption(prev => ({...prev, isDragging: false}))
                            setFourthSelectOption(prev => ({...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: ''}))
                        }}
                        ref={parentFourthOption} 
                        className='relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={question.fourthLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        <div ref={fourthOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !fourthSelectOption.isDragging && fourthSelectOption.connectedOption === '' && 'hidden')} />
                    </div>
                </div>
                <div className='flex flex-col gap-12'>
                    <div 
                        onClick={(e) => {
                            if(firstLabelConnected)
                            {
                                if(firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging)
                                {
                                    e.stopPropagation()
                                }
                                else
                                {
                                    setFirstLabelConnected(false)
                                    if(firstSelectOption.connectedOption === correctOptionsShuffled[0])
                                    {
                                        setFirstSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(secondSelectOption.connectedOption === correctOptionsShuffled[0])
                                    {
                                        setSecondSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(thirdSelectOption.connectedOption === correctOptionsShuffled[0])
                                    {
                                        setThirdSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(fourthSelectOption.connectedOption === correctOptionsShuffled[0])
                                    {
                                        setFourthSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                }
                            }
                            else
                            {
                                setFirstLabelConnected(true)
                                handleConnect(connectedFirstOption, correctOptionsShuffled[0])
                            }
                        }}
                        ref={connectedFirstOption} 
                        className='relative flex min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={correctOptionsShuffled[0]} className='cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        {firstLabelConnected && <CancelIcon className='absolute top-[10px] right-[180px]' />}
                    </div>
                    <div 
                        onClick={(e) => {
                            if(secondLabelConnected)
                            {
                                if(firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging)
                                {
                                    e.stopPropagation()
                                }
                                else
                                {
                                    setSecondLabelConnected(false)
                                    if(firstSelectOption.connectedOption === correctOptionsShuffled[1])
                                    {
                                        setFirstSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(secondSelectOption.connectedOption === correctOptionsShuffled[1])
                                    {
                                        setSecondSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(thirdSelectOption.connectedOption === correctOptionsShuffled[1])
                                    {
                                        setThirdSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(fourthSelectOption.connectedOption === correctOptionsShuffled[1])
                                    {
                                        setFourthSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                }
                            }
                            else
                            {
                                setSecondLabelConnected(true)
                                handleConnect(connectedSecondOption, correctOptionsShuffled[1])
                            }
                        }}
                        ref={connectedSecondOption} 
                        className='relative flex min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={correctOptionsShuffled[1]} className='cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        {secondLabelConnected && <CancelIcon className='absolute top-[10px] right-[180px]' />}
                    </div>
                    <div 
                        onClick={(e) => {
                            if(thirdLabelConnected)
                            {
                                if(firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging)
                                {
                                    e.stopPropagation()
                                }
                                else
                                {
                                    setThirdLabelConnected(false)
                                    if(firstSelectOption.connectedOption === correctOptionsShuffled[2])
                                    {
                                        setFirstSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(secondSelectOption.connectedOption === correctOptionsShuffled[2])
                                    {
                                        setSecondSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(thirdSelectOption.connectedOption === correctOptionsShuffled[2])
                                    {
                                        setThirdSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(fourthSelectOption.connectedOption === correctOptionsShuffled[2])
                                    {
                                        setFourthSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                }
                            }
                            else
                            {
                                setThirdLabelConnected(true)
                                handleConnect(connectedThirdOption, correctOptionsShuffled[2])
                            }
                        }}
                        ref={connectedThirdOption} 
                        className='relative flex min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={correctOptionsShuffled[2]} className='cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        {thirdLabelConnected && <CancelIcon className='absolute top-[10px] right-[180px]' />}
                    </div>
                    <div 
                        onClick={(e) => {
                            if(fourthLabelConnected)
                            {
                                if(firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging)
                                {
                                    e.stopPropagation()
                                }
                                else
                                {
                                    setFourthLabelConnected(false)
                                    if(firstSelectOption.connectedOption === correctOptionsShuffled[3])
                                    {
                                        setFirstSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(secondSelectOption.connectedOption === correctOptionsShuffled[3])
                                    {
                                        setSecondSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(thirdSelectOption.connectedOption === correctOptionsShuffled[3])
                                    {
                                        setThirdSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                    else if(fourthSelectOption.connectedOption === correctOptionsShuffled[3])
                                    {
                                        setFourthSelectOption(prev => ({...prev, connectedOption: '', isDragging: true, isConnected: false}))
                                    }
                                }
                            }
                            else
                            {
                                setFourthLabelConnected(true)
                                handleConnect(connectedFourthOption, correctOptionsShuffled[3])
                            }
                        }}
                        ref={connectedFourthOption} 
                        className='relative flex min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0'
                    >
                        <input readOnly value={correctOptionsShuffled[3]} className='cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                        {fourthLabelConnected && <CancelIcon className='absolute top-[10px] right-[180px]' />}
                    </div>
                </div>
                
            </div>



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
                    onClick={handleBackQuestion}
                    disabled={index === 0}
                >
                    Back
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
                        disabled={firstSelectOption.connectedOption === '' || secondSelectOption.connectedOption === '' || thirdSelectOption.connectedOption === '' || fourthSelectOption.connectedOption === ''}
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
                        disabled={firstSelectOption.connectedOption === '' || secondSelectOption.connectedOption === '' || thirdSelectOption.connectedOption === '' || fourthSelectOption.connectedOption === ''}
                        onClick={() => mutateLastQuestionSession()}
                    >
                        Next
                    </Button>
                }
            </Stack>

            {/* <Stack 
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
                    onClick={handleBackQuestion}
                    disabled={index === 0}
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
                        disabled={firstSelectOption === '' || secondSelectOption === '' || thirdSelectOption === '' || fourthSelectOption === ''}
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
                        disabled={firstSelectOption === '' || secondSelectOption === '' || thirdSelectOption === '' || fourthSelectOption === ''}
                        onClick={() => mutateLastQuestionSession()}
                    >
                        Next
                    </Button>
                }
            </Stack> */}
        </Stack>
    )
}


const memoizedExamQuestionSelects = memo(ExamQuestionSelects)
export default memoizedExamQuestionSelects