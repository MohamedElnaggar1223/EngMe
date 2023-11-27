import { Stack, Typography, SvgIcon } from '@mui/material'
import StudentCardProps from '../../../../interfaces/StudentCardProps'
import { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

//eslint-disable-next-line
function DefaultStudentCard({ name, major, city, country, image, setEdit }: StudentCardProps) 
{
    return (
        <>
            <Stack
                    direction='row'
                    alignItems='center'
                    gap={{xs: 3, sm: 3, lg: 8}}
                >
                    <LazyLoadImage 
                        style={{ 
                            borderRadius: '50%',
                            border: '5px solid #FFF',
                            background: 'lightgray -30.877px 0px / 185.106% 100% no-repeat',
                            objectFit: 'cover',
                            marginBottom: '-100px',
                            marginLeft: '-50px'
                        }} 
                        src={image} width='250px' height='250px' alt='profile' 
                    />
                    <Stack
                        direction='column'
                        gap={1}
                        mr={4}
                        ml={-3}
                    >
                        <Stack
                            direction='row'
                            gap={{xs: 1, sm: 1, lg: 2.5}}
                        >
                            <Typography 
                                fontWeight={600} 
                                fontSize={16} 
                                sx={{ color: '#000' }}
                                noWrap
                            >
                                {name}
                            </Typography>
                            <SvgIcon onClick={() => setEdit(prev => !prev)} sx={{ fontSize: 20, marginLeft: 1, marginTop: -1, cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M19.1835 8.23797C18.7321 8.23797 18.366 8.604 18.366 9.0554V16.5213C18.366 17.5377 17.5395 18.3651 16.5223 18.3651H3.47956C2.46231 18.3651 1.63579 17.5377 1.63579 16.5213V3.47866C1.63579 2.46231 2.46231 1.63488 3.47956 1.63488H11.0354C11.4868 1.63488 11.8529 1.26885 11.8529 0.817439C11.8529 0.366031 11.4868 0 11.0354 0H3.47956C1.56131 0 0 1.5604 0 3.47866V16.5213C0 18.4396 1.56131 20 3.47956 20H16.5223C18.4405 20 20.0018 18.4396 20.0018 16.5213V9.0554C20.0018 8.604 19.6349 8.23797 19.1835 8.23797Z" fill="#226E9F"/>
                                    <path d="M14.4441 0.821587L7.17161 8.09407C6.61938 8.64538 6.35145 9.42831 6.44681 10.2021L6.42774 12.7489C6.42683 12.9678 6.51312 13.1785 6.66752 13.3329C6.82102 13.4864 7.02901 13.5727 7.24609 13.5727C7.2479 13.5727 7.25063 13.5727 7.25245 13.5727L9.79922 13.5536C10.5694 13.649 11.3551 13.382 11.9064 12.8298L19.1798 5.55728C19.633 5.10406 19.8864 4.50369 19.8937 3.867C19.9019 3.22395 19.6566 2.61995 19.2052 2.16945L17.8319 0.797064C16.9037 -0.131183 15.3841 -0.118468 14.4441 0.821587ZM18.2579 3.84702C18.2561 4.0541 18.1716 4.25029 18.0217 4.40015L10.7484 11.6726C10.5458 11.8743 10.2615 11.9724 9.97361 11.9269C9.93183 11.9206 9.89096 11.9179 9.84918 11.9179C9.84736 11.9179 9.84463 11.9179 9.84282 11.9179L8.06807 11.9315L8.08169 10.1558C8.08169 10.1122 8.07806 10.0695 8.0717 10.0259C8.0281 9.74257 8.12347 9.45192 8.32601 9.25029L15.5985 1.97781C15.9037 1.67536 16.3851 1.66264 16.6757 1.95147L18.049 3.32386C18.1861 3.46191 18.2606 3.6472 18.2579 3.84702Z" fill="#226E9F"/>
                                </svg>
                            </SvgIcon>
                        </Stack>
                        <Typography
                            fontSize={14}
                            fontWeight={400}
                        >
                        {major} | {city}, {country}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    gap={{xs: 2, sm: 4, lg: 8}}
                    mr={{ xs: 2, sm: 4, lg: 8 }}
                    // flex={1}
                    flexWrap='wrap'
                >
                    <Stack
                        direction='column'
                        bgcolor='#fff'
                        gap={0.2}
                        alignItems='center'
                        borderRadius='10px'
                        py={1}
                        width={{ xs: '100px', sm: '120px', lg: '180px' }}
                    >
                        <Typography fontFamily='Inter' fontSize={22} fontWeight={700}>7</Typography>
                        <Typography textAlign='center' fontSize={14} fontFamily='Inter' fontWeight={400}>Programs</Typography>
                    </Stack>
                    <Stack
                        direction='column'
                        bgcolor='#fff'
                        gap={0.2}
                        alignItems='center'
                        borderRadius='10px'
                        py={1}
                        width={{ xs: '100px', sm: '120px', lg: '180px' }}
                    >
                        <Typography fontFamily='Inter' fontSize={22} fontWeight={700}>1</Typography>
                        <Typography textAlign='center' fontSize={14} fontFamily='Inter' fontWeight={400}>Recommendation Letter</Typography>
                    </Stack>
                    <Stack
                        direction='column'
                        bgcolor='#fff'
                        gap={0.2}
                        alignItems='center'
                        borderRadius='10px'
                        py={1}
                        width={{ xs: '100px', sm: '120px', lg: '180px' }}
                    >
                        <Typography fontFamily='Inter' fontSize={22} fontWeight={700}>4</Typography>
                        <Typography textAlign='center' fontSize={14} fontFamily='Inter' fontWeight={400}>Certificates</Typography>
                    </Stack>
                </Stack>
            </>
    )
}

const memoizedDefaultStudentCard = memo(DefaultStudentCard)
export default memoizedDefaultStudentCard