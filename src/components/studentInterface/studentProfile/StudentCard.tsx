import { Box } from "@mui/material";
import profile from '../../../assets/studentprofile.jfif'
import { Suspense, lazy, useState } from "react";
const DefaultStudentCard = lazy(() => import("./StudentCardComponents/DefaultStudentCard"));
const EditStudentCard = lazy(() => import("./StudentCardComponents/EditStudentCard"))

export default function StudentCard() 
{
    const [name, setName] = useState('Lama Amr Mohamady')
    const [major, setMajor] = useState('Software Engineer')
    const [city, setCity] = useState('Cairo')
    const [country, setCountry] = useState('Egypt')
    const [image, setImage] = useState(profile)
    const [edit, setEdit] = useState(false)

    return (
        <Box
            mx={14}
            display='flex'
            flexDirection='row'
            alignItems='center'
            bgcolor='#FEF4EB'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            borderRadius='0px 0px 20px 20px'
            width='auto'
            // gap={2}
            py={4}
            zIndex={0}
            position='relative'
            justifyContent='space-between'
            // pr={8}
            minHeight='200px'
            // mb={10}
        >
            {
                edit ?
                <Suspense>
                    <EditStudentCard 
                        name={name} 
                        major={major} 
                        city={city} 
                        country={country} 
                        image={image} 
                        setEdit={setEdit}
                        setName={setName}
                        setMajor={setMajor}
                        setCity={setCity}
                        setCountry={setCountry}
                        setImage={setImage}
                    />
                </Suspense>
                     :
                <Suspense>
                    <DefaultStudentCard 
                        name={name} 
                        major={major} 
                        city={city} 
                        country={country} 
                        image={image} 
                        setEdit={setEdit} 
                    />
                </Suspense>
            }
        </Box>
    )
}
