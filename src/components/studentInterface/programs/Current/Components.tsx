import { Box } from "@mui/material";
import ComponentCard from "./ComponentCard";

export default function Components() {
  return (
    <Box
        gap={1.5}
        display='flex'
        flexDirection='column'
        flex={1}
        alignItems='center'
        justifyContent='center'
        alignSelf='stretch'
        width='auto'
    >
        <ComponentCard />
        <ComponentCard Quiz={true} />
        <ComponentCard />
        <ComponentCard />
    </Box>
  )
}
