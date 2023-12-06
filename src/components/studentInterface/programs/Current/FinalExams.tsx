import { Box, MenuItem, Select, Stack } from "@mui/material";
import FinalExamCard from "./FinalExamCard";
import Question from "./Question";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { getProgramFinalExams } from "../../../helpers/getProgramFinalExams";
import { getStudentProgramFinalExams } from "../../../helpers/getStudentProgramFinalExams";
import QuestionDropDowns from "./QuestionDropDowns";

interface FinalExamsProps{
	program: ProgramProps,
	progress: number
}

export default function FinalExams({progress, program}: FinalExamsProps) 
{
	//@ts-expect-error context
	const { userData } = useContext(AuthContext)
	const [questions, setQuestions] = useState('')

	const { data: finalExams, isLoading: isFinalExamsLoading } = useQuery({
		queryKey: ['finalExams', program.id],
		queryFn: () => getProgramFinalExams(program.id)
	})

	const { data: studentFinalExams, isLoading: isStudentFinalExamsLoading } = useQuery({
		queryKey: ['finalExams', program.id, userData.id],
		queryFn: () => getStudentProgramFinalExams(userData.id, Object.values(program?.finalExams ?? ['']))
	})

	//@ts-expect-error finalExams
	const sortedVersions = Object.keys(program?.finalExams).sort((a, b) => Number(a.split(" ")[1]) - Number(b.split(" ")[1]))

	const displayedFinalExams = program?.finalExams ? sortedVersions.map((version: string) => {
		//@ts-expect-error program
		const versionExam = finalExams?.find(exam => exam.id === program?.finalExams[version])
		//@ts-expect-error program
		const foundExam = studentFinalExams?.find(studentFinalExam => (finalExams?.map(exam => exam.id))?.includes(studentFinalExam.finalExamId) && versionExam?.id === studentFinalExam.finalExamId)
		const card =
		progress !== 100 ?
		//@ts-expect-error finalExams
		<FinalExamCard program={program} version={version} finalExam={versionExam} disabled={true} /> :
		foundExam ?
		//@ts-expect-error finalExams
		<FinalExamCard program={program} version={version} finalExam={versionExam} setQuestions={setQuestions} questions={questions} foundExam={foundExam} /> :
		//@ts-expect-error finalExams
		<FinalExamCard program={program} version={version} finalExam={versionExam} />
		return card
	}) : []

	const displayedQuestions = useMemo(() => {
		if(questions.length)
		{
			const foundExam = finalExams?.find(exam => exam.id === questions)
			//@ts-expect-error question
			const foundStudentExam = studentFinalExams?.find(studentExam => studentExam?.finalExamId === questions)
			//@ts-expect-error question
			const questionsDisplay = foundExam?.questions?.map((question, index) => (
				question.type === 'dropdowns' ?
				//@ts-expect-error question
				<QuestionDropDowns index={index} question={question} answer={foundStudentExam?.answers[index]} />
				:
				//@ts-expect-error question
				<Question index={index} question={question} answer={foundStudentExam?.answers[index]} />
			))
			return questionsDisplay
		}
	}, [finalExams, studentFinalExams, questions])  

	if(isFinalExamsLoading || isStudentFinalExamsLoading) return <></>
	return (
		<>
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='space-between'
			>
				{displayedFinalExams}
			</Box>
			{
				
				<Box
					flex={1}
					display='flex'
					flexDirection='column'
					gap={2}
					mt={6}
					width='auto'
				>
					{
						questions &&
						<>
						<Stack
							flex={1}
							alignItems='flex-end'
							justifyContent='center'
						>
							<Select
								sx={{
									width: '200px !important',
									height: '45px !important',
									boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
									borderRadius: '5px !important',
									outline: 'none !important',
									boxSizing: 'border-box !important',
									background: '#D0EBFC',
									paddingX: 1,
									paddingY: 0.5,
									'&:hover': {
										boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
										background: '#D0EBFC',
									}, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'left', textIndent: '5px'
									
								}}
								IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)', paddingLeft: 1, height: '100%', zIndex: 1, position: 'absolute', left: '80%' }} />}
								inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
								variant='standard'
								disableUnderline
								defaultValue='All Questions'
							>
								<MenuItem value='All Questions'>All Questions</MenuItem>
							</Select>
						</Stack>
							{displayedQuestions}
						</>
					}
				</Box>
			}
		</>
	)
}
