import { Box } from "@mui/material";
import ProgramCurrentCard from "./ProgramCurrentCard";


export default function ProgramsCurrent() {
	return (
		<Box
			p={4}
		>
			<ProgramCurrentCard />
			<ProgramCurrentCard Request={true} />
			<ProgramCurrentCard />
			<ProgramCurrentCard />
		</Box>
	)
}
