import { Box } from "@mui/material";
import { Suspense, lazy, useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../../authentication/auth/AuthProvider";
const DefaultStudentCard = lazy(() => import("./StudentCardComponents/DefaultStudentCard"));
const EditStudentCard = lazy(() => import("./StudentCardComponents/EditStudentCard"))

export default function StudentCard() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const [name, setName] = useState(userData?.name)
    const [major, setMajor] = useState(userData?.occupation ?? 'Software Engineer')
    const [city, setCity] = useState('Cairo')
    const [country, setCountry] = useState('Egypt')
    const [image, setImage] = useState(userData?.image)
    const [edit, setEdit] = useState(false)

    useLayoutEffect(() => {
        setName(userData?.name)
        setImage(userData?.image)
    }, [userData])

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
