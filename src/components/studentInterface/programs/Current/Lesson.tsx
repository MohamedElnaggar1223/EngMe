import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { db } from "../../../../firebase/firebaseConfig"
import { useQuery } from "@tanstack/react-query"
import { getDownloadURL, getStorage, ref } from "firebase/storage"

export default function Lesson() 
{
    const { id } = useParams()

    const getLesson = async (id: string) => {
        const lessonRef = doc(db, 'lessons', id)
        const lessonDoc = await getDoc(lessonRef)

        if(lessonDoc.data()?.content !== undefined && lessonDoc.data()?.content.content !== undefined)
        {
            console.log(lessonDoc.data())
            const storage = getStorage();
            const storageRef = ref(storage, `${lessonDoc.data()?.content?.type}${lessonDoc.data()?.content?.content}`);
            const dataDisplayed = await getDownloadURL(storageRef)

            console.log(dataDisplayed)
    
            const lessonData = {...lessonDoc.data(), id: lessonDoc.id, dataDisplayed}
    
            return lessonData
        }
    }

    const { data: lesson } = useQuery({
        queryKey: ['lessonSession'],
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

    return (
        //@ts-expect-error lesson
        lesson?.content?.type === 'Videos/' ?
        <embed src={lesson?.dataDisplayed} type="application/pdf" width="100%" height="900px" />
        :
        <embed src={lesson?.dataDisplayed} type="video/mp4" width="100%" height="900px" />
    )
}