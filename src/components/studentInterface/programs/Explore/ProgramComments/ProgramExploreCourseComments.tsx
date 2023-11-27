import { Stack } from "@mui/material";
import Comment from './Comment'
import AddComment from "./AddComment";

export default function ProgramExploreCourseComments() 
{
    return (
        <Stack
            flex={1}
            mx={10}
            bgcolor='rgba(208, 235, 252, 0.50)'
            borderRadius='15px'
            overflow='hidden'
            minHeight='260px'
        >
            <Comment />
            <Comment />
            <Comment />
            <AddComment />
        </Stack>
    )
}
