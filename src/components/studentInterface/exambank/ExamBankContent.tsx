import { Grid } from "@mui/material";
import ExamBankCard from "./ExamBankCard";
import { getExamBankContent } from "../../helpers/getExamBankContent";
import { useQuery } from "@tanstack/react-query";

type ExamBankContentType = {
    id: string
}

export default function ExamBankContent({id}: ExamBankContentType) 
{
    const { data: examBankContent } = useQuery({
        queryKey: ['examBankContent', id],
        queryFn: () => getExamBankContent(id)
    })

    const displayedContent = examBankContent?.map(ebContent => (
        <Grid item xs={8} key={ebContent.id}>
            {/*//@ts-expect-error content*/}
            <ExamBankCard key={ebContent.id} ebContent={ebContent} />
        </Grid>
    ))

    return (
        // <Stack
        //     flexWrap='wrap'
        //     flexDirection='row'
        //     p={16}
        //     justifyContent='space-evenly'
        //     gap={12}
        // >
        //     {displayedContent}
        // </Stack>
        <Grid container spacing={2} justifyContent='space-between' alignItems='center' columns={16}>
            {displayedContent}
        </Grid>
    )
}
