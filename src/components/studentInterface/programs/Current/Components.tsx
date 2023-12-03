import { lazy, Suspense } from "react";
import { Box } from "@mui/material";
const ComponentCard = lazy(() => import("./ComponentCard"))
import { useQuery } from "@tanstack/react-query";
import { getCoursesData } from "../../../helpers/getCoursesData";
import ProgramProps from "../../../../interfaces/ProgramProps";
import CourseProps from "../../../../interfaces/CourseProps";

export default function Components(program: ProgramProps) 
{
	// const queryClient = useQueryClient()
    const { data: courses, isLoading } = useQuery({
        queryKey: ['courses', program?.id],
        queryFn: () => getCoursesData(program),
        refetchOnMount: true,
        enabled: !!program.id
    })
    //console.log(courses)
    // if(queryClient.isFetching({ queryKey: ['courses', programId] })) return <></>
	// const courses = queryClient.getQueryData(['courses', programId])
	const displayedCourses = (!isLoading && courses?.map((course, index) => (
        <Suspense>
            <ComponentCard index={index} course={course as CourseProps} />
        </Suspense>
    ))) ?? []

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
