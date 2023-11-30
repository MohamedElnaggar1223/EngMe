import { Box } from "@mui/material";
import { lazy, useState, Suspense } from "react";
const ProgramsExploreHome = lazy(() => import("./ProgramsExploreHome"))
const ProgramsExploreProgram = lazy(() => import("./ProgramsExploreProgram"))

export default function ProgramsExplore() 
{

    const [filters, setFilters] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedFilters, setSelectedFilters] = useState<any>({
        Language: [],
        Major: [],
    })
    //filters cant be applied until confirm is clicked, note for queries too
    const [applyFilters, setApplyFilters] = useState(false)
    const [pageShowed, setPageShowed] = useState('home')

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
                        setPageShowed={setPageShowed}
                    />
                </Suspense> :
                <Suspense>
                    <ProgramsExploreProgram 
                        setPageShowed={setPageShowed}
                    />
                </Suspense>
            }
        </Box>
    )
}
