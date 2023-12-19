import { useQuery} from "@tanstack/react-query"
import { getTeacherRequest } from "../../../helpers/getTeacherRequest"
import InstructorsApplicationsRequest from './InstructorApplicatiosRequest'
import { Stack } from "@mui/material"

export default function InstructorsApplications() 
{
    const { data: teacherRequests } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: () => getTeacherRequest()
    })

    //@ts-expect-error map
    const displayedRequests = teacherRequests && teacherRequests.map((request: {id: string, name: string, email: string, number: string}) => (
        <InstructorsApplicationsRequest {...request} />
    ))

    return (
        <Stack
            flex={1}
            mx={14}
            direction='column'
            my={4}
            gap={6}
        >
            {displayedRequests}
        </Stack>
    )
}
