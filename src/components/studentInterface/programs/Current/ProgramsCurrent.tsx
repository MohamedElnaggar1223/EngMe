import { Box } from "@mui/material";
import ProgramCurrentCard from "./ProgramCurrentCard";


export default function ProgramsCurrent() {
	return (
		<Box
			p={4}
			display='flex'
			alignItems='center'
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
