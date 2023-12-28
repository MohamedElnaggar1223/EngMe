import { useQuery } from "@tanstack/react-query"
import { getPrograms } from "../../../helpers/getPrograms"
import ProgramProps from "../../../../interfaces/ProgramProps"
import ProgramPriceCard from "./ProgramPriceCard"
import { Stack } from "@mui/material"

export default function ProgramsPriceShare() 
{
    const { data: programs } = useQuery({
        queryKey: ['programs'],
        queryFn: () => getPrograms()
    })

    const displayedPrograms = programs?.map((program: ProgramProps) => (
        <ProgramPriceCard {...program} />
    ))

    return (
        <Stack
            flex={1}
            mx={14}
            direction='column'
            my={4}
            gap={6}
        >
            {displayedPrograms}
        </Stack>
    )
}
