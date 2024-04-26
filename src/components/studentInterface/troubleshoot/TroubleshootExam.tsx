import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../../authentication/auth/AuthProvider"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"
import { TroubleshootExam as TroubleshootExamType } from "../../../interfaces/TroubleshootExam"
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { setStudentTroubleshoot } from "../../helpers/setStudentTroubleshoot"

export default function TroubleshootExam() 
{
    //@ts-expect-error authContext
    const { userData } = useContext(AuthContext)

    const { data: troubleshoot, isLoading } = useQuery({
        queryKey: ['troubleshoot', userData],
        queryFn: async () => {
            const troubleshootref = collection(db, 'troubleshoot')
            const troubleshootquery = query(troubleshootref, where('studentId', '==', userData?.id))
            const troubleshootdocs = await getDocs(troubleshootquery)
            if(troubleshootdocs.docs.length === 0) return null
            return {...troubleshootdocs.docs[0].data(), id: troubleshootdocs.docs[0].id} as TroubleshootExamType
        }
    })

    const navigate = useNavigate()

    const handleStudentTroubleshoot = async (troubleshootId: string) => {
        await setStudentTroubleshoot(userData?.id, troubleshootId)
        navigate(`/troubleshootexam/${troubleshootId}`)
    }

    if(isLoading) return (
        <section className='flex w-full items-center justify-center'>
            <CircularProgress />
        </section>
    
    )
    if(!troubleshoot || troubleshoot.questions.length === 0) return (
        <section className='flex w-full items-center justify-center h-[70vh]'>
            <h1 className='font-semibold text-4xl font-[Inter]'>You have no Troubleshoot Exam</h1>
        </section>
    )
    return (
        <section className='flex w-full items-center justify-center gap-12 h-[70vh] flex-col'>
            <h1 className='font-semibold text-4xl font-[Inter]'>Your Troubleshoot Exam consists of {troubleshoot?.questions.length} questions</h1>
            <button onClick={() => handleStudentTroubleshoot(troubleshoot.id)} className='bg-[#ed942f] text-white px-4 py-2 rounded-md font-semibold'>Start Exam</button>
        </section>
    )
}