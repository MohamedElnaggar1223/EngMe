import { Stack, Typography, Box, Input, SvgIcon, FormGroup, FormHelperText, FormControlLabel, Checkbox, Button } from "@mui/material";
import ProgramExploreCard from "./ProgramExploreCard";
import ProgramsExploreHomeProps from "../../../../interfaces/ProgramsExploreHomeProps";

export default function ProgramsExploreHome(
{
    filters,
    applyFilters,
    handleFilters,
    handleRemoveFilter,
    setApplyFilters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    setPageShowed
}: ProgramsExploreHomeProps) 
{
    return (
        <>
            <Stack
                direction='column'
                gap={2.5}
                alignItems='center'
                position='relative'
            >
                <Typography
                    fontSize={24}
                    fontWeight={900}
                    fontFamily='Inter'
                >
                    Search Available Programs
                </Typography>
                <Box
                    px={3}
                    bgcolor='rgba(254, 244, 235, 0.50)'
                    width='588px'
                    height='55px'
                    display='flex'
                    position='relative'
                    alignItems='center'
                    justifyContent='space-between'
                    borderRadius='10px'
                    border='2px solid #FEF4EB'
                >
                    <Input 
                        sx={{ 
                            flex: 1,
                            marginRight: 2,
                            fontSize: 20
                        }}
                        disableUnderline
                    />
                    <SvgIcon onClick={() => setFilters(prev => !prev)} sx={{ transition: '0.35s', cursor: 'pointer', zIndex: 6, transform: filters ? 'rotate(-90deg)' : '' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 30 27" fill="none">
                            <path d="M1.23282 4.61489L5.15448 4.61489C5.20458 4.86305 5.28031 5.10655 5.38051 5.34306C5.57391 5.80094 5.8512 6.21221 6.20422 6.56523C6.55724 6.91825 6.96851 7.19554 7.42639 7.38895C7.90057 7.58934 8.40505 7.69187 8.92351 7.69187C9.44198 7.69187 9.94529 7.5905 10.4206 7.38895C10.8785 7.19554 11.2898 6.91825 11.6428 6.56523C11.9958 6.21221 12.2731 5.80094 12.4665 5.34306C12.6669 4.86887 12.7694 4.36439 12.7694 3.84593C12.7694 3.32747 12.6681 2.82416 12.4665 2.3488C12.2731 1.89093 11.9958 1.47965 11.6428 1.12663C11.2898 0.773613 10.8785 0.496325 10.4206 0.302921C9.94646 0.102527 9.44314 0 8.92351 0C8.40389 0 7.90174 0.101362 7.42639 0.302921C6.96851 0.496325 6.55724 0.773613 6.20422 1.12663C5.8512 1.47965 5.57391 1.89093 5.38051 2.3488C5.28031 2.58531 5.20574 2.82765 5.15448 3.07698L1.23282 3.07698C0.807566 3.07698 0.463867 3.42068 0.463867 3.84593C0.463867 4.27119 0.807566 4.61489 1.23282 4.61489ZM8.92235 1.53907C10.1946 1.53907 11.2292 2.57366 11.2292 3.84593C11.2292 5.1182 10.1946 6.15279 8.92235 6.15279C7.65008 6.15279 6.61549 5.1182 6.61549 3.84593C6.61549 2.57366 7.65008 1.53907 8.92235 1.53907Z" fill="black"/>
                            <path d="M15.0736 4.61493L28.9148 4.61493C29.34 4.61493 29.6837 4.27123 29.6837 3.84598C29.6837 3.42073 29.34 3.07703 28.9148 3.07703L15.0736 3.07703C14.6484 3.07703 14.3047 3.42073 14.3047 3.84598C14.3047 4.27123 14.6496 4.61493 15.0736 4.61493Z" fill="black"/>
                            <path d="M28.9148 21.5319L15.0736 21.5319C14.6484 21.5319 14.3047 21.8756 14.3047 22.3008C14.3047 22.7261 14.6484 23.0698 15.0736 23.0698L28.9148 23.0698C29.34 23.0698 29.6837 22.7261 29.6837 22.3008C29.6837 21.8756 29.34 21.5319 28.9148 21.5319Z" fill="black"/>
                            <path d="M11.6405 19.5827C11.2875 19.2297 10.8762 18.9524 10.4183 18.759C9.94413 18.5586 9.43965 18.4561 8.92119 18.4561C8.40272 18.4561 7.89941 18.5574 7.42406 18.759C6.96618 18.9524 6.55491 19.2297 6.20189 19.5827C5.84887 19.9357 5.57158 20.347 5.37818 20.8049C5.27798 21.0414 5.20341 21.2837 5.15215 21.533H1.23282C0.807566 21.533 0.463867 21.8767 0.463867 22.302C0.463867 22.7272 0.807566 23.0709 1.23282 23.0709H5.15448C5.20458 23.3191 5.28031 23.5626 5.38051 23.7991C5.57391 24.257 5.8512 24.6683 6.20422 25.0213C6.55724 25.3743 6.96851 25.6516 7.42639 25.845C7.90057 26.0454 8.40505 26.1479 8.92351 26.1479C9.44198 26.1479 9.94529 26.0466 10.4206 25.845C10.8785 25.6516 11.2898 25.3743 11.6428 25.0213C11.9958 24.6683 12.2731 24.257 12.4665 23.7991C12.6669 23.3249 12.7694 22.8216 12.7694 22.302C12.7694 21.7824 12.6681 21.2802 12.4665 20.8049C12.2708 20.3458 11.9935 19.9345 11.6405 19.5827ZM8.92235 24.6077C7.65008 24.6077 6.61549 23.5731 6.61549 22.3008C6.61549 21.0286 7.65008 19.994 8.92235 19.994C10.1946 19.994 11.2292 21.0286 11.2292 22.3008C11.2292 23.5731 10.1946 24.6077 8.92235 24.6077Z" fill="black"/>
                            <path d="M28.9146 12.3044H24.9929C24.9428 12.0562 24.8671 11.8127 24.7669 11.5762C24.5735 11.1183 24.2962 10.7071 23.9432 10.3541C23.5901 10.001 23.1789 9.72374 22.721 9.53034C22.2468 9.32994 21.7435 9.22742 21.2239 9.22742C20.7042 9.22742 20.2021 9.32878 19.7267 9.53034C19.2689 9.72374 18.8576 10.001 18.5046 10.3541C18.1515 10.7071 17.8743 11.1183 17.6809 11.5762C17.4805 12.0504 17.3779 12.5549 17.3779 13.0733C17.3779 13.5918 17.4793 14.0951 17.6809 14.5705C17.8743 15.0284 18.1515 15.4396 18.5046 15.7926C18.8576 16.1457 19.2689 16.423 19.7267 16.6164C20.2009 16.8168 20.7042 16.9193 21.2239 16.9193C21.7435 16.9193 22.2456 16.8179 22.721 16.6164C23.1789 16.423 23.5901 16.1457 23.9432 15.7926C24.2962 15.4396 24.5735 15.0284 24.7669 14.5705C24.8671 14.334 24.9416 14.0916 24.9929 13.8423L28.9146 13.8423C29.3398 13.8423 29.6835 13.4986 29.6835 13.0733C29.6835 12.6481 29.3398 12.3044 28.9146 12.3044ZM21.225 15.3802C19.9528 15.3802 18.9182 14.3456 18.9182 13.0733C18.9182 11.8011 19.9528 10.7665 21.225 10.7665C22.4973 10.7665 23.5319 11.8011 23.5319 13.0733C23.5319 14.3456 22.4973 15.3802 21.225 15.3802Z" fill="black"/>
                            <path d="M1.23282 13.8424L15.074 13.8424C15.4992 13.8424 15.8429 13.4987 15.8429 13.0734C15.8429 12.6481 15.4992 12.3044 15.074 12.3044L1.23282 12.3044C0.807566 12.3044 0.463867 12.6481 0.463867 13.0734C0.463867 13.4987 0.807566 13.8424 1.23282 13.8424Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    {
                    filters &&
                    <Box
                        position='absolute'
                        // boxShadow='0px 0px 0px 2px rgba(0,0,0,0.35)'
                        bgcolor='#fff'
                        top='85%'
                        zIndex={5}
                        left='90.2%'
                        width='60px'
                        height='48px'
                        sx={{
                            transform: 'rotate(45deg)'
                        }}
                    >

                    </Box>
                }
                {
                    filters &&
                    <Box
                        position='absolute'
                        width='1150px'
                        boxShadow='0px 0px 0px 1px rgba(0,0,0,0.1)'
                        bgcolor='#fff'
                        top='105%'
                        left='-55%'
                        zIndex={2}
                        py={6}
                        px={12}
                        display='flex'
                        gap={10}
                        flexDirection='row'
                        flexWrap='wrap'
                        justifyContent='space-between'
                    >
                        <FormGroup>
                            <FormHelperText sx={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 600, color: '#000', letterSpacing: 0 }}>Language</FormHelperText>
                            <Stack
                                direction='row'
                                width='250px'
                                flexWrap='wrap'
                                gap={2}
                                my={1}
                            >
                                <FormControlLabel control={<Checkbox checked={selectedFilters.Language.includes('Arabic')} value='Arabic' onChange={(e) => handleFilters('Language', e)} defaultChecked />} label="Arabic" />
                                <FormControlLabel control={<Checkbox checked={selectedFilters.Language.includes('English')} value='English' onChange={(e) => handleFilters('Language', e)} />} label="English" />
                                <FormControlLabel control={<Checkbox checked={selectedFilters.Language.includes('French')} value='French' onChange={(e) => handleFilters('Language', e)} />} label="French" />
                            </Stack>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText sx={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 600, color: '#000', letterSpacing: 0 }}>Language</FormHelperText>
                            <Stack
                                direction='row'
                                width='250px'
                                flexWrap='wrap'
                                gap={2}
                                my={1}
                            >
                                <FormControlLabel control={<Checkbox checked={selectedFilters.Major.includes('Software Eng.')} value='Software Eng.' onChange={(e) => handleFilters('Major', e)} defaultChecked />} label="Software Eng." />
                                <FormControlLabel control={<Checkbox checked={selectedFilters.Major.includes('Civil Eng.')} value='Civil Eng.' onChange={(e) => handleFilters('Major', e)} />} label="Civil Eng." />
                                <FormControlLabel control={<Checkbox checked={selectedFilters.Major.includes('Law')} value='Law' onChange={(e) => handleFilters('Major', e)} />} label="Law" />
                            </Stack>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText sx={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 600, color: '#000', letterSpacing: 0 }}>Language</FormHelperText>
                            <Stack
                                direction='row'
                                width='250px'
                                flexWrap='wrap'
                                gap={2}
                                my={1}
                            >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Arabic" />
                                <FormControlLabel control={<Checkbox />} label="English" />
                                <FormControlLabel control={<Checkbox />} label="French" />
                            </Stack>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText sx={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 600, color: '#000', letterSpacing: 0 }}>Language</FormHelperText>
                            <Stack
                                direction='row'
                                width='250px'
                                flexWrap='wrap'
                                gap={2}
                                my={1}
                            >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Arabic" />
                                <FormControlLabel control={<Checkbox />} label="English" />
                                <FormControlLabel control={<Checkbox />} label="French" />
                            </Stack>
                        </FormGroup>
                        <FormGroup>
                            <FormHelperText sx={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 600, color: '#000', letterSpacing: 0 }}>Language</FormHelperText>
                            <Stack
                                direction='row'
                                width='250px'
                                flexWrap='wrap'
                                gap={2}
                                my={1}
                            >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Arabic" />
                                <FormControlLabel control={<Checkbox />} label="English" />
                                <FormControlLabel control={<Checkbox />} label="French" />
                            </Stack>
                        </FormGroup>
                        <Stack
                            width='250px'
                            direction='row'
                            gap={2}
                            alignItems='flex-end'
                            justifyContent='flex-start'
                        >
                            <Button
                                sx={{
                                    width: '180px',
                                    height: '35px',
                                    background: '#fff',
                                    color: '#226E9F',
                                    fontFamily: 'Inter',
                                    fontSizze: 14,
                                    textTransform: 'none',
                                    fontWeight: 400,
                                    border: '1px solid #226E9F',
                                    borderRadius: '6px',
                                    '&:hover': {
                                        background: '#fff',
                                        opacity: 1
                                    }
                                }}
                                onClick={() => setSelectedFilters({ Language: [], Major: [] })}
                            >
                                Reset
                            </Button>
                            <Button
                                sx={{
                                    width: '180px',
                                    height: '35px',
                                    background: '#226E9F',
                                    color: '#fff',
                                    fontFamily: 'Inter',
                                    fontSizze: 14,
                                    textTransform: 'none',
                                    fontWeight: 400,
                                    border: '1px solid #226E9F',
                                    borderRadius: '6px',
                                    '&:hover': {
                                        background: '#226E9F',
                                        opacity: 1
                                    }
                                }}
                                onClick={() => setApplyFilters(true)}
                            >
                                Confirm
                            </Button>
                        </Stack>
                    </Box>
                }
                </Box>
            </Stack>
            <Stack
                direction='row'
                flexWrap='wrap'
                gap={4}
                mb={-6}
                mt={6}
            >
                {applyFilters && Object.keys(selectedFilters)?.map(filter => (
                    //@ts-expect-error item
                    selectedFilters[filter].map(item =>
                    <Box
                        key={item}
                        bgcolor='#FEF4EB'
                        px={5}
                        py={1}
                        maxWidth='111px'
                        textAlign='center'
                        borderRadius='20px'
                        position='relative'
                    >
                        <Typography fontFamily='Inter'>{item}</Typography>
                        <Box
                            position='absolute'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            top='-5%'
                            left= '92%'
                            textAlign='center'
                            sx={{
                                cursor: 'pointer'
                            }}
                            onClick={() => handleRemoveFilter(filter, item)}
                        >
                            <SvgIcon sx={{ fontSize: 16, top: '10%', position: 'absolute', zIndex: 1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="8" fill="white"/>
                                </svg>
                            </SvgIcon>
                            <Typography fontSize={12} sx={{ zIndex: 1, position: 'absolute', top: '40%', alignSelf: 'center' }} fontWeight={900}>X</Typography>
                        </Box>
                    </Box>
                    )
                ))}
            </Stack>
            <Stack
                direction='row'
                gap={3}
                flexWrap='wrap'
                p={0.5}
                mt={8}
                justifyContent={{xs: 'center', sm: 'center', lg: 'space-between'}}
            >
                <ProgramExploreCard setPageShowed={setPageShowed} />
                <ProgramExploreCard setPageShowed={setPageShowed} />
                <ProgramExploreCard setPageShowed={setPageShowed} />
                <ProgramExploreCard setPageShowed={setPageShowed} />
                <ProgramExploreCard setPageShowed={setPageShowed} />
            </Stack>
        </>
    )
}
