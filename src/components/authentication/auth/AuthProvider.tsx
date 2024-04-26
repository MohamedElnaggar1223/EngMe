import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebaseConfig'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getExamSession } from '../../helpers/getExamSession'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../helpers/getUserData'
import axios from 'axios'
import { collection, query, where, onSnapshot, deleteDoc } from 'firebase/firestore'
import { setStudentRequestProgram } from '../../helpers/setStudentRequestProgram'
import { setStudentBookConsultation } from '../../helpers/setStudentBookConsultation'

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

    // const { data: redirect, isLoading: isLoadingRedirect } = useQuery({
    //     queryKey: ['redirect'],
    //     queryFn: async () => {
    //         const redirectRef = collection(db, 'redirect')
    //         const queryRedirect = query(redirectRef, where('studentId', '==', userData?.id))
    //         const redirectDocs = await getDocs(queryRedirect)
    //         console.log(redirectDocs.docs.length)
    //         if(redirectDocs.docs.length > 0) return {...redirectDocs.docs[0].data(), id: redirectDocs.docs[0].id}
    //         return null
    //     },
    //     enabled: userData ? userData.role === 'student' : false,
    //     refetchOnMount: true,
    //     refetchOnWindowFocus: true
    // })

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
            else if (type === 'troubleshoot')
            {
                //@ts-expect-error tserror
                navigate(`/troubleshootexam/${examSession[0].troubleshootId}`)
            }
            else
            {
                //@ts-expect-error tserror
                navigate(`/exam/${examSession[0].finalExamId}`)
            }
        }
    }, [examSession, navigate])

    // useEffect(() => {
    //     if(redirect !== undefined && !isLoadingRedirect)
    //     {
    //         //@ts-expect-error path
    //         const path = redirect?.path
    //         const deleteRedirect = async () => {
    //             await deleteDoc(doc(db, 'redirect', redirect?.id ?? ''))
    //         }
    //         deleteRedirect().then(() =>{ 
    //             console.log(path)
    //             window.location.href = path
    //         })
    //     }
    // }, [redirect, isLoadingRedirect, navigate])

    useEffect(() => {
        const redirectRef = collection(db, 'redirect')
        const queryRedirect = query(redirectRef, where('studentId', '==', userData?.id ?? ''))

        const unsub = onSnapshot(queryRedirect, async (querySnapshot) => {
            if(querySnapshot.docs.length > 0)
            {
                const redirectDoc = querySnapshot.docs[0]
                const path = redirectDoc.data()?.path
                await deleteDoc(redirectDoc.ref)
                .then(() =>{ 
                    window.location.href = path
                })
            } 
        })

        return () => {
            unsub()
        }
    }, [userData])

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
                    if(order.data().programs)
                    {
                        const requestPrograms = order.data().programs.map(async (programId: string) => {
                            await setStudentRequestProgram('', order.data()?.studentId, programId)
                        })
                        await Promise.all(requestPrograms)
                    }
                    else await setStudentRequestProgram('', order.data()?.studentId, order.data()?.programId)
                    await deleteDoc(order.ref)
                })
    
                await Promise.all(updateStudentProgram)
            })
    
            return () => {
                unsub()
            }
        }
    }, [userData])

    useEffect(() => {
        if(userData?.id)
        {
            const ordersRef = collection(db, 'ordersConsultations')
            const queryOrders = query(ordersRef, where('studentId', '==', userData?.id))
    
            const unsub = onSnapshot(queryOrders, async (querySnapshot) => {
                const acceptedOrders = querySnapshot.docs.slice().filter(doc => doc.data()?.status === 'accepted')
    
                const updateStudentProgram = acceptedOrders.map(async (order) => {
                    await setStudentBookConsultation(order.data()?.studentId, order.data()?.teacherId)
                    await deleteDoc(order.ref)
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
