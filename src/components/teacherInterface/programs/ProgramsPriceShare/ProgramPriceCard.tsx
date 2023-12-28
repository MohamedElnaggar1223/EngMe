import { Box, Stack, Typography, Button, Input, Alert, IconButton, InputAdornment } from "@mui/material";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { setTeacherShareProgram } from "../../../helpers/setTeacherShareProgram";
import PercentIcon from '@mui/icons-material/Percent';

export default function ProgramPriceCard(program: ProgramProps) 
{
    const [priceShare, setPriceShare] = useState(program.teacherShare ?? '')
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)

    const { mutate } = useMutation({
        onMutate: () => setDisabled(true),
        onSettled: () => setDisabled(false),
        mutationFn: () => setTeacherShareProgram(priceShare, program.id)
    })

    return (
        <Box
            display='flex'
            flexDirection='column'
            px={8}
            py={4}
            bgcolor='#FFFBF8'
            borderRadius='25px'
            flex={1}
            alignItems='center'
            justifyContent='space-between'
            boxShadow='0px 4px 6px 0px rgba(0, 0, 0, 0.25)'
        >
            <Stack
                direction='row'
                flex={1}
                width='100%'
                alignItems='center'
                justifyContent='space-between'
            >
                <Stack
                    direction='column'
                    gap={4} 
                >
                    <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={20}>{program?.name}</Typography>
                    <Stack
                        direction='row'
                        gap={8}
                    >
                        <Typography noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>{program?.price}EGP</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='column'
                    gap={4} 
                >
                    {error && <Alert severity="error">{error}</Alert>}
                    <Typography alignSelf='flex-start' noWrap fontFamily='Inter' fontWeight={500} fontSize={16}>Teacher's Share in %</Typography>
                    <Stack
                        direction='row'
                        height='35px'
                    >
                        <Input
                            sx={{ 
                                flex: 1,
                                marginRight: 2,
                                fontSize: 20,
                                width: '95px',
                                transition: '0.5s',
                                bgcolor: '#fcfcfc',
                                borderRadius: '5px',
                                border: '1px solid #6A9DBC',
                                paddingX: 2,
                                textAlign: 'right'
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <PercentIcon sx={{ fontSize: 20, p: 0, m: 0 }} />
                                </InputAdornment>
                            }
                            disableUnderline
                            type='text'
                            value={priceShare}
                            onChange={(e) => {
                                setError('')
                                setPriceShare(e.target.value)
                            }}
                        />
                        <Button
                            sx={{
                                background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                                color: '#fff',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 400,
                                border: '1px solid linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                                    opacity: 1
                                },
                                paddingX: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '160px',
                                alignSelf: 'flex-end',
                                height: '38px'
                            }}
                            onClick={() => {
                                if(!Number(priceShare)) setError('Please Enter a Valid Share!')
                                else mutate()
                            }}
                            disabled={disabled}
                        >
                            Change
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}
