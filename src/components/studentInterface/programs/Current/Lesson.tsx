import { doc, getDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../../../firebase/firebaseConfig"
import { useQuery } from "@tanstack/react-query"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import ReactPlayer from 'react-player'


export default function Lesson() 
{
    const { id } = useParams()

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const navigate = useNavigate()

    const getLesson = async (id: string) => {
        const lessonRef = doc(db, 'lessons', id)
        const lessonDoc = await getDoc(lessonRef)

        if(lessonDoc.data()?.content !== undefined && lessonDoc.data()?.content.content !== undefined)
        {
            const storage = getStorage();
            const storageRef = ref(storage, `${lessonDoc.data()?.content?.type}${lessonDoc.data()?.content?.content}`);
            const dataDisplayed = await getDownloadURL(storageRef)

            const course = await getDoc(doc(db, 'courses', lessonDoc.data()?.courseId))
    
            const lessonData = {...lessonDoc.data(), id: lessonDoc.id, dataDisplayed, programId: course.data()?.programId}
    
            pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

            return lessonData
        }
    }

    const { data: lesson } = useQuery({
        queryKey: ['lessonSession', id],
        queryFn: () => getLesson(id ?? '')
    })

    // useEffect(() => {
    //     if(lesson?.dataDisplayed) {
    //         window.location.replace(lesson?.dataDisplayed)
    //     }
    // }, [lesson])

    // const displayedContent = 
    //     lesson?.dataDisplayed ?
    //     lesson?.content?.type === 'Videos/' ?
    //     <div>
    //         <video controls width="600" height="400">
    //         <source src={lesson?.dataDisplayed} type="video/mp4" />
    //         Your browser does not support the video tag.
    //         </video>
    //     </div>
    //     :
    //     <div>
    //         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
    //             <Viewer httpHeaders={{ 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Origin': 'http://localhost:5173/' }} withCredentials={true} fileUrl={lesson?.dataDisplayed} />
    //         </Worker>
    //     </div>
    //     :
    //     <>No Data Yet!</>

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);

    }

    return (
        //@ts-expect-error lesson
        lesson?.content?.type === 'Videos/' ?
        <>
            <Stack
                direction="column"
                alignItems="start"
            >
                <Button sx={{ textTransform: 'none', fontSize: 16 }} onClick={() => navigate(`/programs/current/${lesson?.programId}`)}>Back</Button>
            </Stack>
            <ReactPlayer url={lesson?.dataDisplayed} width="100%" height="100%" controls={true} config={{ file: { attributes: { controlsList: 'nodownload' } } }} />
        </>
        :
        // <embed src={lesson?.dataDisplayed} type="video/mp4" width="100%" height="900px" />
        <Box sx={{ width: '950px', mx: 'auto', display: 'flex', flex: 1, '*': { width: '100%' }, mt: 5 }}>
            <Stack
                direction="column"
                alignItems="center"
            >
                <Button sx={{ textTransform: 'none', fontSize: 16 }} onClick={() => navigate(`/programs/current/${lesson?.programId}`)}>Back</Button>
            </Stack>
            <Document
                file={lesson?.dataDisplayed}
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