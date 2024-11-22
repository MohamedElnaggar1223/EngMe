import { Box, SvgIcon, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useMemo, useState } from "react"
import { getKnowledgeBank } from "../../helpers/getKnowledgeBank"
import KnowledgeBankContent from "./KnowledgeBankContent"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { getStudentCurrentPrograms } from "../../helpers/getStudentCurrentPrograms"
import { AuthContext } from "../../authentication/auth/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function KnowledgeBank() {
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const isAdmin = userData.email === import.meta.env.VITE_ADMIN_EMAIL

    const navigate = useNavigate()

    const [selectedMajor, setSelectedMajor] = useState(null)
    const [open, setOpen] = useState(true)


    const { data: studentPrograms } = useQuery({
        queryKey: ['studentPrograms', userData?.id],
        queryFn: () => getStudentCurrentPrograms(userData?.id)
    })

    const allowedKnowledgeBank = useMemo(() => {
        return (studentPrograms?.slice().filter(program => program?.knowledgeBank)?.map(program => program.teacherId) as string[] ?? [] as string[])
    }, [studentPrograms])

    useEffect(() => {
        if (!allowedKnowledgeBank?.length) navigate('/')
    }, [allowedKnowledgeBank, navigate])

    const { data: knowledgeBankMajors } = useQuery({
        queryKey: ['knowledgeBankMajors'],
        queryFn: () => getKnowledgeBank({ isAdmin, teacherIds: allowedKnowledgeBank ? allowedKnowledgeBank : [] as string[] })
    })

    const displayedMajors = knowledgeBankMajors?.map(major => (
        <Box
            px={8}
            my={3.5}
            py={2}
            width='60%'
            //@ts-expect-error major
            bgcolor={selectedMajor?.id === major?.id ? '#fff' : ''}
            //@ts-expect-error major
            onClick={() => setSelectedMajor(major)}
            key={major?.id}
            sx={{
                cursor: 'pointer'
            }}
            textAlign='center'
        >
            {/*//@ts-expect-error major */}
            <Typography noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>{major?.major}</Typography>
        </Box>
    ))

    const displayedContent = selectedMajor ?
        //@ts-expect-error major
        <KnowledgeBankContent {...selectedMajor} />
        :
        <></>

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='row'
            zIndex={1}
            minHeight='77.8vh'
        >
            <Box
                bgcolor='#FEF4EB'
                display='flex'
                alignItems='center'
                minHeight='100vh'
                justifyContent='flex-start'
                flexDirection='column'
                position='sticky'
                left={0}
                width={open ? 'auto' : '50px'}
            >
                <Box
                    px={8}
                    pt={6}
                    textAlign='center'
                >
                    <SvgIcon onClick={() => setOpen(prev => !prev)} sx={{ cursor: 'pointer', position: 'absolute', zIndex: 2, top: '2.5%', left: !open ? '20%' : '85%', ':hover': { boxShadow: 'inset 0px 0px 0px 9999px rgba(0, 0, 0, 0.05)', borderRadius: '9999px' }, p: 0.5, alignSelf: 'center' }}>
                        {
                            open
                                ?
                                <ArrowBackIosIcon sx={{ color: '#FF7E00' }} />
                                :
                                <ArrowForwardIosIcon sx={{ color: '#FF7E00' }} />
                        }
                    </SvgIcon>
                    <Typography noWrap sx={{ color: '#FF7E00' }} fontSize={18} fontFamily='Inter' fontWeight={700}>Knowledge Bank</Typography>
                </Box>
                {open && displayedMajors}
            </Box>
            {displayedContent}
        </Box>
    )
}
