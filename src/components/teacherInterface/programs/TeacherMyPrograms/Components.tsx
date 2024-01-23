import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
const ComponentCard = lazy(() => import("./ComponentCard"))
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoursesData } from "../../../helpers/getCoursesData";
import ProgramProps from "../../../../interfaces/ProgramProps";
import CourseProps from "../../../../interfaces/CourseProps";
import { setCourseData } from "../../../helpers/setCourseData";

function Components(program: ProgramProps) 
{
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(Infinity)

    const queryClient = useQueryClient()

    const { data: courses, isLoading } = useQuery({
        queryKey: ['courses', program?.id],
        queryFn: () => getCoursesData(program),
        refetchOnMount: false,
        enabled: !!program.id,
        refetchInterval: timer
    })

    useEffect(() => {
        setTimer(Infinity)
        setLoading(false)
    }, [courses])

    const displayedCourses = !isLoading && courses?.map((course, index) => 
        <Suspense>
            <ComponentCard index={index} course={course as CourseProps} />
        </Suspense>
    )

    const { mutateAsync } = useMutation({
        onMutate: () => {
            // const previousData = queryClient.getQueryData(['courses', program?.id])

            // queryClient.setQueryData(['courses', program?.id], (oldData: unknown) => {
            //     //@ts-expect-error oldData
            //     return [...oldData, { assessments: [], lessons: [], quizzes: [], duration: '0 Hours', programId: program.id, createdAt: Timestamp.now() }]
            // })

            // return () => queryClient.setQueryData(['courses', program?.id], previousData)
            setLoading(true)
        },
        onSuccess: async (data) => {
            if(data) {
                setLoading(false)
                queryClient.setQueryData(['courses', program?.id], courses ? [...courses, data] : [data])
            }
        },
        mutationFn: async () => await setCourseData(program)
    })

    async function handleMutate() {
        await mutateAsync()
    }

    return (
        <Box
          gap={1.5}
          display='flex'
          flexDirection='column'
          flex={1}
          alignItems='center'
          justifyContent='center'
          alignSelf='stretch'
          width='auto'
        >
            <Stack
                flex={1}
                alignItems='flex-end'
                justifyContent='center'
                my={2}
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
                    disabled={loading}
                >
                    <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    <Typography onClick={handleMutate} fontFamily='Inter' fontSize={14}>Add a New Course</Typography>
                </Button>
            </Stack>
            {displayedCourses}
        </Box>
    )
}

const memoizedComponents = memo(Components)
export default memoizedComponents