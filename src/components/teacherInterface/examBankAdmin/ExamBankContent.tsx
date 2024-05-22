import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getExamBankContent } from "../../helpers/getExamBankContent"
import { Stack, SvgIcon, Typography, Button, Input, InputLabel, Grid } from "@mui/material"
import { useState } from "react"
import { setExamBankContent } from "../../helpers/setExamBankContent"
import ExamBankEditExam from "./ExamBankEditExam"

interface ExamBankContentProps{
    id: string,
    major: string,
    content: string[]
}

export default function ExamBankContent({ id }: ExamBankContentProps) 
{
    const queryClient = useQueryClient()

    const [title, setTitle] = useState('')
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState('')

    const { data: examBankContent, refetch } = useQuery({
        queryKey: ['examBankContent', id],
        queryFn: () => getExamBankContent(id)
    })

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['examBankContent', id])

            queryClient.setQueryData(['examBankContent', id], (oldData: unknown) => {
                //@ts-expect-error oldData
                return (oldData && oldData.length > 0) ? [...oldData, { title, majorId: id, questions: [] }] : [{ title, majorId: id, questions: [] }]
            })

            return () => queryClient.setQueryData(['examBankContent', id], previousData)
        },
        onSettled: async () => {
            setTitle('')
            await refetch()
        },
        mutationFn: () => setExamBankContent(id, title)
    })

    const { mutate: mutateDelete } = useMutation({
        onMutate: (ebContentId: string) => {
            const previousData = queryClient.getQueryData(['examBankContent', id])

            queryClient.setQueryData(['examBankContent', id], (oldData: unknown) => {
                //@ts-expect-error oldData
                const newData = (oldData && oldData.length > 0) ? oldData.slice().filter(data => data.id !== ebContentId) : []
                return newData
            })

            return () =>queryClient.setQueryData(['examBankContent', id], previousData)
        },
        mutationFn: (ebContentId: string) => setExamBankContent(id, title, ebContentId)
    })

    const displayedContent = examBankContent?.map(ebContent => (
        <Grid item xs={8} key={ebContent.id} mt={4} minWidth={edit === ebContent.id ? '100%' : 'auto'}>
            <Stack
                direction='column'
                flex={1}
                >
                <Stack
                    direction='column'
                    position='relative'
                    width='auto'
                    px={1}
                    py={6}
                    mx='20%'
                    bgcolor='#D0EBFC'
                    borderRadius='15px'
                    alignItems='center'
                    justifyContent='center'
                    gap={5}
                    pb={2}
                    height='240px'
                    maxWidth='450px'
                    key={ebContent.id}
                    >
                    <SvgIcon sx={{ fontSize: 56 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                            <path d="M47.2568 13.7539L45.9999 12.497C44.9577 11.457 43.2704 11.457 42.2282 12.497L39.7143 15.0109L35.5858 19.1393V0.888889C35.586 0.398097 35.1882 0.000127556 34.6974 0C34.6973 0 34.6976 0 34.6974 0H10.6969C10.6754 0.00171156 10.654 0.00543424 10.6331 0.0111198C10.4209 0.0228907 10.2202 0.111516 10.0685 0.260445L0.290717 10.0382C0.136032 10.1965 0.0467072 10.4073 0.040557 10.6286C0.0388955 10.6419 0.0302735 10.6527 0.0302735 10.6667V47.1111C0.0301459 47.6019 0.427908 47.9999 0.9187 48C0.918546 48 0.918854 48 0.9187 48H34.6969C35.1876 48.0003 35.5855 47.6028 35.5858 47.1121C35.5858 47.1118 35.5858 47.1115 35.5858 47.1111V29.3333C35.5808 29.2948 35.5731 29.2566 35.5628 29.2192L44.743 20.0391L47.2568 17.5252C48.3049 16.4884 48.3259 14.8104 47.2891 13.7623C47.2824 13.7554 47.2756 13.7486 47.2568 13.7539ZM42.2993 19.9688L39.7846 17.4544L40.3428 16.8963L42.8575 19.4106L42.2993 19.9688ZM22.7438 39.5243L22.1152 38.8956L40.4137 20.5971L41.0424 21.2257L22.7438 39.5243ZM19.361 38.6551L21.0986 40.3928L18.4921 41.2613L19.361 38.6551ZM20.2294 37.0095L38.5277 18.7113L39.1566 19.3402L20.8583 37.6385L20.2294 37.0095ZM9.80805 3.03472V9.77778H3.06499L9.80805 3.03472ZM33.8081 46.2222H1.80805V11.5556H10.6969C11.1879 11.5556 11.5858 11.1576 11.5858 10.6667V1.77778H33.8081V20.9171L18.3441 36.3811C18.2531 36.4742 18.1841 36.5864 18.1421 36.7095C18.1388 36.7172 18.132 36.72 18.1292 36.7283L16.446 41.7778H5.36361C4.87269 41.7778 4.47472 42.1757 4.47472 42.6667C4.47472 43.1576 4.87269 43.5556 5.36361 43.5556H16.9192C16.9569 43.5506 16.9943 43.5431 17.031 43.533C17.0471 43.5456 17.0664 43.5534 17.0867 43.5556C17.1823 43.5557 17.2773 43.5401 17.3679 43.5095L23.0251 41.6241C23.034 41.6212 23.0367 41.6137 23.0449 41.6102C23.1675 41.5683 23.2793 41.4998 23.3723 41.4097L33.8081 30.974V46.2222ZM45.9999 16.2682L44.1144 18.1537L41.5998 15.6393L43.4851 13.7539C43.8328 13.4076 44.3951 13.4076 44.7429 13.7539L45.9998 15.0109C46.3462 15.3584 46.3462 15.9206 45.9999 16.2682ZM20.4747 16.8889H31.1414C31.6322 16.889 32.0301 16.4913 32.0303 16.0005C32.0303 16.0003 32.0303 16.0006 32.0303 16.0005V3.55556C32.0304 3.06476 31.6326 2.66679 31.1418 2.66667C31.1417 2.66667 31.142 2.66667 31.1418 2.66667H20.4747C19.9838 2.66667 19.5858 3.06464 19.5858 3.55556V16C19.5858 16.4909 19.9838 16.8889 20.4747 16.8889ZM21.3636 4.44444H30.2525V15.1111H21.3636V4.44444ZM5.36361 20.4444H21.3636C21.8545 20.4444 22.2525 20.8424 22.2525 21.3333C22.2525 21.8243 21.8545 22.2222 21.3636 22.2222H5.36361C4.87269 22.2222 4.47472 21.8243 4.47472 21.3333C4.47472 20.8424 4.87269 20.4444 5.36361 20.4444ZM22.2525 26.6667C22.2526 27.1575 21.8549 27.5554 21.3641 27.5556C21.3639 27.5556 21.3642 27.5556 21.3641 27.5556H5.36361C4.87269 27.5556 4.47472 27.1576 4.47472 26.6667C4.47472 26.1757 4.87269 25.7778 5.36361 25.7778H21.3636C21.8544 25.7776 22.2524 26.1759 22.2525 26.6667C22.2525 26.6668 22.2525 26.6665 22.2525 26.6667ZM19.5858 32C19.586 32.4908 19.1882 32.8888 18.6974 32.8889C18.6972 32.8889 18.6976 32.8889 18.6974 32.8889H5.36361C4.87269 32.8889 4.47472 32.4909 4.47472 32C4.47472 31.5091 4.87269 31.1111 5.36361 31.1111H18.6969C19.1877 31.111 19.5857 31.5092 19.5858 32C19.5858 32.0002 19.5858 31.9998 19.5858 32ZM16.0303 37.3333C16.0304 37.8241 15.6326 38.2221 15.1418 38.2222C15.1417 38.2222 15.142 38.2222 15.1418 38.2222H5.36361C4.87269 38.2222 4.47472 37.8243 4.47472 37.3333C4.47472 36.8424 4.87269 36.4444 5.36361 36.4444H15.1414C15.6322 36.4443 16.0301 36.8425 16.0303 37.3333C16.0303 37.3335 16.0303 37.3332 16.0303 37.3333ZM30.7855 17.9557C31.1781 18.2494 31.2584 18.8058 30.9647 19.1984C30.9643 19.199 30.9639 19.1995 30.9634 19.2001L28.2968 22.7556C28.1424 22.9618 27.9061 23.0907 27.6492 23.1089C27.6275 23.1102 27.6067 23.1111 27.5858 23.1111C27.3501 23.1112 27.124 23.0175 26.9574 22.8507L25.1796 21.0729C24.8356 20.7227 24.8407 20.16 25.1909 19.816C25.5366 19.4764 26.0907 19.4764 26.4365 19.816L27.4894 20.869L29.5415 18.1333C29.836 17.7407 30.3929 17.6613 30.7855 17.9557ZM25.1796 42.4062C24.8356 42.056 24.8407 41.4933 25.1909 41.1493C25.5366 40.8097 26.0907 40.8097 26.4365 41.1493L27.4894 42.2023L29.5415 39.467C29.8348 39.0736 30.3915 38.9924 30.785 39.2857C31.1784 39.579 31.2596 40.1357 30.9663 40.5292C30.9653 40.5304 30.9644 40.5317 30.9634 40.533L28.2967 44.0886C28.1425 44.2948 27.9061 44.4238 27.6492 44.4419C27.6275 44.4436 27.6067 44.4444 27.5858 44.4444C27.3501 44.4445 27.124 44.3508 26.9574 44.184L25.1796 42.4062ZM3.58583 13.3333C3.58583 12.8424 3.9838 12.4444 4.47472 12.4444H8.91916C9.41008 12.4444 9.80805 12.8424 9.80805 13.3333C9.80805 13.8243 9.41008 14.2222 8.91916 14.2222H4.47472C3.9838 14.2222 3.58583 13.8243 3.58583 13.3333ZM12.4747 13.3333C12.4747 12.8424 12.8727 12.4444 13.3636 12.4444H15.1414C15.6323 12.4444 16.0303 12.8424 16.0303 13.3333C16.0303 13.8243 15.6323 14.2222 15.1414 14.2222H13.3636C12.8727 14.2222 12.4747 13.8243 12.4747 13.3333ZM4.47472 16.8889C3.9838 16.8889 3.58583 16.4909 3.58583 16C3.58583 15.5091 3.9838 15.1111 4.47472 15.1111H8.91916C9.41008 15.1111 9.80805 15.5091 9.80805 16C9.80805 16.4909 9.41008 16.8889 8.91916 16.8889H4.47472ZM12.4747 16C12.4747 15.5091 12.8727 15.1111 13.3636 15.1111H15.1414C15.6323 15.1111 16.0303 15.5091 16.0303 16C16.0303 16.4909 15.6323 16.8889 15.1414 16.8889H13.3636C12.8727 16.8889 12.4747 16.4909 12.4747 16ZM12.4747 8C12.4747 7.50908 12.8727 7.11111 13.3636 7.11111H15.1414C15.6323 7.11111 16.0303 7.50908 16.0303 8C16.0303 8.49092 15.6323 8.88889 15.1414 8.88889H13.3636C12.8727 8.88889 12.4747 8.49092 12.4747 8ZM12.4747 5.33333C12.4747 4.84241 12.8727 4.44444 13.3636 4.44444H15.1414C15.6323 4.44444 16.0303 4.84241 16.0303 5.33333C16.0303 5.82425 15.6323 6.22222 15.1414 6.22222H13.3636C12.8727 6.22222 12.4747 5.82425 12.4747 5.33333ZM12.4747 10.6667C12.4747 10.1757 12.8727 9.77778 13.3636 9.77778H15.1414C15.6323 9.77778 16.0303 10.1757 16.0303 10.6667C16.0303 11.1576 15.6323 11.5556 15.1414 11.5556H13.3636C12.8727 11.5556 12.4747 11.1576 12.4747 10.6667Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    <Typography 
                        fontSize={16}
                        fontWeight={600}
                        fontFamily='Inter'
                        >
                        {/*//@ts-expect-error title*/}
                        {ebContent?.title}
                    </Typography>
                    <Stack
                        direction='row'
                        gap={8}
                        mb={4}
                        >    
                        <Button 
                            sx={{
                                width: {xs: '50px', xl: '90px'},
                                height: '50px',
                                background: '#D30000',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '0',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: '#D30000',
                                    opacity: 1
                                }
                            }}
                            onClick={() => {
                                mutateDelete(ebContent.id)
                            }}
                            >
                            Delete
                        </Button>
                        <Button 
                            sx={{
                                width: {xs: '50px', xl: '90px'},
                                height: '50px',
                                background: '#226E9F',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '0',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: '##226E9F',
                                    opacity: 1
                                }
                            }}
                            onClick={() => {
                                setEdit(ebContent.id)
                            }}
                            >
                            Edit
                        </Button>
                    </Stack>
                </Stack>
                {
                    edit === ebContent.id &&
                    <ExamBankEditExam setEdited={setEdit} examBank={ebContent} />
                }
            </Stack>
        </Grid>
    ))

    return (
        <Stack
            direction='column'
            flex={1}
            mt={6}
            ml={6}
            width='100%'
            alignItems='flex-end'
        >
            <Stack
                direction='row'
                justifyContent='flex-end'
            >
                {
                    add &&
                    <>
                    <Stack
                        gap={1.5}
                        mx={6}
                        mb={3}
                    >
                        <InputLabel sx={{ color: '#000', fontSize: 16, fontFamily: 'Inter', fontWeight: 600 }} id='LessonTitle'>Title</InputLabel>
                        <Input 
                            color='primary' 
                            disableUnderline
                            aria-labelledby='LessonTitle'
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.20)',
                                width: '420px',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                                flex: 1,
                                bgcolor: '#F8F8F8'
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Stack>
                    </>
                }
                <Button
                    sx={{
                        background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                            opacity: 1
                        },
                        paddingY: 1,
                        paddingX: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 1,
                        width: '160px',
                        ml: 2,
                        maxHeight: '50px',
                        minHeight: '50px',
                        mt: 3
                    }}
                    onClick={() => {
                        if(!add)
                        {
                            setAdd(true)
                        }
                        else if(add && !title)
                        {
                            setAdd(false)
                        }
                        else if(add && title)
                        {
                            mutate()
                        }
                    }}
                >
                    <SvgIcon sx={{ fontSize: 20, fontWeight: 400 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.17479 0H10.8252C11.4319 0 11.9109 0.478992 11.9109 1.05378V7.12101H17.9462C18.521 7.12101 19 7.6 19 8.17479V10.8252C19 11.4319 18.521 11.9109 17.9462 11.9109H11.9109V17.9462C11.9109 18.521 11.4319 19 10.8252 19H8.17479C7.6 19 7.12101 18.521 7.12101 17.9462V11.9109H1.05378C0.478992 11.9109 0 11.4319 0 10.8252V8.17479C0 7.6 0.478992 7.12101 1.05378 7.12101H7.12101V1.05378C7.12101 0.478992 7.6 0 8.17479 0Z" fill="white"/>
                        </svg>
                    </SvgIcon>
                    <Typography textAlign='left' noWrap fontFamily='Inter' fontSize={14}>Add Exam</Typography>
                </Button>
            </Stack>
            {/* <Stack
                flexWrap='wrap'
                flexDirection='row'
                px={16}
                py={8}
                justifyContent='space-evenly'
                gap={12}
                flex={1}
            >
                {displayedContent}
            </Stack> */}
            <Grid container spacing={2} justifyContent='space-between' alignItems='center' columns={16}>
                {displayedContent}
            </Grid>
        </Stack>
    )
}
