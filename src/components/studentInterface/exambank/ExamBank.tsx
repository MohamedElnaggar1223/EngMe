import { Box, SvgIcon, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createContext, lazy, useContext, useEffect, useMemo, useState } from "react";
import { getExamBank } from "../../helpers/getExamBank";
import ExamBankContent from "./ExamBankContent";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getStudentCurrentPrograms } from "../../helpers/getStudentCurrentPrograms";
import { AuthContext } from "../../authentication/auth/AuthProvider";
const QuizBank = lazy(() => import("./QuizBank"))

interface ExamBankProps{
    admin?: boolean
}

//@ts-expect-error context
export const ExamBankContext = createContext()

export default function ExamBank({ admin }: ExamBankProps) 
{
    const [selected, setSelected] = useState('')
    const [examClicked, setExamClicked] = useState(null)
    const [open, setOpen] = useState(true)

    
    const navigate = useNavigate()
    
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const isAdmin = userData.email === import.meta.env.VITE_ADMIN_EMAIL

    const { data: studentPrograms } = useQuery({
        queryKey: ['studentPrograms', userData?.id],
        queryFn: () => getStudentCurrentPrograms(userData?.id)
    })

    const allowedKnowledgeBank = useMemo(() => {
        return (studentPrograms?.slice().filter(program => program?.knowledgeBank)?.length ?? 0) > 0
    }, [studentPrograms])

    useEffect(() => {
        if(!allowedKnowledgeBank) navigate('/') 
    }, [allowedKnowledgeBank, navigate])

    const { data: examBankMajors } = useQuery({
        queryKey: ['examBankMajors'],
        queryFn: () => getExamBank({ isAdmin, teacherId: userData.id })
    })

    const displayedMajors = examBankMajors?.map(major => (
        <Box
            px={8}
            my={3.5}
            py={2}
            bgcolor={selected === major.id ? '#fff' : ''}
            onClick={() => setSelected(major.id)}
            sx={{
                cursor: 'pointer'
            }}
            textAlign='center'
        >
            {/*//@ts-expect-error major */}
            <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>{major?.major}</Typography>
        </Box>
    ))

    return (
        <ExamBankContext.Provider value={{ setExamClicked }}>
            <Box
                width='100%'
                display='flex'
                flexDirection='row'
                zIndex={1}
                minHeight='77.8vh'
            >
                <Box
                    bgcolor='#D0EBFC'
                    position='sticky'
                    left={0}
                    minHeight='77.8vh'
                    width={open ? 'auto' : '50px'}
                    sx={{
                        transition: '0.3s'
                    }}
                >
                    {
                        !admin &&
                        <Box
                            px={8}
                            pb={4.5}
                            pt={6}
                            textAlign='center'
                        >
                            <SvgIcon onClick={() => setOpen(prev => !prev)} sx={{ cursor: 'pointer', position: 'absolute', zIndex: 2, top: '2.5%', left: !open ? '20%' : '85%', ':hover': { boxShadow: 'inset 0px 0px 0px 9999px rgba(0, 0, 0, 0.05)', borderRadius: '9999px' }, p: 0.5, alignSelf: 'center' }}>
                                {
                                    open 
                                    ?
                                    <ArrowBackIos sx={{ color: '#226E9F' }} />
                                    :
                                    <ArrowForwardIos sx={{ color: '#226E9F' }} />
                                }
                            </SvgIcon>
                            <Typography noWrap sx={{ color: '#226E9F' }} fontSize={18} fontFamily='Inter' fontWeight={700}>Exam Bank</Typography>
                        </Box>
                    }
                    {open && displayedMajors}
                </Box>
                {
                examClicked 
                ?
                    //@ts-expect-error content
                    <QuizBank {...examClicked} />
                :
                    <ExamBankContent id={selected} />
                }
            </Box>
        </ExamBankContext.Provider>
    )
}
