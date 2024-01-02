import { Box } from "@mui/material";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from "../../authentication/auth/AuthProvider";
import DefaultTeacherCard from "./TeacherCardComponents/DefaultTeacherCard";
import EditTeacherCard from "./TeacherCardComponents/EditTeacherCard";

export default function TeacherCard() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    
    const [edit, setEdit] = useState(false)

    const [name, setName] = useState(userData?.name)
    const [title, setTitle] = useState(userData?.title)
    const [university, setUniversity] = useState(userData?.university)
    const [image, setImage] = useState(userData?.image)

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
                    <EditTeacherCard university={university} setUniversity={setUniversity} name={name} title={title} image={image} setImage={setImage} setTitle={setTitle} setName={setName} setEdit={setEdit} />
                </Suspense>
                     :
                <Suspense>
                    <DefaultTeacherCard university={university} name={name} title={title} image={image} setEdit={setEdit} />
                </Suspense>
            }
        </Box>
    )
}
