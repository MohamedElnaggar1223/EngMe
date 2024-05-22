import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { getProgramFinalExams } from "../../../helpers/getProgramFinalExams";
import { useContext, useEffect, useState } from "react";
import FinalExamCard from "./FinalExamCard";
import { Box, Button, CircularProgress, Dialog, Stack, SvgIcon, Typography } from "@mui/material";
import { setProgramFinalExam } from "../../../helpers/setProgramFinalExam";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import FinalExamCardEdit from "./FinalExamCardEdit";

export default function FinalExams(program: ProgramProps) 
{
    const queryClient = useQueryClient()

    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [edit, setEdited] = useState('')
    const [loading, setLoading] = useState(false)

    const { data: finalExams, isLoading: isFinalExamsLoading } = useQuery({
		queryKey: ['finalExams', program.id],
		queryFn: () => getProgramFinalExams(program.id)
	})

    useEffect(() => {

        const finalExamsRef = collection(db, 'finalExams')
        const queryFinalExams = query(finalExamsRef, where('programId', '==', program.id))
        
        const unsub = onSnapshot(queryFinalExams, async () => {
            await queryClient.invalidateQueries({ queryKey: ['finalExams', program.id] })
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {

        const programsRef = collection(db, 'programs')
        const queryPrograms = query(programsRef, where('teacherId', '==', program.teacherId))
        
        const unsub = onSnapshot(queryPrograms, async () => {
            await queryClient.invalidateQueries({ queryKey: ['teacherPrograms', userData?.id] })
        })

        return () => {
            unsub()
        }
        //eslint-disable-next-line
    }, [])

    //@ts-expect-error finalExams
    const sortedVersions = Object.keys(program?.finalExams).sort((a, b) => Number(a.split(" ")[1]) - Number(b.split(" ")[1]))

	const displayedFinalExams = sortedVersions.map((version: string) => {
		//@ts-expect-error program
		const versionExam = finalExams?.find(exam => exam.id === program?.finalExams[version])

		if(versionExam) return <FinalExamCard setEdited={setEdited} program={program} version={version} finalExam={versionExam} />
        return <></>
	})

    const { mutate } = useMutation({
        onMutate: () => {
            setLoading(true)
        },
        onSettled: () => {
            setLoading(false)
        },
        mutationFn: (version: string) => setProgramFinalExam(version, program)
    })

    if(isFinalExamsLoading) return <></>
    else return (
        <Box
            gap={1.5}
            display='flex'
            flexDirection='column'
            flex={1}
            alignSelf='stretch'
            width='auto'
        >
            <Stack
                flex={1}
                alignItems='flex-end'
                justifyContent='center'
                width='100%'
            >
                <Button
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        borderRadius: '20px',
                        '&:hover': {
                            background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                            opacity: 1
                        },
                        paddingY: 1.95,
                        paddingX: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2
                    }}
                >
                    <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    <Typography 
                        onClick={() => {
                            //@ts-expect-error version
                            if(program.finalExams['Version 1']?.length === 0)
                            {
                                mutate('Version 1')
                            }
                            //@ts-expect-error version
                            else if(program.finalExams['Version 2']?.length === 0)
                            {
                                mutate('Version 2')
                            }
                            //@ts-expect-error version
                            else if(program.finalExams['Version 3']?.length === 0)
                            {
                                mutate('Version 3')
                            }
                        }} 
                        fontFamily='Inter' 
                        fontSize={14}
                    >
                        Add New Exam
                    </Typography>
                </Button>
            </Stack>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                gap={2}
            >
                {displayedFinalExams}
            </Stack>
            {
                edit !== '' &&
                finalExams?.find(exam => exam.id === edit) ?
                <FinalExamCardEdit 
                    version={
                        sortedVersions.find((version: string) => {
                            //@ts-expect-error program
                            program?.finalExams[version] === edit
                        })
                    } 
                    program={program} 
                    setEdited={setEdited} 
                    finalExam={finalExams?.find(exam => exam.id === edit)} 
                />
                :
                <></>
            }
            <Dialog open={loading} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
                <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
            </Dialog>
        </Box>
    )
}
