import { Stack, Box, Button, Input, Select, MenuItem } from '@mui/material'
import StudentCardEditProps from '../../../../interfaces/StudentCardEditProps'
import { Country, City }  from 'country-state-city'
import { memo, useEffect, useState } from 'react';
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useQuery } from '@tanstack/react-query';

//eslint-disable-next-line
function EditStudentCard(
{ 
name,
major,
city,
country,
image,
setCity,
setCountry,
setImage,
setMajor,
setName,
setEdit }: StudentCardEditProps) 
{
    const [countries, setCountries] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const { data: countriesData, isSuccess } = useQuery({
        queryFn: () => Country.getAllCountries(),
        queryKey: ['countries'],
    })

    function getCitiesOfCountry(country: string)
    {
        if(isSuccess)
        {
            const code = countriesData.find(c => c.name.toString() === country)?.isoCode ?? ''
            return City.getCitiesOfCountry(code)?.map(city => city.name)
        }
    }

    const { data: citiesData, isSuccess: CitySuccess } = useQuery({
        queryFn: () => getCitiesOfCountry(country),
        queryKey: ['cities']
    })

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setImage(result),
        );
    };
    

    useEffect(() => {
        if(isSuccess) setCountries(countriesData.map(country => country.name))
    }, [isSuccess, countriesData])

    useEffect(() => {
        if(isSuccess && CitySuccess)
        {
            setCities(citiesData ?? [''])
        }
    }, [country, isSuccess, countriesData, citiesData, CitySuccess])
    

    return (
        <Box
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            gap={4}
        >
            <Box
                position='relative'
                width='250px'
                minWidth='250px'
                height='250px'
                borderRadius='50%'
                overflow='hidden'
                mx={2}
                border='4px solid rgba(0, 0, 0, 0.80)'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    backgroundImage: `url(${image})`,
                }}
            >
                <Box
                    position='absolute'
                    bgcolor='#000'
                    width='100%'
                    height='100%'
                    sx={{
                        opacity: 0.5
                    }}
                >
                    
                </Box>
                <Button
                    component='label'
                    sx={{
                        zIndex: 3,
                        position: 'relative',
                        background: '#FEF4EB',
                        color: '#000',
                        border: '1px solid #000',
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: 'Inter',
                        paddingX: 2.5,
                        paddingY: 1,
                        '&:hover': {
                            background: '#FEF4EB',
                            opacity: 1,
                        }
                    }}
                >
                    Edit Photo
                    <input
                        hidden
                        accept="image/*"
                        width='100%'
                        height='100%'
                        type="file"
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            handleImageChange(e.target.files![0]);
                        }}
                    />
                </Button>
            </Box>
            <Stack
                direction='column'
                gap={8}
                alignItems='center'
            >
                    <Stack
                        direction='row'
                        gap={4}
                        alignItems='center'
                        justifyContent='space-between'
                        flexWrap='wrap'
                        mr={4}
                    >
                        <Input 
                            value={name} 
                            color='primary' 
                            disableUnderline
                            sx={{
                                border: '1px solid #226E9F',
                                width: '280px',
                                background: '#fff',
                                borderRadius: '5px',
                                paddingX: 1,
                                paddingY: 0.5,
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Select
                            defaultValue={major}
                            sx={{
                                width: '200px !important',
                                height: '38px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'center',
                                
                            }}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', position: 'absolute', left: '80%' }} />}
                            variant='standard'
                            disableUnderline
                            onChange={(e) => setMajor(e.target.value)}
                        >
                            <MenuItem value={major}>{major}</MenuItem>
                        </Select>
                        <Select
                            defaultValue={city}
                            sx={{
                                width: '180px !important',
                                height: '38px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'center',
                                
                            }}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', position: 'absolute', left: '80%' }} />}                            variant='standard'
                            disableUnderline
                            onChange={(e) => setCity(e.target.value)}
                        >
                            { cities.map(city => <MenuItem value={city} key={city}>{city}</MenuItem>) }
                        </Select>
                        <Select
                            defaultValue={country}
                            sx={{
                                width: '180px !important',
                                height: '38px !important',
                                boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                borderRadius: '5px !important',
                                outline: 'none !important',
                                boxSizing: 'border-box !important',
                                background: '#fff',
                                paddingX: 1,
                                '&:hover': {
                                    boxShadow: '0px 0px 0px 1px rgba(34,110,159,0.39)',
                                    background: '#fff',
                                }, fontSize: 14, fontWeight: 500, fontFamily: 'Inter', color: '#000', textAlign: 'center',
                                
                            }}
                            IconComponent={() => <ExpandMore sx={{ borderLeft: '1px solid rgba(34,110,159, 0.2)', paddingLeft: 1, height: '100%', position: 'absolute', left: '80%' }} />}                            variant='standard'
                            disableUnderline
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            { countries.map(country => <MenuItem value={country} key={country}>{country}</MenuItem>) }
                        </Select>
                    </Stack>
                    <Stack
                        direction='row'
                        gap={3.5}
                        alignItems='center'
                        justifyContent='space-evenly'
                    >
                        <Button
                            sx={{
                                width: '180px',
                                height: '45px',
                                background: '#fff',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 600,
                                border: '2px solid #226E9F',
                                '&:hover': {
                                    background: '#fff',
                                    opacity: 1
                                }
                            }}
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{
                                width: '180px',
                                height: '45px',
                                background: '#D0EBFC',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: 14,
                                textTransform: 'none',
                                fontWeight: 600,
                                border: '2px solid #226E9F',
                                '&:hover': {
                                    background: '#D0EBFC',
                                    opacity: 1
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </Stack>
            </Stack>
        </Box>
    )
}

const memoizedEditStudentCard = memo(EditStudentCard)
export default memoizedEditStudentCard