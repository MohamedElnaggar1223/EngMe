import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Alert, Box, Button, CircularProgress, Dialog, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
// import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../../firebase/firebaseConfig"

interface teacherProps{
    id: string, 
    name: string, 
    email: string, 
    number: string,
    programs: string[],
}

export default function InstructorExisting(teacher: teacherProps) 
{
    const queryClient = useQueryClient()

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const { mutate } = useMutation({
        onMutate: () => setLoading(true),
        onSettled: async () => {
            setLoading(false)
            setSuccess(true)
            await queryClient.invalidateQueries({
                queryKey: ['teacherExists']
            })
        },
        // mutationFn: () => setTeacherRequest(undefined, undefined, undefined, undefined, undefined, request, password)
        mutationFn: async () => {
            await deleteDoc(doc(db, 'teachers', teacher.id))
            await deleteDoc(doc(db, 'users', teacher.id))
            // const teacherStrpeCollection = collection(db, 'teacherStripe')
            // const teacherScheduleCollection = collection(db, 'teacherSchedule')
            // const coursesCollection = collection(db, 'courses')
            // const programsCollection = collection(db, 'programs')

            // const teacherPrograms = teacher.programs.map(async (program) => {
            //     const programCourses = await getDocs(query(coursesCollection, where('programId', '==', program)))

            //     const lessons = programCourses.docs.map(doc => (doc.data().lessons as []))
            //     const quizzes = programCourses.docs.map(doc => (doc.data().quizzes as []))
            //     const assessments = programCourses.docs.map(doc => (doc.data().assessments as []))

            //     const flattedLessons = lessons.flat()
            //     const flattedQuizzes = quizzes.flat()
            //     const flattedAssessments = assessments.flat()



            //     const deleteLessons = flattedLessons.map(async (lesson) => {
            //         await deleteDoc(doc(db, 'lessons', lesson))
            //     })

            //     const deleteQuizzes = flattedQuizzes.map(async (quiz) => {
            //         await deleteDoc(doc(db, 'quizzes', quiz))
            //     })

            //     const deleteAssessments = flattedAssessments.map(async (assessment) => {
            //         await deleteDoc(doc(db, 'assessments', assessment))
            //     })

            //     const deleteCourses = programCourses.docs.map(async (course) => {
            //         await deleteDoc(doc(db, 'courses', course.id))
            //     })

            //     await Promise.all(deleteLessons)
            //     await Promise.all(deleteQuizzes)
            //     await Promise.all(deleteAssessments)
            //     await Promise.all(deleteCourses)
            // })


        }
        // mutationFn: () => axios.post('http://localhost:3001/generate-teacher-account', { teacher }, { headers: { "Content-Type": "application/json" } })
    })

    useEffect(() => {
        if(success) setTimeout(() => setSuccess(false), 1000)
    }, [success])

    return (
        <Box
            display='flex'
            flexDirection='column'
            px={8}
            py={4}
            bgcolor='#FFFBF8'
            borderRadius='25px'
            flex={1}
            alignItems='center'
            justifyContent='space-between'
            boxShadow='0px 4px 6px 0px rgba(0, 0, 0, 0.25)'
        >
            <Stack
                direction='row'
                flex={1}
                width='100%'
                alignItems='center'
                justifyContent='space-between'
            >
                <Stack
                    direction='column'
                    gap={4} 
                >
                    <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={20}>{teacher.name}</Typography>
                    <Stack
                        direction='row'
                        gap={8}
                    >
                        <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{teacher.email}</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='column'
                    gap={4} 
                >
                    <Typography alignSelf='flex-end' noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{teacher.number}</Typography>
                    <Stack
                        direction='row'
                        height='35px'
                    >
                        {success && <Alert severity="success">Deleted Teacher Successfully!</Alert>}
                        <Button
                            sx={{
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                borderRadius: '10px',
                                paddingX: 1.5,
                                bgcolor: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '160px',
                                alignSelf: 'flex-end',
                                height: '38px'
                            }}
                            onClick={() => {
                                mutate()
                            }}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Dialog open={loading} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
                <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
            </Dialog>
        </Box>
    )
}
