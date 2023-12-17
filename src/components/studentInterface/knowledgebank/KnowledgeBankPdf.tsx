import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useParams } from "react-router-dom"
import { db } from "../../../firebase/firebaseConfig"

export default function KnowledgeBankPdf() 
{
    const { id } = useParams()

    const getKnowledgeBank = async (id: string) => {
        const knowledgeBankRef = doc(db, 'knowledgeBankContent', id)
        const knowledgeBankDoc = await getDoc(knowledgeBankRef)

        if(knowledgeBankDoc.data()?.content !== undefined)
        {
            const storage = getStorage();
            const storageRef = ref(storage, `KnowledgeBank/${knowledgeBankDoc.data()?.content}`);
            const dataDisplayed = await getDownloadURL(storageRef)
    
            const knowledgeBankData = {...knowledgeBankDoc.data(), id: knowledgeBankDoc.id, dataDisplayed}
    
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

    return (
        <embed src={knowledgeBank?.dataDisplayed} type="application/pdf" width="100%" height="900px" />
    )
}
