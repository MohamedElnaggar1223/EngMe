import { Box, Stack, Typography, FormControl, TextField, TextareaAutosize, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function CompanyRegister() 
{
    const [companyName, setCompanyName] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSendMail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const headers = {
                "Content-Type": "application/json"
            }
            await axios.post('https://engmestripeapi.vercel.app/send-mail-company', {
                companyName,
                email: companyEmail,
                name,
                message: details
            }, {
                headers
            })
            setLoading(false)
            setCompanyName('')
            setCompanyEmail('')
            setName('')
            setDetails('')
        } catch (error) {
            console.error(error)
            setError('An error occurred while sending the email')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
        >
            <Stack flex={1} mb={4} textAlign='center'>
                <Typography fontSize={20} fontFamily='Inter' fontWeight={700}>Apply to be on our team!</Typography>
            </Stack>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                }}
                onSubmit={handleSendMail}
            >
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        disabled={loading}
                        fullWidth
                        required
                        
                        color="info"
                        variant="outlined"
                        placeholder="Company's Name"
                        type='text'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'left',
                                textIndent: '80px',
                                fontSize: 18,
                                // border: '1px solid rgba(0, 0, 0, 1)',
                                borderRadius: '5px'
                            }
                        }}
                    />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        disabled={loading}
                        fullWidth
                        required
                        
                        color="info"
                        variant="outlined"
                        placeholder="Company's Email"
                        type='text'
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'left',
                                textIndent: '80px',
                                fontSize: 18,
                                // border: '1px solid rgba(0, 0, 0, 1)',
                                borderRadius: '5px'
                            }
                        }}
                    />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <TextField 
                        disabled={loading}
                        fullWidth
                        required
                        
                        color="info"
                        variant="outlined"
                        placeholder="Full Name"
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'left',
                                textIndent: '80px',
                                fontSize: 18,
                                // border: '1px solid rgba(0, 0, 0, 1)',
                                borderRadius: '5px'
                            }
                        }}
                    />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <TextareaAutosize 
                        minRows={8}
                        disabled={loading}
                        required
                        color="info"
                        placeholder="Type your text here"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.20)',
                            width: 'auto',
                            background: '#fff',
                            borderRadius: '5px',
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 10,
                            paddingLeft: 92,
                            flex: 1,
                            backgroundColor: '#fff',
                            overflowWrap: 'break-word',
                            height: '100% !important',
                            fontSize: '18px',
                            fontFamily: 'Inter',
                        }}
                    />
                </FormControl>
                <Button
                    sx={{
                        flex: 1,
                        background: '#226E9F',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: 18,
                        textTransform: 'none',
                        fontWeight: 500,
                        border: '1px solid #226E9F',
                        borderRadius: '6px',
                        '&:hover': {
                            background: '#226E9F',
                            opacity: 1
                        },
                        paddingY: 1.5,
                        opacity: loading ? 0.65 : 1
                    }}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </Button>
                {error && <Typography color='error'>{error}</Typography>}
            </form>
        </Box>
    )
}
