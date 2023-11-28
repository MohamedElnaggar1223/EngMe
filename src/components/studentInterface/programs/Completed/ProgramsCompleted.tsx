import { Box } from "@mui/material";
import { Suspense, lazy } from "react";
const ProgramCompletedCard = lazy(() => import("./ProgramsCompletedCard"))


export default function ProgramsCompleted() 
{
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
				<ProgramCompletedCard />
			</Suspense>
			<Suspense>
				<ProgramCompletedCard />
			</Suspense>
			<Suspense>
				<ProgramCompletedCard />
			</Suspense>
			<Suspense>
				<ProgramCompletedCard />
			</Suspense>
			<Suspense>
				<ProgramCompletedCard />
			</Suspense>
		</Box>
	)
}
