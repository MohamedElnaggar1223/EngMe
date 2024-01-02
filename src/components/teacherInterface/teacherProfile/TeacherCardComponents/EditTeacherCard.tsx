// import { Stack, Box, Button, Input, Select, MenuItem } from '@mui/material'
import { Suspense, lazy, memo, useContext } from 'react';
const Stack = lazy(() => import('@mui/material/Stack'))
const Box = lazy(() => import('@mui/material/Box'))
const Button = lazy(() => import('@mui/material/Button'))
//eslint-disable-next-line
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../../authentication/auth/AuthProvider'
import { setTeacherData } from '../../../helpers/setTeacherData'
import { Input } from '@mui/material';

//eslint-disable-next-line
function EditTeacherCard({ title, name, image, university, setName, setTitle, setImage, setUniversity, setEdit }: {title: string, name: string, image: string, university: string, setUniversity: React.Dispatch<any>, setName: React.Dispatch<any>, setImage: React.Dispatch<any>, setTitle: React.Dispatch<any>, setEdit: React.Dispatch<React.SetStateAction<boolean>>}) 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string)
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setImage(result),
        );
    }

    const { mutate } = useMutation({
        onMutate: () => {
            setEdit(false)
        },
        mutationFn: () => setTeacherData(userData.id, name, title, university, image)
    })

    return (
        <Suspense>
        <Box
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            gap={4}
        >
            <Box
                position='relative'
                width='250px'
                minWidth='250px'
                height='250px'
                borderRadius='50%'
                overflow='hidden'
                mx={2}
                border='4px solid rgba(0, 0, 0, 0.80)'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                <Box
                    position='absolute'
                    bgcolor='#000'
                    width='100%'
                    height='100%'
                    sx={{
                        opacity: 0.5
                    }}
                >
                    
                </Box>
                <Button
                    //@ts-expect-error ddd
                    component='label'
                    sx={{
                        zIndex: 3,
                        position: 'relative',
                        background: '#FEF4EB',
                        color: '#000',
                        border: '1px solid #000',
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: 'Inter',
                        paddingX: 2.5,
                        paddingY: 1,
                        '&:hover': {
                            background: '#FEF4EB',
                            opacity: 1,
                        }
                    }}
                >
                    Edit Photo
                    <input
                        hidden
                        accept="image/*"
                        width='100%'
                        height='100%'
                        type="file"
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            handleImageChange(e.target.files![0]);
                        }}
                    />
                </Button>
            </Box>
            <Stack
                direction='column'
                gap={8}
                alignItems='center'
            >
                <Stack
                    direction='row'
                    gap={4}
                    alignItems='center'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    mr={4}
                >
                    <Input 
                        value={name} 
                        color='primary' 
                        disableUnderline
                        sx={{
                            border: '1px solid #226E9F',
                            width: '280px',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingX: 1,
                            paddingY: 0.5,
                        }}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                        value={title} 
                        color='primary' 
                        disableUnderline
                        sx={{
                            border: '1px solid #226E9F',
                            width: '280px',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingX: 1,
                            paddingY: 0.5,
                        }}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input 
                        value={university} 
                        color='primary' 
                        disableUnderline
                        sx={{
                            border: '1px solid #226E9F',
                            width: '280px',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingX: 1,
                            paddingY: 0.5,
                        }}
                        placeholder='University'
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                </Stack>
                <Stack
                    direction='row'
                    gap={3.5}
                    alignItems='center'
                    justifyContent='space-evenly'
                >
                    <Button
                        sx={{
                            width: '180px',
                            height: '45px',
                            background: '#fff',
                            color: '#000',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 600,
                            border: '2px solid #226E9F',
                            '&:hover': {
                                background: '#fff',
                                opacity: 1
                            }
                        }}
                        onClick={() => setEdit(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            width: '180px',
                            height: '45px',
                            background: '#D0EBFC',
                            color: '#000',
                            fontFamily: 'Inter',
                            fontSize: 14,
                            textTransform: 'none',
                            fontWeight: 600,
                            border: '2px solid #226E9F',
                            '&:hover': {
                                background: '#D0EBFC',
                                opacity: 1
                            }
                        }}
                        onClick={() => mutate()}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Stack>
        </Box>
        </Suspense>
    )
}

const memoizedEditTeacherCard = memo(EditTeacherCard)
export default memoizedEditTeacherCard