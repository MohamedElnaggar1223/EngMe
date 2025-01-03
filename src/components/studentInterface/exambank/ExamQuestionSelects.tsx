import { Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useEffect, useMemo, useRef, useState } from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import { cn } from "../../libs/utils"
import { useNavigate } from "react-router-dom"

interface Question {
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

interface ExamQuestionProps {
    question: Question,
    index: number,
    total: number,
    assessmentId?: string,
    quizId?: string,
    finalExamId?: string,
    setNumber: React.Dispatch<React.SetStateAction<number>>
    examEnded: boolean
    hidden?: boolean
    setExamEnded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExamQuestionSelects({ question, index, total, setNumber, examEnded, hidden, setExamEnded }: ExamQuestionProps) {
    // //@ts-expect-error context
    // const { setExamClicked } = useContext(ExamBankContext)

    const navigate = useNavigate()

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


    const [check, setCheck] = useState(false)

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

    useEffect(() => {
        setCheck(false)
        if (examEnded) return
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentFirstOption.current?.getBoundingClientRect()
            if (firstOptionLine.current && lineRect) {
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
        if (firstSelectOption.isDragging) {
            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if (firstSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [firstSelectOption, examEnded])

    useEffect(() => {
        setCheck(false)
        if (examEnded) return
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentSecondOption.current?.getBoundingClientRect()
            if (secondOptionLine.current && lineRect) {
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
        if (secondSelectOption.isDragging) {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if (secondSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [secondSelectOption, examEnded])

    useEffect(() => {
        setCheck(false)
        if (examEnded) return
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentThirdOption.current?.getBoundingClientRect()
            if (thirdOptionLine.current && lineRect) {
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
        if (thirdSelectOption.isDragging) {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if (thirdSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [thirdSelectOption, examEnded])

    useEffect(() => {
        setCheck(false)
        if (examEnded) return
        const handleLineFollowPointer = (e: MouseEvent) => {
            const clientX = e.clientX
            const clientY = e.clientY

            const lineRect = parentFourthOption.current?.getBoundingClientRect()
            if (fourthOptionLine.current && lineRect) {
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
        if (fourthSelectOption.isDragging) {

            window.addEventListener('mousemove', handleLineFollowPointer)
        }

        return () => {
            if (fourthSelectOption.isDragging) window.removeEventListener('mousemove', handleLineFollowPointer)
        }
    }, [fourthSelectOption, examEnded])

    const handleConnect = (connectedRef: React.RefObject<HTMLDivElement>, answer: string) => {
        if (examEnded) return
        const activeLine = firstSelectOption.isDragging ? firstOptionLine : secondSelectOption.isDragging ? secondOptionLine : thirdSelectOption.isDragging ? thirdOptionLine : fourthSelectOption.isDragging ? fourthOptionLine : null
        const activeParent = firstSelectOption.isDragging ? parentFirstOption : secondSelectOption.isDragging ? parentSecondOption : thirdSelectOption.isDragging ? parentThirdOption : fourthSelectOption.isDragging ? parentFourthOption : null

        if (firstSelectOption.isDragging) {
            setFirstSelectOption(prev => ({ ...prev, connectedOption: answer, isDragging: false }))
        }
        else if (secondSelectOption.isDragging) {
            setSecondSelectOption(prev => ({ ...prev, connectedOption: answer, isDragging: false }))
        }
        else if (thirdSelectOption.isDragging) {
            setThirdSelectOption(prev => ({ ...prev, connectedOption: answer, isDragging: false }))
        }
        else if (fourthSelectOption.isDragging) {
            setFourthSelectOption(prev => ({ ...prev, connectedOption: answer, isDragging: false }))
        }

        const lineRect = activeParent?.current?.getBoundingClientRect()
        const connectedRect = connectedRef.current?.getBoundingClientRect()



        if (lineRect && connectedRect && activeLine?.current) {
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

    // useEffect(() => {
    //     if (check || examEnded) {
    //         setFirstSelectOption({
    //             isDragging: false,
    //             isConnected: false,
    //             connectedOption: correctOptionsShuffled[0]
    //         })
    //         handleConnect(connectedFirstOption, correctOptionsShuffled[0])
    //         setSecondSelectOption({
    //             isDragging: false,
    //             isConnected: false,
    //             connectedOption: correctOptionsShuffled[1]
    //         })
    //         handleConnect(connectedSecondOption, correctOptionsShuffled[1])
    //         setThirdSelectOption({
    //             isDragging: false,
    //             isConnected: false,
    //             connectedOption: correctOptionsShuffled[2]
    //         })
    //         handleConnect(connectedThirdOption, correctOptionsShuffled[2])
    //         setFourthSelectOption({
    //             isDragging: false,
    //             isConnected: false,
    //             connectedOption: correctOptionsShuffled[3]
    //         })
    //         handleConnect(connectedFourthOption, correctOptionsShuffled[3])
    //     }
    // }, [check, correctOptionsShuffled, examEnded])

    const rightAnswer = useMemo(() => {
        return (firstSelectOption.connectedOption === question.firstCorrect && secondSelectOption.connectedOption === question.secondCorrect && thirdSelectOption.connectedOption === question.thirdCorrect && fourthSelectOption.connectedOption === question.fourthCorrect)
    }, [firstSelectOption, secondSelectOption, thirdSelectOption, fourthSelectOption, question])

    return (
        <Stack
            direction='column'
            gap={4}
            flex={1}
            alignItems='center'
            mt={6}
            key={index}
            style={{
                // backgroundImage: `url("${image}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: '50%',
                backgroundBlendMode: ''
            }}
            className={hidden ? '!hidden absolute opacity-0' : ''}
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
                    <Tooltip title={question.firstLabel}>
                        <div
                            onClick={() => {
                                if (examEnded) return
                                setFirstSelectOption(prev => ({ ...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: '' }))
                                setSecondSelectOption(prev => ({ ...prev, isDragging: false }))
                                setThirdSelectOption(prev => ({ ...prev, isDragging: false }))
                                setFourthSelectOption(prev => ({ ...prev, isDragging: false }))
                            }}
                            ref={parentFirstOption}
                            className={cn('relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0', (check || examEnded) ? question.firstCorrect === firstSelectOption.connectedOption ? 'border-[rgba(0,195,66,1)] border-l-4' : 'border-[rgba(255,0,0,1)] border-l-4' : 'border-[0px_0px_0px_5px_rgba(255,126,0,1)]')}
                        >
                            <input readOnly value={question.firstLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                            <div ref={firstOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !firstSelectOption.isDragging && firstSelectOption.connectedOption === '' && 'hidden')} />
                        </div>
                    </Tooltip>
                    <Tooltip title={question.secondLabel}>
                        <div
                            onClick={() => {
                                if (examEnded) return
                                setFirstSelectOption(prev => ({ ...prev, isDragging: false }))
                                setSecondSelectOption(prev => ({ ...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: '' }))
                                setThirdSelectOption(prev => ({ ...prev, isDragging: false }))
                                setFourthSelectOption(prev => ({ ...prev, isDragging: false }))
                            }}
                            ref={parentSecondOption}
                            className={cn('relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0', (check || examEnded) ? question.secondCorrect === secondSelectOption.connectedOption ? 'border-[rgba(0,195,66,1)] border-l-4' : 'border-[rgba(255,0,0,1)] border-l-4' : 'border-[0px_0px_0px_5px_rgba(255,126,0,1)]')}
                        >
                            <input readOnly value={question.secondLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                            <div ref={secondOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !secondSelectOption.isDragging && secondSelectOption.connectedOption === '' && 'hidden')} />
                        </div>
                    </Tooltip>
                    <Tooltip title={question.thirdLabel}>
                        <div
                            onClick={() => {
                                if (examEnded) return
                                setFirstSelectOption(prev => ({ ...prev, isDragging: false }))
                                setSecondSelectOption(prev => ({ ...prev, isDragging: false }))
                                setThirdSelectOption(prev => ({ ...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: '' }))
                                setFourthSelectOption(prev => ({ ...prev, isDragging: false }))
                            }}
                            ref={parentThirdOption}
                            className={cn('relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0', (check || examEnded) ? question.thirdCorrect === thirdSelectOption.connectedOption ? 'border-[rgba(0,195,66,1)] border-l-4' : 'border-[rgba(255,0,0,1)] border-l-4' : 'border-[0px_0px_0px_5px_rgba(255,126,0,1)]')}
                        >
                            <input readOnly value={question.thirdLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                            <div ref={thirdOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !thirdSelectOption.isDragging && thirdSelectOption.connectedOption === '' && 'hidden')} />
                        </div>
                    </Tooltip>
                    <Tooltip title={question.fourthLabel}>
                        <div
                            onClick={() => {
                                if (examEnded) return
                                setFirstSelectOption(prev => ({ ...prev, isDragging: false }))
                                setSecondSelectOption(prev => ({ ...prev, isDragging: false }))
                                setThirdSelectOption(prev => ({ ...prev, isDragging: false }))
                                setFourthSelectOption(prev => ({ ...prev, isDragging: !prev.isDragging, isConnected: false, connectedOption: '' }))
                            }}
                            ref={parentFourthOption}
                            className={cn('relative flex cursor-pointer min-w-52 max-w-52 min-h-[45px] max-h-[45px] p-0 m-0', (check || examEnded) ? question.fourthCorrect === fourthSelectOption.connectedOption ? 'border-[rgba(0,195,66,1)] border-l-4' : 'border-[rgba(255,0,0,1)] border-l-4' : 'border-[0px_0px_0px_5px_rgba(255,126,0,1)]')}
                        >
                            <input readOnly value={question.fourthLabel} className='min-w-52 cursor-pointer max-w-52 min-h-[45px] max-h-[45px] text-center font-[Inter] font-semibold shadow-lg border border-[rgba(0,0,0,0.15)]' />
                            <div ref={fourthOptionLine} onClick={(e) => e.stopPropagation()} className={cn("line absolute h-1 bg-black top-[18px] left-[208px] cursor-default", !fourthSelectOption.isDragging && fourthSelectOption.connectedOption === '' && 'hidden')} />
                        </div>
                    </Tooltip>
                </div>
                <div className='flex flex-col gap-12'>
                    <Tooltip title={correctOptionsShuffled[0]}>
                        <div
                            onClick={(e) => {
                                if (examEnded) return
                                if (firstLabelConnected) {
                                    if (firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging) {
                                        e.stopPropagation()
                                    }
                                    else {
                                        setFirstLabelConnected(false)
                                        if (firstSelectOption.connectedOption === correctOptionsShuffled[0]) {
                                            setFirstSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (secondSelectOption.connectedOption === correctOptionsShuffled[0]) {
                                            setSecondSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (thirdSelectOption.connectedOption === correctOptionsShuffled[0]) {
                                            setThirdSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (fourthSelectOption.connectedOption === correctOptionsShuffled[0]) {
                                            setFourthSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                    }
                                }
                                else {
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
                    </Tooltip>
                    <Tooltip title={correctOptionsShuffled[1]}>
                        <div
                            onClick={(e) => {
                                if (examEnded) return
                                if (secondLabelConnected) {
                                    if (firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging) {
                                        e.stopPropagation()
                                    }
                                    else {
                                        setSecondLabelConnected(false)
                                        if (firstSelectOption.connectedOption === correctOptionsShuffled[1]) {
                                            setFirstSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (secondSelectOption.connectedOption === correctOptionsShuffled[1]) {
                                            setSecondSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (thirdSelectOption.connectedOption === correctOptionsShuffled[1]) {
                                            setThirdSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (fourthSelectOption.connectedOption === correctOptionsShuffled[1]) {
                                            setFourthSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                    }
                                }
                                else {
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
                    </Tooltip>
                    <Tooltip title={correctOptionsShuffled[2]}>
                        <div
                            onClick={(e) => {
                                if (examEnded) return
                                if (thirdLabelConnected) {
                                    if (firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging) {
                                        e.stopPropagation()
                                    }
                                    else {
                                        setThirdLabelConnected(false)
                                        if (firstSelectOption.connectedOption === correctOptionsShuffled[2]) {
                                            setFirstSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (secondSelectOption.connectedOption === correctOptionsShuffled[2]) {
                                            setSecondSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (thirdSelectOption.connectedOption === correctOptionsShuffled[2]) {
                                            setThirdSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (fourthSelectOption.connectedOption === correctOptionsShuffled[2]) {
                                            setFourthSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                    }
                                }
                                else {
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
                    </Tooltip>
                    <Tooltip title={correctOptionsShuffled[3]}>
                        <div
                            onClick={(e) => {
                                if (examEnded) return
                                if (fourthLabelConnected) {
                                    if (firstSelectOption.isDragging || secondSelectOption.isDragging || thirdSelectOption.isDragging || fourthSelectOption.isDragging) {
                                        e.stopPropagation()
                                    }
                                    else {
                                        setFourthLabelConnected(false)
                                        if (firstSelectOption.connectedOption === correctOptionsShuffled[3]) {
                                            setFirstSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (secondSelectOption.connectedOption === correctOptionsShuffled[3]) {
                                            setSecondSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (thirdSelectOption.connectedOption === correctOptionsShuffled[3]) {
                                            setThirdSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                        else if (fourthSelectOption.connectedOption === correctOptionsShuffled[3]) {
                                            setFourthSelectOption(prev => ({ ...prev, connectedOption: '', isDragging: true, isConnected: false }))
                                        }
                                    }
                                }
                                else {
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
                    </Tooltip>
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
                    // onClick={() => handleBackQuestion()}
                    onClick={() => navigate('/')}
                // disabled={end}
                >
                    Exit
                </Button>
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
                    onClick={() => setNumber(index - 1)}
                    disabled={index === 0}
                >
                    Back
                </Button>
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
                    disabled={firstSelectOption.connectedOption === '' || secondSelectOption.connectedOption === '' || thirdSelectOption.connectedOption === '' || fourthSelectOption.connectedOption === ''}
                    // disabled={end}
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
                            onClick={() => setExamEnded(true)}
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
                            onClick={() => {
                                // setSelectedOption(-1)
                                // setCheck(false)
                                setNumber(index + 1)
                            }}
                        >
                            Next
                        </Button>
                }
            </Stack>
            {
                (check || examEnded) && !rightAnswer &&
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
