export default interface ProgramsExploreHomeProps{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedFilters: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedFilters: React.Dispatch<any>,
    filters: boolean,
    setFilters: React.Dispatch<React.SetStateAction<boolean>>,
    applyFilters: boolean,
    setApplyFilters: React.Dispatch<React.SetStateAction<boolean>>,
    handleFilters: (type: string, e: React.ChangeEvent<HTMLInputElement>) => void,
    handleRemoveFilter: (filter: string, item: string) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    explorePrograms: any,
    displayedBundles: JSX.Element[] | undefined
}