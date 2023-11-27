import { Stack } from "@mui/material";
import ProgramExploreCard from "../Explore/ProgramExploreCard";

export default function ProgramsFavorites() {
    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            my={8}
            gap={4}
            flexWrap='wrap'
        >
            <ProgramExploreCard />
            <ProgramExploreCard />
            <ProgramExploreCard />
            <ProgramExploreCard />
        </Stack>
    )
}
