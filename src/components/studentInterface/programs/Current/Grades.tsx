import { Box } from "@mui/material";
import GradeCard from "./GradeCard";

export default function Grades() {
  return (
    <Box
        display='flex'
        gap={4}
        flexWrap='wrap'
        justifyContent='space-between'
    >
        <GradeCard />
        <GradeCard />
        <GradeCard />
    </Box>
  )
}
