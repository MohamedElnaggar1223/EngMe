import { Box } from "@mui/material";
import { Suspense, lazy } from "react";
import ProgramCurrentExpired from "./ProgramCurrentExpired";
const ProgramCurrentCard = lazy(() => import("./ProgramCurrentCard"))

//@ts-expect-error aaa
export default function ProgramsCurrent({ currentPrograms }) 
{
	console.log(currentPrograms)
	//@ts-expect-error program
	const displayedPrograms = currentPrograms.map(program => {
		program.expired ?
		(
			<Suspense>
				<ProgramCurrentExpired {...program} />
			</Suspense>
		)
		:
		(
			<Suspense>
				<ProgramCurrentCard {...program} />
			</Suspense>
		)
	})

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
			{displayedPrograms}
		</Box>
	)
}
