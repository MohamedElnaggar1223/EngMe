import { Box, CircularProgress, Dialog } from "@mui/material";
import { lazy, useState, Suspense, useContext, createContext, useEffect } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { BundlesProps } from "../../../../interfaces/BundlesProps";
const ProgramsExploreHome = lazy(() => import("./ProgramsExploreHome"))
const ProgramsExploreProgram = lazy(() => import("./ProgramsExploreProgram"))
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '../../../../index.css'

// import required modules
import { EffectCards } from 'swiper/modules';
import BundleCard from "../../../teacherInterface/programs/TeacherMyPrograms/BundleCard";
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { setStudentRequestProgram } from "../../../helpers/setStudentRequestProgram";

//@ts-expect-error context
export const ProgramExploreContext = createContext()

interface ProgramsExplore {
    setTab: React.Dispatch<React.SetStateAction<string>>,
    teacherId?: string
}

export default function ProgramsExplore({ setTab, teacherId }: ProgramsExplore) {
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const navigate = useNavigate()

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedFilters, setSelectedFilters] = useState<any>({
        Language: [],
        Level: [],
        Rating: []
    })
    //filters cant be applied until confirm is clicked, note for queries too
    const [applyFilters, setApplyFilters] = useState(false)
    const [pageShowed, setPageShowed] = useState('home')

    const { data: explorePrograms, isLoading } = useQuery({
        queryKey: ['explorePrograms', userData?.id],
        queryFn: () => getExplorePrograms(),
        enabled: !!userData,
    })

    const { data: bundles, isLoading: bundlesLoading } = useQuery({
        queryKey: ['bundles', userData?.id],
        queryFn: async () => {
            const bundlesRef = collection(db, 'bundles')
            const querySnapshot = await getDocs(bundlesRef)
            const bundlesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BundlesProps[]
            const bundlesFiltered = bundlesData.slice().filter((bundle) => {
                explorePrograms?.forEach(explore => console.log(explore.id))
                if (bundle.teacherId === userData.id) return false
                if (bundle.programs.every(program => explorePrograms?.map(explore => explore.id)?.includes(program))) return true
                return false
            })
            return bundlesFiltered
        },
        enabled: !!userData && !isLoading,
    })

    const { mutate: mutateBundles } = useMutation({
        onMutate: () => setLoading(true),
        onSettled: async () => {
            setLoading(false)
            await queryClient.invalidateQueries({
                queryKey: ['bundles', userData?.id]
            })
            await queryClient.invalidateQueries({
                queryKey: ['explorePrograms', userData?.id]
            })
        },
        mutationFn: async (bundle: BundlesProps) => {
            await handlePayment(bundle)
        }
    })

    const handlePayment = async (bundle: BundlesProps) => {

        if ((((100 - (bundle?.discount ?? 0)) / 100) * (bundle?.price ?? '0')) > 0) {

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

            const headers = {
                "Content-Type": "application/json"
            }

            const postBundle = { ...bundle, image: '' }

            const body = {
                bundle: postBundle,
                studentId: userData.id
            }

            const response = await axios.post('https://engmestripeapi.vercel.app/create-checkout-session', body, {
                headers
            })

            // const response = await axios.post('http://localhost:3001/create-checkout-session', body, {
            //     headers
            // })

            const session = response.data

            const result = await stripe?.redirectToCheckout({
                sessionId: session.id
            })

            if (result?.error) {
                console.error(result.error)
            }
        }
        else {
            const newOrder = {
                studentId: userData.id,
                programs: bundle.programs,
                orderId: uuidv4(),
                status: 'accepted',
                createdAt: new Date(),
                processed: true
            }

            await addDoc(collection(db, 'orders'), newOrder)
            await Promise.all(bundle.programs.map(async (programId: string) => {
                await setStudentRequestProgram('', userData.id, programId)
            }))
            await queryClient.invalidateQueries({
                queryKey: ['bundles', userData?.id]
            })
            await queryClient.invalidateQueries({
                queryKey: ['explorePrograms', userData?.id]
            })
            queryClient.invalidateQueries({
                queryKey: ['currentPrograms', userData?.id],
            })
            navigate('/', { replace: true })
        }
    }

    const displayedBundles = bundles?.map(bundle => (
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="relative mySwiper"
            key={bundle.id}
            onClick={() => {
                mutateBundles(bundle)
            }}
        >
            {bundle?.programs.map(programId => <SwiperSlide className='bg-[#FEF4EB]' key={programId}><BundleCard programId={programId} /></SwiperSlide>)}
            <div className='absolute flex flex-col gap-2 w-fit text-left items-end justify-end text-[#FF7E00] font-[Inter] bottom-10 left-5 z-50'>
                {bundle.discount !== 100 && <p> <span className='font-bold'>Price: </span>${bundle.price}</p>}
                {bundle.discount !== 0 ? bundle.discount !== 100 ? <p><span className='font-bold'>Discount: </span>{bundle.discount}%</p> : <p><span className='font-bold'>FREE</span></p> : null}
                <p className='font-black text-blue-800'>Swipe for more</p>
            </div>
        </Swiper>
    ))

    useEffect(() => {
        if (pageShowed !== 'home') {
            const programFound = explorePrograms?.find(program => program.id === pageShowed)
            if (!programFound) setTab('Explore')
        }
        //eslint-disable-next-line
    }, [pageShowed])

    useEffect(() => {
        if (id) setPageShowed(id)
    }, [id])

    // useEffect(() => {
    //     refetch()
    // }, [userData, refetch])

    async function getExplorePrograms() {
        const programsRef = collection(db, 'programs')

        const cPrograms = queryClient.getQueryData(['currentPrograms', userData?.id])

        //@ts-expect-error array
        if (cPrograms?.length) {
            //@ts-expect-error idd
            const q = query(programsRef, where(documentId(), 'not-in', cPrograms?.map(program => program.id)))

            const querySnapshot = await getDocs(q)

            // const filteredArray = querySnapshot.docs.slice().filter(doc => !userData.favoritePrograms.includes(doc.id))

            const exploreProgramsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ProgramProps[]

            const explorePropgramsFiltered = exploreProgramsData.filter(async (program) => {
                const teacherDoc = doc(db, "teachers", program.teacherId ?? '');
                const teacherData = await getDoc(teacherDoc);
                return teacherData.data() && !teacherData.data()?.firstLoginLink
            })

            const finalExplorePrograms = await Promise.all(explorePropgramsFiltered)

            // console.log(exploreProgramsData, 'testprogexdocs')

            return finalExplorePrograms

        }
        else if (teacherId) {
            const q = query(programsRef, where('teacherId', '!=', teacherId))

            const querySnapshot = await getDocs(q)

            const exploreProgramsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ProgramProps[]

            const explorePropgramsFiltered = exploreProgramsData.filter(async (program) => {
                const teacherDoc = doc(db, "teachers", program.teacherId ?? '');
                const teacherData = await getDoc(teacherDoc);
                return teacherData.data() && !teacherData.data()?.firstLoginLink
            })

            const finalExplorePrograms = await Promise.all(explorePropgramsFiltered)

            // console.log(exploreProgramsData, 'testprogexdocs')

            return finalExplorePrograms

            return exploreProgramsData
        }
        else {
            const querySnapshot = await getDocs(programsRef)

            // const filteredArray = querySnapshot.docs.slice().filter(doc => !userData.favoritePrograms.includes(doc.id))

            const exploreProgramsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ProgramProps[]

            const explorePropgramsFiltered = exploreProgramsData.filter(async (program) => {
                const teacherDoc = doc(db, "teachers", program.teacherId ?? '');
                const teacherData = await getDoc(teacherDoc);
                return teacherData.data() && !teacherData.data()?.firstLoginLink
            })

            const finalExplorePrograms = await Promise.all(explorePropgramsFiltered)

            // console.log(exploreProgramsData, 'testprogexdocs')

            return finalExplorePrograms
        }
    }

    function handleFilters(type: string, e: React.ChangeEvent<HTMLInputElement>) {
        const oldArray = selectedFilters[type]
        const newArray = [...oldArray, e.target.value]
        const newFilters = { ...selectedFilters, [type]: newArray }
        setSelectedFilters(newFilters)
    }

    function handleRemoveFilter(filter: string, item: string) {
        const oldArray = selectedFilters[filter]
        //@ts-expect-error item
        const newArray = oldArray.filter(fitem => fitem !== item)
        const newFilters = { ...selectedFilters, [filter]: newArray }
        setSelectedFilters(newFilters)
    }

    if (isLoading || bundlesLoading) return <></>
    return (
        <ProgramExploreContext.Provider value={{ setPageShowed, pageShowed }}>
            <Box
                my={5}
            >
                {
                    pageShowed === 'home' ?
                        <Suspense>
                            <ProgramsExploreHome
                                applyFilters={applyFilters}
                                filters={filters}
                                handleFilters={handleFilters}
                                handleRemoveFilter={handleRemoveFilter}
                                setApplyFilters={setApplyFilters}
                                setFilters={setFilters}
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters}
                                explorePrograms={explorePrograms}
                                displayedBundles={displayedBundles}
                            />
                        </Suspense> :
                        <Suspense>
                            {/* //@ts-expect-error pageShowed */}
                            <ProgramsExploreProgram explorePrograms={explorePrograms as ProgramProps[]} />
                        </Suspense>
                }
            </Box>
            <Dialog open={loading} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
                <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
            </Dialog>
        </ProgramExploreContext.Provider>
    )
}
