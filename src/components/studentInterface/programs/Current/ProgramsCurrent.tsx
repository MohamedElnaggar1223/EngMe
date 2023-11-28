import { Box } from "@mui/material";
import ProgramCurrentCard from "./ProgramCurrentCard";


export default function ProgramsCurrent() {
	return (
		<Box
			px={4}
			py={4}
			display='flex'
			flex={1}
			alignItems='stretch'
			flexDirection='column'
			gap={6}
		>
			<ProgramCurrentCard />
			<ProgramCurrentCard Request={true} />
			<ProgramCurrentCard />
			<ProgramCurrentCard />
		</Box>
	)
}
