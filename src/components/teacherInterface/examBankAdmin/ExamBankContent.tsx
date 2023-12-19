// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import { getExamBankContent } from "../../helpers/getExamBankContent"

interface ExamBankContentProps{
    id: string,
    major: string,
    content: string[]
}

export default function ExamBankContent({ id }: ExamBankContentProps) 
{
    console.log(id)
    // const queryClient = useQueryClient()

    // const { data: examBankContent } = useQuery({
    //     queryKey: ['examBankContent', id],
    //     queryFn: () => getExamBankContent(id)
    // })

    return (
        <div>ExamBankContent</div>
    )
}
