export default interface StudentCardProps{
    name: string,
    major: string,
    city: string,
    country: string,
    image: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}