import { useQuery} from "@tanstack/react-query"
import { getTeacherRequest } from "../../../helpers/getTeacherRequest"
import InstructorsApplicationsRequest from './InstructorApplicatiosRequest'
import { Stack, Typography } from "@mui/material"
import { getTeacherFirstLogins } from "../../../helpers/getTeacherFirstLogins"
import InstructorsApplicationsRequestFirstLogin from "./InstructorsApplicationsRequestFirstLogin"

export default function InstructorsApplications() 
{
    const { data: teacherRequests } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: () => getTeacherRequest()
    })

    const { data: teacherFirstLogins } = useQuery({
        queryKey: ['teacherFirstLogins'],
        queryFn: () => getTeacherFirstLogins()
    })

    //@ts-expect-error map
    const displayedRequests = teacherRequests && teacherRequests.map((request: {id: string, name: string, email: string, number: string, cv: string, why: string}) => (
        <InstructorsApplicationsRequest {...request} />
    ))


    const displayedRequestsLogins = teacherFirstLogins && teacherFirstLogins.map(teacher => (
        //@ts-expect-error teacher
        <InstructorsApplicationsRequestFirstLogin {...teacher} />
    ))

    return (
        <Stack
            flex={1}
            mx={14}
            direction='column'
            my={4}
            gap={6}
        >
            {(displayedRequestsLogins?.length ?? 0 > 0) && <Typography fontSize={24} fontWeight={600} fontFamily='Inter' color='#000'>Accepted Applications ({displayedRequestsLogins?.length})</Typography>}
                {displayedRequestsLogins}
            {displayedRequests?.length > 0 && <Typography fontSize={24} fontWeight={600} fontFamily='Inter' color='#000'>Pending Applications ({displayedRequests?.length})</Typography>}
                {displayedRequests}
        </Stack>
    )
}
