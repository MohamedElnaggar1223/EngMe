import { Box, CircularProgress, MenuItem, Select, Stack } from "@mui/material";
import GradeCardQuiz from "./GradeCardQuiz";
import GradeCardAssessment from "./GradeCardAssessment";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { useContext, useMemo, useRef, useState } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getQuizzesData } from "../../../helpers/getQuizzesData";
import { getStudentQuizzes } from "../../../helpers/getStudentQuizzes";
import { getAssessmentsData } from "../../../helpers/getAssessmentsData";
import { getStudentAssessments } from "../../../helpers/getStudentAssessments";
import { ExpandMore } from "@mui/icons-material";
import QuestionDropDowns from "./QuestionDropDowns";
import Question from "./Question";

export default function Grades(program: ProgramProps) {
	//@ts-expect-error context
	const { userData } = useContext(AuthContext)
	const [questions, setQuestions] = useState('')
	const [selectQuestions, setSelectQuestions] = useState('All Questions')
	const [selectedQuiz, setSelectedQuiz] = useState('')
	const [selectedAssessment, setSelectedAssessment] = useState('')

	const scrollRef = useRef<HTMLDivElement>(null)

	const { data: quizzes, isLoading: quizzesLoading } = useQuery({
		queryKey: ['quizzes', program.id, 'currentCard', userData.id],
		queryFn: () => getQuizzesData(program.courses),
		enabled: !!program.courses,
		refetchOnMount: true
	})

	const { data: assessments, isLoading: assessmentsLoading } = useQuery({
		queryKey: ['assessments', program.id, 'currentCard', userData.id],
		queryFn: () => getAssessmentsData(program.courses),
		enabled: !!program.courses,
		refetchOnMount: true
	})

	const { data: studentQuizzes, isLoading: studentQuizzesLoading } = useQuery({
		queryKey: ['studentQuizzes', userData?.id, 'currentCard', program.id],
		//@ts-expect-error lesson
		queryFn: () => getStudentQuizzes(userData?.id, quizzes?.map(quiz => quiz.id)),
		enabled: !!quizzes
	})

	const { data: studentAssessment, isLoading: studentAssessmentsLoading } = useQuery({
		queryKey: ['studentAssessment', userData?.id, 'currentCard', program.id],
		//@ts-expect-error user
		queryFn: () => getStudentAssessments(userData?.id, assessments?.map(assessment => assessment.id)),
		enabled: !!assessments
	})

	//@ts-expect-error quiz
	function quizId({ quizId }) {
		return quizId
	}

	//@ts-expect-error quiz
	function assessmentId({ assessmentId }) {
		return assessmentId
	}

	const displayedQuestions = useMemo(() => {
		console.log(questions)
		if (questions.length && selectedQuiz) {
			const foundExam = quizzes?.find(exam => exam.id === selectedQuiz)

			console.log(studentQuizzes)
			console.log(questions)
			const foundStudentExam = studentQuizzes?.find(studentExam => studentExam?.id === questions)

			//@ts-expect-error value
			if (!foundStudentExam?.answers?.length) return
			//@ts-expect-error question
			const questionsDisplay = foundExam?.questions?.map((question, index) => (
				question.type === 'dropdowns' ?
					//@ts-expect-error question
					<QuestionDropDowns key={index} selectQuestions={selectQuestions} index={index} question={question} answer={foundStudentExam?.answers[index]} />
					:
					//@ts-expect-error question
					<Question key={index} selectQuestions={selectQuestions} index={index} question={question} answer={foundStudentExam?.answers[index]} />
			))
			return questionsDisplay
		}
		else if (questions.length && selectedAssessment) {
			const foundExam = assessments?.find(exam => exam.id === selectedAssessment)
			const foundStudentExam = studentAssessment?.find(studentExam => studentExam?.id === questions)
			//@ts-expect-error value
			if (!foundStudentExam?.answers?.length) return
			//@ts-expect-error question
			const questionsDisplay = foundExam?.questions?.map((question, index) => (
				question.type === 'dropdowns' ?
					//@ts-expect-error question
					<QuestionDropDowns key={index} selectQuestions={selectQuestions} index={index} question={question} answer={foundStudentExam?.answers[index]} />
					:
					//@ts-expect-error question
					<Question key={index} selectQuestions={selectQuestions} index={index} question={question} answer={foundStudentExam?.answers[index]} />
			))
			return questionsDisplay
		}
	}, [studentQuizzes, questions, selectQuestions, assessments, studentAssessment, selectedQuiz, selectedAssessment, quizzes])

	//@ts-expect-error quiz
	const organizedQuizzes = studentQuizzes ? Object.groupBy(studentQuizzes, quizId) : {}
	//@ts-expect-error quiz
	const organizedAssessments = studentAssessment ? Object.groupBy(studentAssessment, assessmentId) : {}

	//@ts-expect-error quiz
	const displayedQuizzes = Object.values(organizedQuizzes).map((quizzesArray, index) => <GradeCardQuiz index={index} key={index} questions={questions} setQuestions={setQuestions} setSelectedQuiz={setSelectedQuiz} quizzesArray={quizzesArray} />)
	//@ts-expect-error quiz
	const displayedAssessments = Object.values(organizedAssessments).map((assessmentsArray, index) => <GradeCardAssessment index={index} key={index} questions={questions} setQuestions={setQuestions} setSelectedAssessment={setSelectedAssessment} assessmentsArray={assessmentsArray} />)

	if (quizzesLoading || studentQuizzesLoading || assessmentsLoading || studentAssessmentsLoading) return <CircularProgress />
	return (
		<>
			<Box
				display='flex'
				gap={4}
				flexWrap='wrap'
				justifyContent='space-between'
			>
				{displayedQuizzes}
				{displayedAssessments}
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
									// defaultValue='All Questions'
									value={selectQuestions}
									onChange={(e) => setSelectQuestions(e.target.value)}
								>
									<MenuItem value='All Questions'>All Questions</MenuItem>
									<MenuItem value='Correct Questions'>Correct Questions</MenuItem>
									<MenuItem value='Wrong Questions'>Wrong Questions</MenuItem>
								</Select>
							</Stack>
							{displayedQuestions}
							<div ref={scrollRef}></div>
						</>
					}
				</Box>
			}
		</>
	)
}
