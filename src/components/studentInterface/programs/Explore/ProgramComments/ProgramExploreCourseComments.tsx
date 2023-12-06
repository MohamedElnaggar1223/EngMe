import { Stack } from "@mui/material";
import Comment from './Comment'
import AddComment from "./AddComment";
import { useQuery } from "@tanstack/react-query";
import ProgramProps from "../../../../../interfaces/ProgramProps";
import { getProgramComments } from "../../../../helpers/getProgramComments";

interface ProgramExploreCourseComments{
    program: ProgramProps,
    NoAdd?: boolean
}

export default function ProgramExploreCourseComments({program, NoAdd}: ProgramExploreCourseComments) 
{
    const { data: programComments } = useQuery({
        queryKey: ['programComments', program.id],
        queryFn: () => getProgramComments(program.id)
    })

    //@ts-expect-error comment
    const displayedComments = programComments?.map(comment => <Comment {...comment} />) ?? []

    return (
        <Stack
            flex={1}
            mx={10}
            bgcolor='rgba(208, 235, 252, 0.50)'
            borderRadius='15px'
            overflow='hidden'
            minHeight='260px'
        >
            {displayedComments}
            {!NoAdd && <AddComment {...program} />}
        </Stack>
    )
}
