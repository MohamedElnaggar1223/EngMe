
import 'swiper/css';
import 'swiper/css/effect-cards';

import '../../../../index.css'
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import ProgramProps from '../../../../interfaces/ProgramProps';
import { Stack, Box, Typography } from '@mui/material';

export default function TeacherBundleCard({ programId }: { programId: string })
{
    const { data: programData } = useQuery({
        queryKey: ['program', programId],
        queryFn: async () => {
            const docRef = doc(db, "programs", programId)
            const programDoc = await getDoc(docRef)
            return {...programDoc.data(), id: programDoc.id} as ProgramProps
        }
    })

    return (
        <div className='flex flex-col overflow-hidden gap-1'>
            <div className='w-full max-h-44 min-h-36 overflow-hidden bg-white'>
                <img
                    src={programData?.image}
                    className='w-full object-cover'
                />
            </div>
            <p className='font-[Inter] w-full font-semibold text-sm text-black px-2.5'>{programData?.name}</p>
            <p className='font-[Inter] w-full font-light text-xs text-black px-2.5'>{programData?.category}</p>
            <p className='font-[Inter] w-full font-normal text-xs text-black flex-1 px-2.5 max-h-28 overflow-auto'>{programData?.description}</p>
            <Stack
                direction='row'
                gap={1}
                flexWrap='wrap'
                className='mt-auto'
                paddingX={1}
            >
                <Box
                    bgcolor='#D0EBFC'
                    sx={{
                        border: '1.5px solid',
                        borderRadius: '20px', 
                        borderColor: '#6A9DBC'
                    }}
                    px={1}
                    py={0.5}
                >
                    <Typography fontSize={10} fontWeight={400} fontFamily='Inter'>{programData?.duration} Hours</Typography>
                </Box>
                <Box
                    bgcolor='#D0EBFC'
                    sx={{
                        border: '1.5px solid',
                        borderRadius: '20px', 
                        borderColor: '#6A9DBC'
                    }}
                    px={1}
                    py={0.5}
                >
                    <Typography fontSize={10} fontWeight={400} fontFamily='Inter'>Completion Certificate</Typography>
                </Box>
                <Box
                    bgcolor='#D0EBFC'
                    sx={{
                        border: '1.5px solid',
                        borderRadius: '20px', 
                        borderColor: '#6A9DBC'
                    }}
                    px={1}
                    py={0.5}
                >
                    <Typography fontSize={10} fontWeight={400} fontFamily='Inter'>{programData?.level}</Typography>
                </Box>
                <Box
                    bgcolor='#D0EBFC'
                    sx={{
                        border: '1.5px solid',
                        borderRadius: '20px', 
                        borderColor: '#6A9DBC'
                    }}
                    px={1}
                    py={0.5}
                >
                    <Typography fontSize={10} fontWeight={400} fontFamily='Inter'>{programData?.expiry} Days</Typography>
                </Box>
            </Stack>
        </div>
    )
}