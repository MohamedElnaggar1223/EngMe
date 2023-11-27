import { Box } from "@mui/material";
import ComponentCard from "./ComponentCard";

export default function Components() {
  return (
    <Box
        gap={1.5}
        display='flex'
        flexDirection='column'
    >
        <ComponentCard />
        <ComponentCard Quiz={true} />
        <ComponentCard />
        <ComponentCard />
    </Box>
  )
}
