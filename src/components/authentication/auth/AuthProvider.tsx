import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getExamSession } from '../../helpers/getExamSession'
import { useNavigate } from 'react-router-dom'

//@ts-expect-error context
export const AuthContext = createContext()

//@ts-expect-error children
export default function AuthProvider({ children }) 
{   
    const queryClient = useQueryClient()
    const [user, setUser] = useState<User | null>(null)
    const { data: userData, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(user?.uid ?? '')
    })

    const navigate = useNavigate()

    const { data: examSession, isLoading } = useQuery({
        queryKey: ['examSession'],
        queryFn: () => getExamSession(userData?.id ?? ''),
        enabled: userData ? userData.role === 'student' : false,
    })

    console.log(examSession)

    useEffect(() => {
        refetch()
    }, [user, refetch])

    useLayoutEffect(() => {

        const handleExamSession = async () => {
            await queryClient.prefetchQuery({queryKey: ['examSession']})
        }

        handleExamSession()
        //eslint-disable-next-line
    }, [navigate])

    useLayoutEffect(() => {
        if(examSession?.length)
        {
            //@ts-expect-error tserror
            const type = examSession[0].type
            if(type === 'assessment')
            {
                //@ts-expect-error tserror
                navigate(`/assessment/${examSession[0].assessmentId}`)
            }
            else if(type === 'quiz')
            {
                //@ts-expect-error tserror
                navigate(`/quiz/${examSession[0].quizId}`)
            }
            else
            {
                //@ts-expect-error tserror
                navigate(`/exam/${examSession[0].examId}`)
            }
        }
    }, [examSession, navigate])

    // const []
    async function getUserData(uid: string)
    {
        try
        {
            const userRef = doc(db, 'students', uid ?? '')
            const userSnapshot = await getDoc(userRef)
    
            if(userSnapshot.exists())
            {
                const userData = {...userSnapshot.data(), id: userSnapshot.id, role: 'student'}
                return userData
            }
            else
            {
                const userRef = doc(db, 'teachers', uid ?? '')
                const userSnapshot = await getDoc(userRef)
        
                if(userSnapshot.exists())
                {
                    const userData = {...userSnapshot.data(), id: userSnapshot.id, role: 'teacher'}
                    return userData
                }
                else
                {
                    return null
                }
            }
        }
        catch(e)
        {
            console.error(e)
            return null
        }
    }


    useLayoutEffect(() => {
        const listen = onAuthStateChanged(auth, async (authUser) => {
            if(authUser)
            {
                setUser(authUser)
            }
            else
            {
                setUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    if(isLoading) return <></>
    else return (
        <AuthContext.Provider
            value={{ user, userData }}
        >
            { children }
        </AuthContext.Provider>
    )
}
