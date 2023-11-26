export default interface StudentCardEditProps{
    name: string,
    major: string,
    city: string,
    country: string,
    image: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setMajor: React.Dispatch<React.SetStateAction<string>>,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    setCountry: React.Dispatch<React.SetStateAction<string>>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}