import { useContext, useState } from "react"
import { AuthContext } from "../../../authentication/auth/AuthProvider"
import { useMutation, useQuery } from "@tanstack/react-query"
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../../../firebase/firebaseConfig"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '../../../../index.css'

// import required modules
import { EffectCards } from 'swiper/modules';
import { Button, CircularProgress, Dialog, SvgIcon, Typography } from "@mui/material"
import ProgramProps from "../../../../interfaces/ProgramProps"
import { cn } from "../../../libs/utils"
import TeacherBundleCard from "./TeacherBundleCard"

type Props = {
    programs: ProgramProps[]
}

export default function TeacherBundles({ programs }: Props)
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [add, setAdd] = useState(false)
    const [addedPrograms, setAddedPrograms] = useState<string[]>()
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [edit, setEdit] = useState()

    const [loading, setLoading] = useState(false)

    const { data: bundles } = useQuery({
        queryKey: ['teacherBundles', userData?.id],
        queryFn: async () => {
            const bundlesRef = collection(db, 'bundles')
            const bundlesQuery = query(bundlesRef, where('teacherId', '==', userData?.id))
            const bundlesSnapshot = await getDocs(bundlesQuery)
            return bundlesSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        },
        enabled: !!userData?.id
    })

    const { mutate } = useMutation({
        onMutate: () => setLoading(true),
        onSettled: () => {
            setLoading(false)
            setAdd(false)
        },
        mutationFn: async () => {
            const bundleRef = collection(db, 'bundles')

            const addedBundle = {
                programs: addedPrograms,
                teacherId: userData?.id,
                price,
                discount
            }

            await addDoc(bundleRef, addedBundle)
        }
    })

    const { mutate: mutateEdit } = useMutation({
        onMutate: () => setLoading(true),
        onSettled: () => {
            setLoading(false)
            setEdit(undefined)
        },
        mutationFn: async () => {
            //@ts-expect-error edit
            const bundleDoc = doc(db, 'bundles', edit.id)

            const addedBundle = {
                programs: addedPrograms,
                teacherId: userData?.id,
                price,
                discount
            }

            await updateDoc(bundleDoc, addedBundle)
        }
    })

    return (
        <section className='w-full relative flex flex-col mb-8'>
            <div className='w-full flex items-center justify-end mt-12'>
                <Button
                    sx={{
                        background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                        borderRadius: '20px',
                        '&:hover': {
                            background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                            opacity: 1
                        },
                        paddingY: 1.95,
                        paddingX: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        width: 'fit-content'
                    }}
                    onClick={() => setAdd(true)}
                >
                    <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    <Typography fontFamily='Inter' fontSize={14}>Add a New Bundle</Typography>
                </Button>
            </div>
            {add && (
                <div className='flex flex-col gap-6'>
                    <p className='font-[Inter] font-medium text-sm'>{addedPrograms?.length ?? 0}/3 Programs Added (add up to 3 programs)</p>
                    {programs.map(program => (
                        <div onClick={(e) => (addedPrograms?.length ?? 0) < 3 || addedPrograms?.includes(program.id) ? setAddedPrograms(prev => (prev ? prev.includes(program.id) ? prev.slice().filter(p => p !== program.id) : [...prev, program.id] : [program.id])) : e.stopPropagation()} key={program.id} className={cn('px-6 py-4 rounded-3xl flex items-center justify-between bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500', addedPrograms?.includes(program.id) || addedPrograms?.length === 3 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer')}>
                            <p className='font-[Inter] font-semibold text-xl'>{program.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                            </svg>
                        </div>
                    ))}
                    <div className='flex gap-3 items-start justify-start flex-col'>
                        <p>Price:</p>
                        <input
                            type='number'
                            className='py-4 outline-none font-[Inter] font-semibold text-sm px-4 rounded-lg border border-gray-300 w-screen max-w-[384px]'
                            onChange={e => setPrice(+e.target.value)} 
                        />
                    </div>
                    <div className='w-full flex justify-between items-end'>
                        <div className='flex gap-3 items-start justify-start flex-col'>
                            <p>Discount (optional):</p>
                            <input
                                type='number'
                                className='py-4 outline-none font-[Inter] font-semibold text-sm px-4 rounded-lg border border-gray-300 w-screen max-w-[384px]'
                                onChange={e => setDiscount(+e.target.value)} 
                            />
                        </div>
                        <Button
                            sx={{
                                width: '180px',
                                height: '35px',
                                background: '#226E9F',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #226E9F',
                                borderRadius: '6px',
                                '&:hover': {
                                    background: '#226E9F',
                                    opacity: 1
                                },
                                paddingY: 3
                            }}
                            disabled={!((addedPrograms?.length ?? 0) >= 2)}
                            onClick={() => mutate()}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            )}
            {edit && (
                <div className='flex flex-col gap-6'>
                    <p className='font-[Inter] font-medium text-sm'>{addedPrograms?.length ?? 0}/3 Programs Added (add up to 3 programs)</p>
                    {programs.map(program => (
                        <div onClick={(e) => (addedPrograms?.length ?? 0) < 3 || addedPrograms?.includes(program.id) ? setAddedPrograms(prev => (prev ? prev.includes(program.id) ? prev.slice().filter(p => p !== program.id) : [...prev, program.id] : [program.id])) : e.stopPropagation()} key={program.id} className={cn('px-6 py-4 rounded-3xl flex items-center justify-between bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500', addedPrograms?.includes(program.id) || addedPrograms?.length === 3 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer')}>
                            <p className='font-[Inter] font-semibold text-xl'>{program.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                            </svg>
                        </div>
                    ))}
                    <div className='flex gap-3 items-start justify-start flex-col'>
                        <p>Price:</p>
                        <input
                            type='number'
                            className='py-4 outline-none font-[Inter] font-semibold text-sm px-4 rounded-lg border border-gray-300 w-screen max-w-[384px]'
                            value={price}
                            onChange={e => setPrice(+e.target.value)} 
                        />
                    </div>
                    <div className='w-full flex justify-between items-end'>
                        <div className='flex gap-3 items-start justify-start flex-col'>
                            <p>Discount (optional):</p>
                            <input
                                type='number'
                                value={discount}
                                className='py-4 outline-none font-[Inter] font-semibold text-sm px-4 rounded-lg border border-gray-300 w-screen max-w-[384px]'
                                onChange={e => setDiscount(+e.target.value)} 
                            />
                        </div>
                        <Button
                            sx={{
                                width: '180px',
                                height: '35px',
                                background: '#226E9F',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid #226E9F',
                                borderRadius: '6px',
                                '&:hover': {
                                    background: '#226E9F',
                                    opacity: 1
                                },
                                paddingY: 3
                            }}
                            disabled={!((addedPrograms?.length ?? 0) >= 2)}
                            onClick={() => mutateEdit()}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            )}
            <div className='w-full flex justify-start items-center flex-wrap'>
                {bundles?.map((bundle) => (
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                        key={bundle.id}
                        onClick={() => {
                            //@ts-expect-error edit
                            setEdit(bundle)
                            //@ts-expect-error edit
                            setAddedPrograms(bundle.programs)
                            //@ts-expect-error edit
                            setPrice(bundle.price)
                            //@ts-expect-error edit
                            setDiscount(bundle.discount)
                        }}
                    >
                        {/*//@ts-expect-error program */}
                        {bundle?.programs.map(programId => <SwiperSlide className='bg-[#FEF4EB]' key={programId}><TeacherBundleCard programId={programId} /></SwiperSlide>)}
                    </Swiper>
                ))}
            </div>
            <Dialog open={loading} PaperProps={{ style: { background: 'transparent', backgroundColor: 'transparent', overflow: 'hidden', boxShadow: 'none' } }}>
                <CircularProgress size='46px' sx={{ color: '#FF7E00' }} />
            </Dialog>
        </section>
    )
}