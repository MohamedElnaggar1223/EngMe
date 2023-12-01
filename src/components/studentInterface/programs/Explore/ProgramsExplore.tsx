import { Box } from "@mui/material";
import { lazy, useState, Suspense, useContext, createContext } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
const ProgramsExploreHome = lazy(() => import("./ProgramsExploreHome"))
const ProgramsExploreProgram = lazy(() => import("./ProgramsExploreProgram"))

//@ts-expect-error context
export const ProgramExploreContext = createContext()

//@ts-expect-error current
export default function ProgramsExplore({ currentPrograms }) 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [filters, setFilters] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedFilters, setSelectedFilters] = useState<any>({
        Language: [],
        Major: [],
    })
    //filters cant be applied until confirm is clicked, note for queries too
    const [applyFilters, setApplyFilters] = useState(false)
    const [pageShowed, setPageShowed] = useState('home')

    const { data: explorePrograms } = useQuery({
        queryKey: ['explorePrograms', userData?.id],
        queryFn: () => getExplorePrograms(),
        enabled: !!userData,
        refetchOnMount: false
    })

    // useEffect(() => {
    //     refetch()
    // }, [userData, refetch])

    async function getExplorePrograms()
    {
        const programsRef = collection(db, 'programs')

        if(currentPrograms?.length)
        {
            //@ts-expect-error idd
            const q = query(programsRef, where(documentId(), 'not-in', currentPrograms?.map(program => program.programId)))
    
            const querySnapshot  = await getDocs(q)

            const filteredArray = querySnapshot.docs.slice().filter(doc => !userData.favoritePrograms.includes(doc.id))
    
            const exploreProgramsData = filteredArray.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
    
            return exploreProgramsData
        }
        else
        {
            const querySnapshot  = await getDocs(programsRef)
    
            const filteredArray = querySnapshot.docs.slice().filter(doc => !userData.favoritePrograms.includes(doc.id))
    
            const exploreProgramsData = filteredArray.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            // console.log(exploreProgramsData, 'testprogexdocs')
    
            return exploreProgramsData
        }
    }

    function handleFilters(type: string, e: React.ChangeEvent<HTMLInputElement>)
    {
        const oldArray = selectedFilters[type]
        const newArray = [...oldArray, e.target.value]
        const newFilters = {...selectedFilters, [type]: newArray}
        setSelectedFilters(newFilters)
    }

    function handleRemoveFilter(filter: string, item: string)
    {
        const oldArray = selectedFilters[filter]
        //@ts-expect-error item
        const newArray = oldArray.filter(fitem => fitem !== item)
        const newFilters = {...selectedFilters, [filter]: newArray}
        setSelectedFilters(newFilters)
    }
    
    return (
        <ProgramExploreContext.Provider value={{ setPageShowed, pageShowed }}>
            <Box
                my={5}
            >
                {
                    pageShowed === 'home' ?
                    <Suspense>
                        <ProgramsExploreHome 
                            applyFilters={applyFilters}
                            filters={filters}
                            handleFilters={handleFilters}
                            handleRemoveFilter={handleRemoveFilter}
                            setApplyFilters={setApplyFilters}
                            setFilters={setFilters}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            explorePrograms={explorePrograms}
                        />
                    </Suspense> :
                    <Suspense>
                        <ProgramsExploreProgram />
                    </Suspense>
                }
            </Box>
        </ProgramExploreContext.Provider>
    )
}
