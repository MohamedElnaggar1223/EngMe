import ProgramProps from "./ProgramProps";

export default interface ProgramExploreCardProps{
    setPageShowed?: React.Dispatch<React.SetStateAction<string>>,
    program: ProgramProps
}
