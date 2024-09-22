import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Slide, Stack, SvgIcon, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useContext, useState } from "react";
import { getExamBank } from "../../helpers/getExamBank";
import ExamBankContent from "./ExamBankContent";
import { setExamBankMajor } from "../../helpers/setExamBankMajor";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { setEditExamBankMajor } from "../../helpers/setEditExamBankMajor";
import { TransitionProps } from '@mui/material/transitions';
import { AuthContext } from "../../authentication/auth/AuthProvider";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});
// const ExamBankCard = lazy(() => import("./ExamBankCard"))
// const QuizBank = lazy(() => import("./QuizBank"))

export default function ExamBank() 
{
    const queryClient = useQueryClient()

    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const isAdmin = userData.email === import.meta.env.VITE_ADMIN_EMAIL
    const [selectedMajor, setSelectedMajor] = useState(null)
    const [add, setAdd] = useState(false)
    const [majorAdded, setMajorAdded] = useState('')
    const [open, setOpen] = useState(true)
    const [edit, setEdit] = useState('')
    const [edited, setEdited] = useState('')
    const [deleted, setDeleted] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const { data: examBankMajors } = useQuery({
        queryKey: ['examBankMajors'],
        queryFn: () => getExamBank({ isAdmin, teacherId: userData.id })
    })

    const { mutate } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['examBankMajors'])

            queryClient.setQueryData(['examBankMajors'], (oldData: unknown) => {
                //@ts-expect-error oldData
                return (oldData && oldData?.length > 0) ? [...oldData, { major: majorAdded, content: [] }] : [{ major: majorAdded, content: [] }]
            })

            return () => queryClient.setQueryData(['examBankMajors'], previousData)
        },
        onSettled: () => setMajorAdded(''),
        mutationFn: () => setExamBankMajor(majorAdded, userData.id)
    })

    const { mutate: mutateEdit } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['examBankMajors'])

            queryClient.setQueryData(['examBankMajors'], (oldData: unknown) => {
                //@ts-expect-error oldData
                return (oldData && oldData?.length > 0) ? oldData.map((major: unknown) => major.id === edit ? { ...major, major: edited } : major) : []
            })

            return () => queryClient.setQueryData(['examBankMajors'], previousData)
        },
        onSettled: () => {
            setEdit('')
            setEdited('')
            queryClient.invalidateQueries({ queryKey: ['examBankMajors'] })
        },
        mutationFn: () => setEditExamBankMajor(edited, edit)
    })

    const { mutate: mutateDelete } = useMutation({
        onMutate: () => {
            const previousData = queryClient.getQueryData(['examBankMajors'])

            queryClient.setQueryData(['examBankMajors'], (oldData: unknown) => {
                //@ts-expect-error oldData
                return (oldData && oldData?.length > 0) ? oldData.filter((major: unknown) => major.id !== deleted) : []
            })

            return () => queryClient.setQueryData(['examBankMajors'], previousData)
        },
        onSettled: () => {
            setDeleted('')
            queryClient.invalidateQueries({ queryKey: ['examBankMajors'] })
        },
        mutationFn: () => setEditExamBankMajor('', deleted, true)
    })

    const displayedMajors = examBankMajors?.map(major => (
        <Box
            px={4}
            my={3.5}
            py={2}
            width='100%'
            //@ts-expect-error major
            bgcolor={selectedMajor?.id === major?.id ? '#fff' : ''}
            //@ts-expect-error major
            onClick={() => setSelectedMajor(major)}
            sx={{
                cursor: 'pointer'
            }}
            textAlign='center'
            key={major.id}
        >
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                px={4}
            >    
                {
                    edit !== major.id ?
                    //@ts-expect-error major
                    <Typography alignSelf='center' noWrap fontSize={18} fontFamily='Inter' fontWeight={600}>{major?.major}</Typography>
                    :
                    <Stack
                        direction='row'
                        gap={0.5}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Input
                            value={edited}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setEdited(e.target.value)}
                        />
                        <CheckIcon 
                            onClick={(e) => { 
                                e.stopPropagation()
                                mutateEdit()
                            }} 
                            sx={{ fontSize: 20, color: '#9ca3af', p: 0.5, ':hover': { boxShadow: 'inset 0px 0px 12px 0px rgba(0, 0, 0, 0.1)', borderRadius: '9999px' } }} />
                    </Stack>
                }
                <Stack
                    direction='column'
                    gap={0.5}
                >

                    <EditIcon 
                        onClick={(e) => {
                            e.stopPropagation()
                            setEdit(major.id)
                            //@ts-expect-error major
                            setEdited(major.major)
                        }}
                        sx={{ fontSize: 20, color: '#9ca3af', p: 0.5, ':hover': { boxShadow: 'inset 0px 0px 12px 0px rgba(0, 0, 0, 0.1)', borderRadius: '9999px' } }} 
                    />
                    <DeleteForeverIcon 
                        onClick={(e) => {
                            e.stopPropagation()
                            setDialogOpen(true)
                            setDeleted(major.id)
                        }} 
                        sx={{ fontSize: 20, color: '#9ca3af', p: 0.5, ':hover': { boxShadow: 'inset 0px 0px 12px 0px rgba(0, 0, 0, 0.1)', borderRadius: '9999px' } }} />

                </Stack>
            </Stack>
        </Box>
    ))

    const handleClose = () => {
        setDialogOpen(false)
    }

    return (
        <Box
            width='100%'
            display='flex'
            flexDirection='row'
            zIndex={1}
            minHeight='77.8vh'
        >
            {
                deleted &&
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        style: {
                            borderRadius: '20px',
                            overflow: 'hidden',
                        }
                    }}
                >
                    <DialogTitle sx={{ mx: 1, mt: 2, mb: 3 }}>Are you sure you want to delete This ExamBank Major?</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly', mx: 4, mb: 4 }}>
                    <Button 
                        sx={{
                            width: '120px',
                            height: '50px',
                            background: '#fff',
                            color: '#000',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 400,
                            border: '1px solid #000',
                            borderRadius: '10px',
                            '&:hover': {
                                background: '#fff',
                                opacity: 1
                            }
                        }}
                        onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button 
                        sx={{
                            width: '120px',
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
                            mutateDelete()
                            handleClose()
                        }}
                    >
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            }
            <Box
                bgcolor='#D0EBFC'
                display='flex'
                alignItems='center'
                minHeight='100vh'
                justifyContent='flex-start'
                flexDirection='column'
                position='sticky'
                left={0}
                width={open ? 'auto' : '50px'}
            >
                <Box
                    px={8}
                    pt={6}
                    textAlign='center'
                >
                    <SvgIcon onClick={() => setOpen(prev => !prev)} sx={{ cursor: 'pointer', position: 'absolute', zIndex: 2, top: '2.5%', left: !open ? '20%' : '85%', ':hover': { boxShadow: 'inset 0px 0px 0px 9999px rgba(0, 0, 0, 0.05)', borderRadius: '9999px' }, p: 0.5, alignSelf: 'center' }}>
                        {
                            open 
                            ?
                            <ArrowBackIosIcon sx={{ color: '#226E9F' }} />
                            :
                            <ArrowForwardIosIcon sx={{ color: '#226E9F' }} />
                        }
                    </SvgIcon>
                </Box>
                {open && displayedMajors}
                {
                    open && add &&
                    <Input
                        sx={{ 
                            flex: 1,
                            fontSize: 20,
                            width: add ? 'auto' : '0px',
                            maxHeight: add ? '40px' : '0px',
                            minHeight: add ? '40px' : '0px',
                            mb: 2,
                            ml: 1,
                            transition: '0.5s',
                            bgcolor: '#fcfcfc',
                            borderRadius: '5px',
                            border: add ? '1px solid #6A9DBC' : '',
                            px: 2
                        }}
                        disableUnderline
                        value={majorAdded}
                        onChange={(e) => setMajorAdded(e.target.value)}
                    />
                }
                {open && <Button
                    sx={{
                        flex: 1,
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
                        mx: 'auto',
                        maxHeight: '50px',
                        minHeight: '50px'
                    }}
                    onClick={() => {
                        if(!add)
                        {
                            setAdd(true)
                        }
                        else if(add && !majorAdded)
                        {
                            setAdd(false)
                        }
                        else if(add && majorAdded)
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
                    <Typography textAlign='left' noWrap fontFamily='Inter' fontSize={14}>Add Major</Typography>
                </Button>}
            </Box>
            {
                selectedMajor ?
                //@ts-expect-error major
                <ExamBankContent {...selectedMajor} />
                :
                <></>
            }
        </Box>
    )
}
