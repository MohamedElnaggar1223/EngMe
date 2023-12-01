import { Box } from "@mui/material";
import { Suspense, lazy } from "react";
import ProgramCurrentExpired from "./ProgramCurrentExpired";
const ProgramCurrentCard = lazy(() => import("./ProgramCurrentCard"))


export default function ProgramsCurrent({ currentPrograms }) {
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
			<Suspense>
				<ProgramCurrentCard />
			</Suspense>
			<Suspense>
				<ProgramCurrentExpired />
			</Suspense>
			<Suspense>
				<ProgramCurrentCard Request={true} />
			</Suspense>
			<Suspense>
				<ProgramCurrentCard />
			</Suspense>
			<Suspense>
				<ProgramCurrentCard />
			</Suspense>
		</Box>
	)
}
