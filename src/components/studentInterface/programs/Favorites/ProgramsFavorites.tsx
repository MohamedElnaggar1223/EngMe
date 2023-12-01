import { Stack } from "@mui/material";
import ProgramExploreCard from "../Explore/ProgramExploreCard";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { getProgramsData } from "../../../helpers/getProgramsData";
import { useQuery } from "@tanstack/react-query";

export default function ProgramsFavorites() {
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: programsData } = useQuery({
        queryKey: ['favoritePrograms', userData?.id],
        queryFn: () => getProgramsData(userData.favoritePrograms),
        enabled: !!userData
    })

    const displayedPrograms = programsData?.map(program => <ProgramExploreCard program={program} />)

    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            my={8}
            gap={4}
            flexWrap='wrap'
        >
            {displayedPrograms}
        </Stack>
    )
}
