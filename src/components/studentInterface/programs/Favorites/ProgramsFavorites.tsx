import { Stack } from "@mui/material";
import { Suspense, lazy, useContext } from "react";
const ProgramExploreCard = lazy(() => import("../Explore/ProgramExploreCard"))
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { getProgramsData } from "../../../helpers/getProgramsData";
import { useQuery } from "@tanstack/react-query";
import { getStudentCurrentPrograms } from "../../../helpers/getStudentCurrentPrograms";

export default function ProgramsFavorites() {
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: programsData } = useQuery({
        queryKey: ['favoritePrograms', userData?.id],
        queryFn: () => getProgramsData(userData.favoritePrograms),
        enabled: !!userData
    })

    const { data: currentPrograms } = useQuery({
        queryKey: ['currentPrograms', userData?.id],
        queryFn: () => getStudentCurrentPrograms(userData.id),
        enabled: !!userData?.id
    })

    const displayedPrograms = programsData?.map(program => (
        <Suspense key={program.id}>
            <div onClick={() => currentPrograms?.find(p => p.id === program.id) ? window.location.replace(`/programs/current/${program.id}`) : window.location.replace(`/programs/explore/${program.id}`)}>
                <ProgramExploreCard program={program} />
            </div>
        </Suspense>
    ))

    return (
        <Stack
            direction='row'
            justifyContent='flex-start'
            my={8}
            gap={4}
            flexWrap='wrap'
        >
            {displayedPrograms}
        </Stack>
    )
}
