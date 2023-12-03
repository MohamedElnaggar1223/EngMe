import { Box } from "@mui/material";
import { Suspense, lazy, useContext } from "react";
import ProgramCurrentExpired from "./ProgramCurrentExpired";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
const ProgramCurrentCard = lazy(() => import("./ProgramCurrentCard"))

export default function ProgramsCurrent() 
{
	const queryClient = useQueryClient()
	//@ts-expect-error context
	const { userData } = useContext(AuthContext)
	const currentPrograms = queryClient.getQueryData(['currentPrograms', userData?.id])
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
