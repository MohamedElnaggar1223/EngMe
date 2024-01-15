import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebaseConfig'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getExamSession } from '../../helpers/getExamSession'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../helpers/getUserData'
import axios from 'axios'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { setStudentRequestProgram } from '../../helpers/setStudentRequestProgram'

//@ts-expect-error context
export const AuthContext = createContext()

//@ts-expect-error children
export default function AuthProvider({ children }) 
{   
    const queryClient = useQueryClient()
    const [user, setUser] = useState<User | null>(null)
    const { data: userData, isSuccess: userIsSuccess, fetchStatus } = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(user?.uid ?? ''),
        enabled: user !== null
    })
    
    const navigate = useNavigate()

    const { data: examSession, isLoading } = useQuery({
        queryKey: ['examSession'],
        queryFn: () => getExamSession(userData?.id ?? ''),
        enabled: userData ? userData.role === 'student' : false,
    })

    // useEffect(() => {
    //     refetch()
    // }, [user, refetch])

    useEffect(() => {
        if(userIsSuccess)
        {
            if(userData === null) signOut(auth)
        }
    //eslint-disable-next-line
    }, [userIsSuccess])

    useEffect(() => {
        const initiatebackend = () => {
            axios.get('https://engmebackendzoom.onrender.com/')
            axios.get('https://engmestripeapi.onrender.com/')
        }

        initiatebackend()
    }, [])

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
                navigate(`/exam/${examSession[0].finalExamId}`)
            }
        }
    }, [examSession, navigate])

    useLayoutEffect(() => {
        const listen = onAuthStateChanged(auth, async (authUser) => {
            if(authUser)
            {
                setUser(authUser)
            }
            else
            {
                setUser(null)
                queryClient.setQueryData(['userData'], null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    useEffect(() => {
        if(userData?.id)
        {
            const ordersRef = collection(db, 'orders')
            const queryOrders = query(ordersRef, where('studentId', '==', userData?.id))
    
            const unsub = onSnapshot(queryOrders, async (querySnapshot) => {
                const acceptedOrders = querySnapshot.docs.slice().filter(doc => doc.data()?.status === 'accepted')
    
                const updateStudentProgram = acceptedOrders.map(async (order) => {
                    await setStudentRequestProgram('', order.data()?.studentId, order.data()?.programId)
                })
    
                await Promise.all(updateStudentProgram)
            })
    
            return () => {
                unsub()
            }
        }
    }, [userData])

    if(isLoading) return <></>
    else return (
        <AuthContext.Provider
            value={{ user, userData, userIsSuccess, fetchStatus }}
        >
            { children }
        </AuthContext.Provider>
    )
}
