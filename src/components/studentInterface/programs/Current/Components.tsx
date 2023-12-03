import { Box } from "@mui/material";
import ComponentCard from "./ComponentCard";
import { useQuery } from "@tanstack/react-query";
import { getCoursesData } from "../../../helpers/getCoursesData";
import ProgramProps from "../../../../interfaces/ProgramProps";

export default function Components(program: ProgramProps) 
{
	// const queryClient = useQueryClient()
    const { data: courses } = useQuery({
        queryKey: ['courses', program?.id],
        queryFn: () => getCoursesData(program),
        refetchOnMount: true,
        enabled: !!program.id
    })
    // if(queryClient.isFetching({ queryKey: ['courses', programId] })) return <></>
	// const courses = queryClient.getQueryData(['courses', programId])
	//@ts-expect-error course
	const displayedCourses = courses?.map(course => <ComponentCard {...course} />)

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
