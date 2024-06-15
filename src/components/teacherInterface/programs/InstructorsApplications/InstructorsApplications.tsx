import { useQuery} from "@tanstack/react-query"
import { getTeacherRequest } from "../../../helpers/getTeacherRequest"
import InstructorsApplicationsRequest from './InstructorApplicatiosRequest'
import { Stack, Typography } from "@mui/material"
import { getTeacherFirstLogins } from "../../../helpers/getTeacherFirstLogins"
import InstructorsApplicationsRequestFirstLogin from "./InstructorsApplicationsRequestFirstLogin"
import { db } from "../../../../firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import InstructorExisting from "./InstructorExisting"

export default function InstructorsApplications() 
{
    const { data: teacherRequests, isLoading: requestsIsLoading } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: () => getTeacherRequest()
    })

    const { data: teacherFirstLogins, isLoading } = useQuery({
        queryKey: ['teacherFirstLogins'],
        queryFn: () => getTeacherFirstLogins()
    })

    const { data: teacherExists } = useQuery({
        queryKey: ['teacherExists'],
        queryFn: async () => {
            const teachersCollection = collection(db, 'teachers')
            const teachersDocs = await getDocs(teachersCollection)

            const restIds = (teacherRequests as [] | null)?.map((request: {email: string}) => request.email)

            const teachersData = teachersDocs.docs.map(doc => ({...doc.data(), id: doc.id})) as {
                id: string, 
                name: string, 
                email: string, 
                number: string,
            }[]
            return teachersData.filter((teacher: {id:string, email: string}) => !restIds?.includes(teacher.email))
        },
        enabled: !requestsIsLoading && !isLoading
    })

    //@ts-expect-error map
    const displayedRequests = teacherRequests && teacherRequests.map((request: {id: string, name: string, email: string, number: string, cv: string, why: string}) => (
        <InstructorsApplicationsRequest key={request.id} {...request} />
    ))


    const displayedRequestsLogins = teacherFirstLogins && teacherFirstLogins.map(teacher => (
        //@ts-expect-error teacher
        <InstructorsApplicationsRequestFirstLogin key={teacher.id} {...teacher} />
    ))

    const displayedExistingTeachers = teacherExists && teacherExists.map((teacher: {
        id: string, 
        name: string, 
        email: string, 
        number: string,
    }) => (
        <InstructorExisting key={teacher.id} {...teacher} />
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
            {(displayedExistingTeachers?.length ?? 0) > 0 && <Typography fontSize={24} fontWeight={600} fontFamily='Inter' color='#000'>Existing Teachers ({displayedExistingTeachers?.length})</Typography>}
                {displayedExistingTeachers}
        </Stack>
    )
}
