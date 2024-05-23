import { Avatar, Stack, Typography } from '@mui/material'
import ProgramProps from '../../../interfaces/ProgramProps'
import { useContext, useState } from 'react'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Close } from '@mui/icons-material'
import logo from '../../../assets/Ellipse 1.png'

export default function CredentialCard(program: ProgramProps) 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    console.log(userData)

    const [displayed, setDisplayed] = useState<boolean>(false)

    const generatePdf = () => {
        const input = document.getElementById('certificate-content')
        html2canvas(input!)
            .then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'landscape'
            })
            pdf.addImage({
                imageData: imgData,
                x: 0,
                y: -870,
                width: 1920,
                height: 1080,
                format: 'PNG',
            })
            pdf.internal.pageSize.height = 1080
            pdf.internal.pageSize.width = 1920
            pdf.save(`${userData.name}_${program.name}_certificate.pdf`)
        })
    }

    return (
        <>
            <Stack
                alignItems='center'
                width='fit-content'
                gap={1.5}
                onMouseDown={() => setDisplayed(true)}
                className='cursor-pointer'
            >
                <Avatar src={program?.image} sx={{ width: '82px', height: '82px' }} />
                <Typography
                    fontSize={18}
                    fontFamily='Inter'
                    fontWeight={800}
                    sx={{
                        color: '#226E9F'
                    }}
                >
                    {program?.name}
                </Typography>
            </Stack>
            {displayed && (
                <div className='overflow-hidden bg-white rounded-md h-screen max-h-[680px] flex flex-col w-screen max-w-[1280px] fixed top-[10%] left-[12%] shadow-[0px_0px_3000px_3000px_rgba(0,0,0,0.5)] z-[999999999999999999999]'>
                    <div id="certificate-content" className='flex flex-1 w-full items-center justify-center max-h-[680px] bg-white overflow-hidden text-center border-[100px]'>
                        <div className='flex flex-col items-center justify-center gap-8' style={{ padding: '10px', backgroundColor: '#fff' }}>
                            <h3 className='font-semibold text-4xl font-serif'>Certificate of Achievement</h3>
                            <p>Awarded to</p>
                            <h1 className='font-extrabold text-7xl font-serif'>{userData.name}</h1>
                            <p>for completing <span className='font-serif font-semibold'>{program.name}</span></p>
                            <div className='w-full flex items-center justify-end mt-auto'>
                                <Avatar src={logo} sx={{ width: 70, height: 70, bgcolor: '#fff' }} alt='engme' variant="circular" />
                            </div>
                        </div>
                    </div>
                    <button className='px-2 py-2 bg-orange-400 w-fit mx-auto rounded-md my-2 text-white' onClick={generatePdf}>Download Certificate</button>
                    <div onMouseDown={() => setDisplayed(false)} className='absolute top-5 right-5 cursor-pointer'>
                        <Close />
                    </div>
                </div>
            )}
        </>
    )
}
