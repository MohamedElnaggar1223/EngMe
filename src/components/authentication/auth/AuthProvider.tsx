import { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebaseConfig'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getExamSession } from '../../helpers/getExamSession'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../helpers/getUserData'
import axios from 'axios'
import { collection, query, where, onSnapshot, deleteDoc, runTransaction } from 'firebase/firestore'
import { setStudentRequestProgram } from '../../helpers/setStudentRequestProgram'
import { setStudentBookConsultation } from '../../helpers/setStudentBookConsultation'

//@ts-expect-error context
export const AuthContext = createContext()

//@ts-expect-error children
export default function AuthProvider({ children }) {
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

    useEffect(() => {
        if (userIsSuccess && userData === null) {
            signOut(auth)
        }
    }, [userIsSuccess])

    useEffect(() => {
        const initiatebackend = () => {
            axios.get('https://engmebackendzoom.onrender.com/')
            axios.get('https://engmestripeapi.vercel.app/')
        }
        initiatebackend()
    }, [])

    useLayoutEffect(() => {
        const handleExamSession = async () => {
            await queryClient.prefetchQuery({ queryKey: ['examSession'] })
        }
        handleExamSession()
    }, [navigate])

    useLayoutEffect(() => {
        if (examSession?.length) {
            //@ts-expect-error tserror
            const type = examSession[0].type
            if (type === 'assessment') {
                //@ts-expect-error tserror
                navigate(`/assessment/${examSession[0].assessmentId}`)
            } else if (type === 'quiz') {
                //@ts-expect-error tserror
                navigate(`/quiz/${examSession[0].quizId}`)
            } else if (type === 'troubleshoot') {
                //@ts-expect-error tserror
                navigate(`/troubleshootexam/${examSession[0].troubleshootId}`)
            } else {
                //@ts-expect-error tserror
                navigate(`/exam/${examSession[0].finalExamId}`)
            }
        }
    }, [examSession, navigate])

    useEffect(() => {
        const redirectRef = collection(db, 'redirect')
        const queryRedirect = query(redirectRef, where('studentId', '==', userData?.id ?? ''))

        const unsub = onSnapshot(queryRedirect, async (querySnapshot) => {
            if (querySnapshot.docs.length > 0) {
                const redirectDoc = querySnapshot.docs[0]
                const path = redirectDoc.data()?.path
                await deleteDoc(redirectDoc.ref)
                    .then(() => {
                        window.location.href = path
                    })
            }
        })

        return () => unsub()
    }, [userData])

    useLayoutEffect(() => {
        const listen = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
                queryClient.setQueryData(['userData'], null)
            }
        })

        return () => listen()
    }, [])

    // Updated order processing for programs
    useEffect(() => {
        if (userData?.id) {
            const ordersRef = collection(db, 'orders')
            const queryOrders = query(ordersRef,
                where('studentId', '==', userData?.id),
                where('processed', '==', false)
            )

            const unsub = onSnapshot(queryOrders, async (querySnapshot) => {
                const acceptedOrders = querySnapshot.docs.filter(doc => doc.data()?.status === 'accepted')

                for (const order of acceptedOrders) {
                    try {
                        await runTransaction(db, async (transaction) => {
                            const orderDoc = await transaction.get(order.ref)
                            if (!orderDoc.exists() || orderDoc.data().processed) return

                            if (orderDoc.data().programs) {
                                await Promise.all(
                                    orderDoc.data().programs.map(async (programId: string) => {
                                        await setStudentRequestProgram('', orderDoc.data().studentId, programId)
                                    })
                                )
                            } else {
                                await setStudentRequestProgram('', orderDoc.data().studentId, orderDoc.data().programId)
                            }

                            // Mark as processed instead of deleting
                            await transaction.update(orderDoc.ref, {
                                processed: true,
                                processedAt: new Date()
                            })

                            await queryClient.invalidateQueries({
                                queryKey: ['currentPrograms', userData?.id]
                            })

                            await queryClient.invalidateQueries({
                                queryKey: ['explorePrograms', userData?.id]
                            })

                            await queryClient.invalidateQueries({
                                queryKey: ['bundles', userData?.id]
                            })
                        })
                    } catch (error) {
                        console.error('Error processing program order:', error)
                    }
                }
            })

            return () => unsub()
        }
    }, [userData])

    // Updated order processing for consultations
    useEffect(() => {
        if (userData?.id) {
            const ordersRef = collection(db, 'ordersConsultations')
            const queryOrders = query(ordersRef,
                where('studentId', '==', userData?.id),
                where('processed', '==', false)
            )

            const unsub = onSnapshot(queryOrders, async (querySnapshot) => {
                const acceptedOrders = querySnapshot.docs.filter(doc => doc.data()?.status === 'accepted')

                for (const order of acceptedOrders) {
                    try {
                        await runTransaction(db, async (transaction) => {
                            const orderDoc = await transaction.get(order.ref)
                            if (!orderDoc.exists() || orderDoc.data().processed) return

                            await setStudentBookConsultation(
                                orderDoc.data().studentId,
                                orderDoc.data().teacherId
                            )

                            // Mark as processed instead of deleting
                            await transaction.update(orderDoc.ref, {
                                processed: true,
                                processedAt: new Date()
                            })
                        })
                    } catch (error) {
                        console.error('Error processing consultation order:', error)
                    }
                }
            })

            return () => unsub()
        }
    }, [userData])

    if (isLoading) return <></>

    return (
        <AuthContext.Provider value={{ user, userData, userIsSuccess, fetchStatus }}>
            {children}
        </AuthContext.Provider>
    )
}