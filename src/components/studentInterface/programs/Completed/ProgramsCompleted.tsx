import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useContext } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { getStudentCompletedPrograms } from "../../../helpers/getStudentCompletedPrograms";
const ProgramCurrentCard = lazy(() => import("../Current/ProgramCurrentCard"))

export default function ProgramsCompleted() 
{
	//@ts-expect-error context
	const { userData } = useContext(AuthContext)

	const { data: completedPrograms } = useQuery({
		queryKey: ['completedPrograms', userData.id],
		queryFn: () => getStudentCompletedPrograms(userData.id)
	})
	
	const displayedPrograms = completedPrograms?.map(program => (
			<Suspense key={program.id}>
				<ProgramCurrentCard completed={true} program={program} />
			</Suspense>
	))

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
