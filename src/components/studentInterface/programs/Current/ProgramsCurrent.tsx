import { Box } from "@mui/material";
import { Suspense, lazy, useContext, useEffect, useRef } from "react";
import ProgramCurrentExpired from "./ProgramCurrentExpired";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useParams } from "react-router-dom";
const ProgramCurrentCard = lazy(() => import("./ProgramCurrentCard"))

export default function ProgramsCurrent() 
{
	const queryClient = useQueryClient()

	const programRef = useRef(null)

	const { id } = useParams()

	//@ts-expect-error context
	const { userData } = useContext(AuthContext)
	const currentPrograms = queryClient.getQueryData(['currentPrograms', userData?.id])
	//@ts-expect-error program
	const displayedPrograms = currentPrograms.map(program => {
		const programDisplay = program.expired ?
		(
			<Suspense key={program.id}>
				<div ref={id ? program.id === id ? programRef : null : null}>
					<ProgramCurrentExpired {...program} />
				</div>
			</Suspense>
		)
		:
		(
			<Suspense key={program.id}>
				<div ref={id ? program.id === id ? programRef : null : null}>
					<ProgramCurrentCard program={program} />
				</div>
			</Suspense>
		)
		return programDisplay
	})

	useEffect(() => {
		//@ts-expect-error scrollIntoView
		if(id) programRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [programRef, id])

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
