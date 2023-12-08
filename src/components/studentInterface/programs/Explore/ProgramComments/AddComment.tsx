import { Box, Input, SvgIcon } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../authentication/auth/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProgramProps from "../../../../../interfaces/ProgramProps";
import { setStudentProgramComment } from "../../../../helpers/setStudentProgramComment";
import { Timestamp } from "firebase/firestore";

export default function AddComment(program: ProgramProps)
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [comment, setComment] = useState('')

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['programComments', program.id])

            queryClient.setQueryData(['programComments', program.id], (oldData: []) => {
                return [...oldData, {studentId: userData.id, programId: program.id, comment, createdAt: Timestamp.now()}]
            })

            return () => queryClient.setQueryData(['programComments', program.id], previousData)
        },
        // onSuccess: async () => {
        //     await queryClient.invalidateQueries({queryKey: ['programComments', program.id]})
        // },
        mutationFn: (comment: string) => setStudentProgramComment(userData.id, program.id, comment)
    })

    const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(comment)
        setComment('')
    }

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-end'
            pt={9}
            pb={3}
            mt='auto'
        > 
            <form onSubmit={handleAddComment}>
                <Box
                    px={3}
                    py={0.4}
                    bgcolor='#fff'
                    width='588px'
                    height='55px'
                    display='flex'
                    position='relative'
                    alignItems='center'
                    justifyContent='space-between'
                    borderRadius='10px'
                    border='2px solid #226E9F'
                >
                    <Input 
                        sx={{ 
                            flex: 1,
                            marginRight: 2,
                            fontSize: 20
                        }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disableUnderline
                    />
                    <SvgIcon sx={{ transition: '0.35s', cursor: 'pointer', zIndex: 6, fontSize: 50 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="38" viewBox="0 0 41 38" fill="none">
                            <rect x="0.5" y="0.5" width="40" height="37" rx="4.5" fill="white" stroke="url(#paint0_linear_2_9877)"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.82183 15.9618L13.1996 19.037L27.7157 9.19398L8.82183 15.9618ZM18.8681 24.4418L18.0316 27.4855L20.1675 25.3547L18.8681 24.4418ZM16.8317 27.6048L13.8904 19.9767L27.2708 10.9048L18.1031 23.1355C18.0581 23.1953 18.0245 23.2639 18.0044 23.3372L16.8309 27.6051L16.8317 27.6048ZM21.1234 26.026L17.3422 29.7987C17.2789 29.8746 17.1983 29.9322 17.108 29.9659C17.0176 29.9997 16.9206 30.0086 16.8262 29.9916C16.7317 29.9747 16.6429 29.9326 16.5682 29.8693C16.4935 29.806 16.4354 29.7235 16.3994 29.6299L12.7385 20.1359L7.26103 16.2884C7.17151 16.2286 7.09986 16.1432 7.05437 16.0422C7.00888 15.9413 6.9914 15.8288 7.00395 15.7178C7.01651 15.6068 7.05858 15.5018 7.1253 15.4149C7.19203 15.3281 7.2807 15.2629 7.38105 15.2269L30.2598 7.03136C30.3546 6.99742 30.4563 6.99089 30.5543 7.01245C30.6523 7.03401 30.743 7.08288 30.817 7.15397C30.891 7.22506 30.9456 7.31577 30.9751 7.41667C31.0046 7.51756 31.0079 7.62495 30.9848 7.72767L26.2304 28.6131C26.2173 28.6943 26.1883 28.7716 26.145 28.8402C26.1045 28.9052 26.0521 28.9611 25.991 29.0047C25.9299 29.0483 25.8612 29.0787 25.7889 29.0942C25.7166 29.1098 25.6422 29.1101 25.5697 29.0952C25.4973 29.0802 25.4284 29.0504 25.367 29.0073L21.1234 26.0251V26.026ZM29.2895 10.117L25.3211 27.5511L19.3596 23.3643L29.2895 10.117Z" fill="url(#paint1_linear_2_9877)"/>
                            <defs>
                                <linearGradient id="paint0_linear_2_9877" x1="20.5" y1="0" x2="20.5" y2="38" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#226E9F"/>
                                <stop offset="1" stop-color="#6A9DBC"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_2_9877" x1="19" y1="7" x2="19" y2="30" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#226E9F"/>
                                <stop offset="1" stop-color="#6A9DBC"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </SvgIcon>
                </Box>
            </form>
        </Box>
    )
}
