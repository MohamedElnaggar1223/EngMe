import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import ExamQuestionOptions from "./ExamQuestionOptions";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebaseConfig";
import { getExamSession } from "../../../helpers/getExamSession";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import ExamQuestionSelects from "./ExamQuestionSelects";
import ExamQuestionTwoOptions from "./ExamQuestionTwoOptions";
import ExamFiveQuestionThreeOptions from "./ExamFiveQuestionThreeOptions";


export default function Troubleshoot() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: examSession, isLoading } = useQuery({
        queryKey: ['examSession'],
        queryFn: () => getExamSession(userData.id)
    })

    const { id } = useParams()

    const getTroubleshoot = async (id: string) => {
        const troubleshootRef = doc(db, 'troubleshoot', id)
        const troubleshootDoc = await getDoc(troubleshootRef)

        const troubleshootData = {...troubleshootDoc.data(), id: troubleshootDoc.id}

        return troubleshootData
    }

    const { data: troubleshoot } = useQuery({
        queryKey: ['examSessionTroubleshoot'],
        queryFn: () => getTroubleshoot(id ?? '')
    })
    //@ts-expect-error errrrr
    const displayedQuestions = troubleshoot?.questions?.map((question, index) => 
        question.type === 'options' ?
        question.correctOption.length > 1 ?
        //@ts-expect-error errrrr
        <ExamQuestionTwoOptions troubleshootId={troubleshoot.id} question={question} index={index} total={troubleshoot?.questions?.length} /> :
        //@ts-expect-error errrrr
        <ExamQuestionOptions troubleshootId={troubleshoot.id} question={question} index={index} total={troubleshoot?.questions?.length} /> :
        question.type === 'fiveOptions' ?
        question.correctOption.length > 2 ?
        //@ts-expect-error errrrr
        <ExamFiveQuestionThreeOptions troubleshootId={troubleshoot.id} question={question} index={index} total={troubleshoot?.questions?.length} /> :
        question.correctOption.length > 1 ?
        //@ts-expect-error errrrr
        <ExamQuestionTwoOptions troubleshootId={troubleshoot.id} question={question} index={index} total={troubleshoot?.questions?.length} /> :
        //@ts-expect-error errrrr
        <ExamQuestionOptions troubleshootId={troubleshoot.id} question={question} index={index} total={troubleshoot?.questions?.length} /> :
        //@ts-expect-error errrrr
        <ExamQuestionSelects troubleshootId={troubleshoot.id} question={question} index={index} total={troubleshoot?.questions?.length} />
    )

    if(isLoading) return <></>

    return (
        <Box
            width='100%'
        >
            <Stack
                justifyContent='space-between'
                direction='row'
            >
                <Stack
                    direction='column'
                    bgcolor='#D0EBFC'
                    px={12}
                    py={4}
                >
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={800}>Troubleshoot</Typography>
                    <Typography sx={{ color: '#FF7E00' }} fontSize={16} fontFamily='Inter' fontWeight={600}>Course 3</Typography>
                </Stack>
            </Stack>
            <Box
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                {
                    //@ts-expect-error lastQuestion
                    displayedQuestions?.length && displayedQuestions[Number(examSession[0]?.lastQuestion)]
                }
            </Box>
        </Box>
    )
}
