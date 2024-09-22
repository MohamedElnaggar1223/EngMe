import { lazy, Suspense, useContext } from "react";
import { Box } from "@mui/material";
const ComponentCard = lazy(() => import("./ComponentCard"))
import { useQuery } from "@tanstack/react-query";
import { getCoursesData } from "../../../helpers/getCoursesData";
import ProgramProps from "../../../../interfaces/ProgramProps";
import CourseProps from "../../../../interfaces/CourseProps";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { getStudentCourseData } from "../../../helpers/getStudentCourseData";

export default function Components(program: ProgramProps) 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
	// const queryClient = useQueryClient()
    const { data: courses, isLoading } = useQuery({
        queryKey: ['courses', program?.id],
        queryFn: () => getCoursesData(program),
        refetchOnMount: true,
        enabled: !!program.id
    })

    console.log(userData)

    const { data: studentCourses, isLoading: studentCourseLoading } = useQuery({
        queryKey: ['studentCourse'],
        //@ts-expect-error undefined
        queryFn: () => getStudentCourseData(userData.id, program?.courses),
        refetchOnMount: true,
        enabled: !!program.id
    })
    ////console.log(courses)
    // if(queryClient.isFetching({ queryKey: ['courses', programId] })) return <></>
	// const courses = queryClient.getQueryData(['courses', programId])
    //console.log(studentCourses)
    console.log(studentCourses)
	const displayedCourses = ((!isLoading && !studentCourseLoading) && courses?.map((course, index) => {  
        if(index === 0)
        {
            return (
                <Suspense key={index}>
                    <ComponentCard index={index} course={course as CourseProps} />
                </Suspense>
            )
        }
        else
        {
            if(studentCourses?.length === 0) 
            {
                return(
                    <Suspense key={index}>
                        <ComponentCard disabled={true} index={index} course={course as CourseProps} />
                    </Suspense>
                )
            }
            //@ts-expect-error tserr
            const completedCourses = courses.slice(0, index - 1).every(course => studentCourses?.map(studentCourse => studentCourse?.courseId)?.includes(course.id))
            console.log(completedCourses)
            if(completedCourses)
            {
                return (
                    <Suspense key={index}>
                        <ComponentCard index={index} course={course as CourseProps} />
                    </Suspense>
                )
            }
            else
            {
                return (
                    <Suspense key={index}>
                        <ComponentCard disabled={true} index={index} course={course as CourseProps} />
                    </Suspense>
                )
            }
        }
    })) ?? []

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
          {displayedCourses}
      </Box>
    )
}
