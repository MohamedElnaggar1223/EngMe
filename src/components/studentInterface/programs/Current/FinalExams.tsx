import { Box, MenuItem, Select, Stack } from "@mui/material";
import FinalExamCard from "./FinalExamCard";
import { createContext, useState } from "react";
import Question from "./Question";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface ContextProps{
	questions: boolean,
	setQuestions: React.Dispatch<React.SetStateAction<boolean>>
}

export const QuestionsContext = createContext<ContextProps | null>(null)

export default function FinalExams() 
{
	const [questions, setQuestions] = useState(false)

	return (

		<QuestionsContext.Provider value={{ questions, setQuestions }}>
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='space-between'
			>
				<FinalExamCard showQuestions />
				<FinalExamCard />
				<FinalExamCard disabled />
			</Box>
			{
				questions &&
				<Box
					flex={1}
					display='flex'
					flexDirection='column'
					gap={2}
					mt={6}
					width='auto'
				>
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
							// inputProps={{ style: { borderRight: '1px solid rgba(0, 0, 0, 1)', width: '100%' } }}
                            variant='standard'
                            disableUnderline
							defaultValue='All Questions'
						>
							<MenuItem value='All Questions'>All Questions</MenuItem>
						</Select>
					</Stack>
					<Question />
					<Question second />
				</Box>
			}
		</QuestionsContext.Provider>
	)
}
