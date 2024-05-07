import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useNavigate, useParams } from "react-router-dom"
import { Document, Page, pdfjs } from 'react-pdf';
import { db } from "../../../firebase/firebaseConfig"
import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import { getStudentCurrentPrograms } from "../../helpers/getStudentCurrentPrograms";

export default function KnowledgeBankPdf() 
{
    const { id } = useParams()

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const navigate = useNavigate()

    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: studentPrograms } = useQuery({
        queryKey: ['studentPrograms', userData?.id],
        queryFn: () => getStudentCurrentPrograms(userData?.id)
    })

    const allowedKnowledgeBank = useMemo(() => {
        return (studentPrograms?.slice().filter(program => program?.knowledgeBank)?.length ?? 0) > 0
    }, [studentPrograms])

    useEffect(() => {
        if(!allowedKnowledgeBank) navigate('/') 
    }, [allowedKnowledgeBank, navigate])

    const getKnowledgeBank = async (id: string) => {
        const knowledgeBankRef = doc(db, 'knowledgeBankContent', id)
        const knowledgeBankDoc = await getDoc(knowledgeBankRef)

        if(knowledgeBankDoc.data()?.content !== undefined)
        {
            const storage = getStorage();
            const storageRef = ref(storage, `KnowledgeBank/${knowledgeBankDoc.data()?.content}`);
            const dataDisplayed = await getDownloadURL(storageRef)
    
            const knowledgeBankData = {...knowledgeBankDoc.data(), id: knowledgeBankDoc.id, dataDisplayed}
    
            pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


            return knowledgeBankData
        }
        else return null
    }

    const { data: knowledgeBank } = useQuery({
        queryKey: ['knowledgeBankSession', id],
        queryFn: () => getKnowledgeBank(id ?? '')
    })

    // useEffect(() => {
    //     if(knowledgeBank?.dataDisplayed) {
    //         window.location.replace(knowledgeBank?.dataDisplayed)
    //     }
    // }, [knowledgeBank])

    // const displayedContent = 
    //     knowledgeBank?.dataDisplayed ?
    //     knowledgeBank?.content?.type === 'Videos/' ?
    //     <div>
    //         <video controls width="600" height="400">
    //         <source src={knowledgeBank?.dataDisplayed} type="video/mp4" />
    //         Your browser does not support the video tag.
    //         </video>
    //     </div>
    //     :
    //     <div>
    //         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
    //             <Viewer httpHeaders={{ 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Origin': 'http://localhost:5173/' }} withCredentials={true} fileUrl={knowledgeBank?.dataDisplayed} />
    //         </Worker>
    //     </div>
    //     :
    //     <>No Data Yet!</>

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);

    }

    return (
        <Box sx={{ width: '950px', mx: 'auto', display: 'flex', flex: 1, '*': { width: '100%' }, mt: 5 }}>
            <Stack
                direction="column"
                alignItems="center"
            >
                <Button sx={{ textTransform: 'none', fontSize: 16 }} onClick={() => navigate('/knowledgebank')}>Back</Button>
            </Stack>
            <Document
                file={knowledgeBank?.dataDisplayed}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page width={850} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
            <Stack
                direction="column"
                alignItems="center"
            >
                <Typography noWrap sx={{ width: '100%' }}>Page {pageNumber} of {numPages}</Typography>
                <Button sx={{ textTransform: 'none', fontSize: 16 }} disabled={pageNumber === numPages} onClick={() => setPageNumber(prev => prev + 1)}>Next</Button>
                <Button sx={{ textTransform: 'none', fontSize: 16 }} disabled={pageNumber === 1} onClick={() => setPageNumber(prev => prev - 1)}>Previous</Button>
            </Stack>
        </Box>    
    )
}
