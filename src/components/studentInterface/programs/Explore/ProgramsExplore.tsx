import { Box } from "@mui/material";
import { lazy, useState, Suspense, useContext, createContext, useEffect } from "react";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import ProgramProps from "../../../../interfaces/ProgramProps";
const ProgramsExploreHome = lazy(() => import("./ProgramsExploreHome"))
const ProgramsExploreProgram = lazy(() => import("./ProgramsExploreProgram"))

//@ts-expect-error context
export const ProgramExploreContext = createContext()

interface ProgramsExplore{
    setTab: React.Dispatch<React.SetStateAction<string>>
}

export default function ProgramsExplore({ setTab }: ProgramsExplore) 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { id } = useParams()

    const [filters, setFilters] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedFilters, setSelectedFilters] = useState<any>({
        Language: [],
        Level: [],
        Rating: []
    })
    //filters cant be applied until confirm is clicked, note for queries too
    const [applyFilters, setApplyFilters] = useState(false)
    const [pageShowed, setPageShowed] = useState('home')

    const { data: explorePrograms, isLoading } = useQuery({
        queryKey: ['explorePrograms', userData?.id],
        queryFn: () => getExplorePrograms(),
        enabled: !!userData,
    })

    useEffect(() => {
        if(pageShowed !== 'home')
        {
            const programFound = explorePrograms?.find(program => program.id === pageShowed)
            if(!programFound) setTab('Explore')
        }
    //eslint-disable-next-line
    }, [pageShowed])

    useEffect(() => {
        if(id) setPageShowed(id)
    }, [id])

    // useEffect(() => {
    //     refetch()
    // }, [userData, refetch])

    async function getExplorePrograms()
    {
        const programsRef = collection(db, 'programs')

        const cPrograms = queryClient.getQueryData(['currentPrograms', userData?.id])

        //@ts-expect-error array
        if(cPrograms?.length)
        {
            //@ts-expect-error idd
            const q = query(programsRef, where(documentId(), 'not-in', cPrograms?.map(program => program.id)))
    
            const querySnapshot  = await getDocs(q)

            // const filteredArray = querySnapshot.docs.slice().filter(doc => !userData.favoritePrograms.includes(doc.id))
    
            const exploreProgramsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
    
            return exploreProgramsData
        }
        else
        {
            const querySnapshot  = await getDocs(programsRef)
    
            // const filteredArray = querySnapshot.docs.slice().filter(doc => !userData.favoritePrograms.includes(doc.id))
    
            const exploreProgramsData = querySnapshot.docs.map(doc => ({
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
    
    if(isLoading) return <></>
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
                        {/* //@ts-expect-error pageShowed */}
                        <ProgramsExploreProgram explorePrograms={explorePrograms as ProgramProps[]} />
                    </Suspense>
                }
            </Box>
        </ProgramExploreContext.Provider>
    )
}
