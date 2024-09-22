import { useQuery, useQueryClient } from "@tanstack/react-query"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../../firebase/firebaseConfig"
import ProgramProps from "../../../../interfaces/ProgramProps"
import { useContext, useState } from "react"
import { CircularProgress, Dialog } from "@mui/material"
import { AuthContext } from "../../../authentication/auth/AuthProvider"

export default function DeletePrograms() 
{
    const queryClient = useQueryClient()

    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deletedProgram, setDeletedProgram] = useState<ProgramProps>()

    const { data: programs } = useQuery({
        queryKey: ['allPrograms'],
        queryFn: async () => {
            const programCollection = collection(db, 'programs')
            const programDocs = await getDocs(programCollection)
            return programDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProgramProps[]
        }
    })

    const handleDeleteProgram = async (program: ProgramProps) => {
        setLoading(true)
        setDeleteOpen(false)

        const programDoc = doc(db, 'programs', program.id)
        const coursesCollection = collection(db, 'courses')
        const coursesQuery = query(coursesCollection, where('programId', '==', program.id))
        const coursesSnapshot = await getDocs(coursesQuery)
        const assessmentsCollection = collection(db, 'assessments')
        const assessmentsQuery = query(assessmentsCollection, where('courseId', 'in', coursesSnapshot.docs.map(doc => doc.id)))
        const assessmentsSnapshot = await getDocs(assessmentsQuery)
        const quizzesCollection = collection(db, 'quizzes')
        const quizzesQuery = query(quizzesCollection, where('courseId', 'in', coursesSnapshot.docs.map(doc => doc.id)))
        const quizzesSnapshot = await getDocs(quizzesQuery)
        const finalExamsCollection = collection(db, 'finalExams')
        const finalExamsQuery = query(finalExamsCollection, where('programId', '==', program.id))
        const finalExamsSnapshot = await getDocs(finalExamsQuery)
        const lessonsCollection = collection(db, 'lessons')
        const lessonsQuery = query(lessonsCollection, where('courseId', 'in', coursesSnapshot.docs.map(doc => doc.id)))
        const lessonsSnapshot = await getDocs(lessonsQuery)

        const programDelete = await deleteDoc(programDoc)
        const coursesDelete = coursesSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))
        const assessmentsDelete = assessmentsSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))
        const quizzesDelete = quizzesSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))
        const finalExamsDelete = finalExamsSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))
        const lessonsDelete = lessonsSnapshot.docs.map(async (doc) => await deleteDoc(doc.ref))

        await Promise.all([programDelete, ...coursesDelete, ...assessmentsDelete, ...quizzesDelete, ...finalExamsDelete, ...lessonsDelete])

        await queryClient.invalidateQueries({ queryKey: ['teacherPrograms', userData?.id] })
        
        setLoading(false)
    }

    return (
        <>
            <div className='flex flex-col py-12 gap-12'>
                <h1 className='text-xl text-black font-semibold'>Showing ({programs?.length}) programs</h1>
                <div className="flex gap-4 w-full flex-col">
                    {programs?.map(program => (
                        <div key={program.id} className='flex rounded-[12px] p-8 items-center bg-[#FEF4EB] justify-between gap-4 w-full'>
                            <p className='text-lg text-black font-semibold'>{program?.name}</p>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => {
                                setDeleteOpen(true)
                                setDeletedProgram(program)
                            }}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <div className='flex flex-col gap-12 p-8'>
                    <h1 className='text-xl text-black text-center font-semibold'>Are you sure you want to delete this program?</h1>
                    <div className='flex gap-4 w-full items-center justify-center'>
                        <button className='bg-white text-black border border-black px-4 py-2 rounded-md' onClick={() => {
                            setDeleteOpen(false)
                            setDeletedProgram(undefined)
                        }}>Cancel</button>
                        <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => handleDeleteProgram(deletedProgram!)}>Delete</button>
                    </div>
                </div>
            </Dialog>
            <Dialog open={loading} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
                <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
            </Dialog>
        </>
    )
}