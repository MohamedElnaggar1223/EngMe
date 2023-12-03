import { Box } from "@mui/material";
import ComponentCard from "./ComponentCard";
import { useQueryClient } from "@tanstack/react-query";

export default function Components({ programId }: { programId: string }) 
{
	const queryClient = useQueryClient()
	const courses = queryClient.getQueryData(['courses', programId])
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
