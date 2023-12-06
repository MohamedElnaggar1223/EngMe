import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import star from '../../../../assets/Star 4.png'
import { memo, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../authentication/auth/AuthProvider";
import ProgramProps from "../../../../interfaces/ProgramProps";
import { setStudentFinalExam } from "../../../helpers/setStudentFinalExam";
// import { PageContext } from "../../../Layout";

interface FinalExamObject{
    id: string,
    questions: [],
    duration: string
}

interface FinalExamCardProps{
    version: string,
    disabled?: boolean,
    setQuestions?: React.Dispatch<React.SetStateAction<string>>,
    finalExam: FinalExamObject,
    questions?: string,
    program: ProgramProps,
    foundExam?: unknown
}

// eslint-disable-next-line react-refresh/only-export-components
function FinalExamCard({ program, version, disabled, setQuestions, finalExam, questions, foundExam }: FinalExamCardProps)
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleStudentFinalExam = async (finalExamId: string) => {
        console.log('test')
        console.log(finalExamId)
        await setStudentFinalExam(userData.id, finalExamId)
        navigate(`/exam/${finalExamId}`)
    }

    const { mutate } = useMutation({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['finalExams', program.id]
            })
        },
        mutationFn: (finalExamId: string) => handleStudentFinalExam(finalExamId) 
    })

    return (
        <Box
            display='flex'
            // overflow='hidden'
            flexDirection='column'
            m={2}
            position='relative'
        >
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                px={2.5}
                py={2}
                bgcolor={disabled ? '#F8F8F8' : '#FFFBF8'}
                zIndex={1}
                position='relative'
                sx={{
                    borderTopRightRadius: '15px',
                    borderTopLeftRadius: '15px',
                }}
            >
                <Typography fontSize={14} fontFamily='Inter' fontWeight={500}>{version}</Typography>
                {/*//@ts-expect-error grade */}
                {!foundExam?.grade && <Typography fontSize={14} fontFamily='Inter' fontWeight={500}>{(Number(finalExam.duration.split(' ')[0]) / 60).toFixed(1)} Hours</Typography>}
                {
                    setQuestions &&
                    <Box
                        sx={{ position: 'absolute' }}
                        left='80%'
                        alignSelf='flex-end'
                        top='-50%'
                        zIndex={5}
                    >
                        <ReactApexChart
                            options={{
                                chart: { type: "donut" },
                                colors: ['#fff', '#FF9F06'],
                                legend: { show: false },
                                dataLabels: { enabled: false },
                                // fill: { image: { src: star, height: 100, width: 100 } }
                            }}
                            //@ts-expect-error grade
                            series={[100 - Number(foundExam?.grade), Number(foundExam?.grade)]}
                            type="donut"
                            width="120px"
                        />
                        <img src={star} width='40px' height='40px' style={{ position: 'absolute', top: 18, left: 40.8 }} />
                        {/*//@ts-expect-error grade*/}
                        <Typography fontSize={12} style={{ position: 'absolute', top: 30, left: 45 }} sx={{ color: '#fff' }}>{Number(foundExam?.grade) !== 100 ? Number(foundExam?.grade).toFixed(1) : Number(foundExam?.grade).toFixed(0)}%</Typography>
                    </Box>
                }
            </Stack>
            <Box
                bgcolor={disabled ? '#E8E8E8' : '#FEF4EB'}
                px={6}
                zIndex={1}
                sx={{
                    borderBottomRightRadius: '15px',
                    borderBottomLeftRadius: '15px',
                }}
            >
                <Stack  
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    py={5}
                    gap={1}
                >
                    <SvgIcon sx={{ fontSize: 46 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                            <path d="M47.2266 13.7539L45.9696 12.497C44.9274 11.457 43.2401 11.457 42.1979 12.497L39.684 15.0109L35.5556 19.1393V0.888889C35.5557 0.398097 35.1579 0.000127556 34.6671 0C34.667 0 34.6673 0 34.6671 0H10.6667C10.6451 0.00171156 10.6237 0.00543424 10.6029 0.0111198C10.3906 0.0228907 10.1899 0.111516 10.0382 0.260445L0.260444 10.0382C0.105759 10.1965 0.0164337 10.4073 0.0102836 10.6286C0.0086221 10.6419 3.06701e-08 10.6527 3.06701e-08 10.6667V47.1111C-0.000127525 47.6019 0.397634 47.9999 0.888427 48C0.888272 48 0.888581 48 0.888427 48H34.6667C35.1573 48.0003 35.5553 47.6028 35.5556 47.1121C35.5556 47.1118 35.5556 47.1115 35.5556 47.1111V29.3333C35.5505 29.2948 35.5429 29.2566 35.5326 29.2192L44.7127 20.0391L47.2266 17.5252C48.2746 16.4884 48.2957 14.8104 47.2589 13.7623C47.2521 13.7554 47.2453 13.7486 47.2266 13.7539ZM42.269 19.9688L39.7544 17.4544L40.3125 16.8963L42.8272 19.4106L42.269 19.9688ZM22.7135 39.5243L22.0849 38.8956L40.3834 20.5971L41.0121 21.2257L22.7135 39.5243ZM19.3307 38.6551L21.0683 40.3928L18.4618 41.2613L19.3307 38.6551ZM20.1992 37.0095L38.4975 18.7113L39.1264 19.3402L20.8281 37.6385L20.1992 37.0095ZM9.77778 3.03472V9.77778H3.03472L9.77778 3.03472ZM33.7778 46.2222H1.77778V11.5556H10.6667C11.1576 11.5556 11.5556 11.1576 11.5556 10.6667V1.77778H33.7778V20.9171L18.3138 36.3811C18.2229 36.4742 18.1539 36.5864 18.1118 36.7095C18.1085 36.7172 18.1017 36.72 18.0989 36.7283L16.4157 41.7778H5.33333C4.84241 41.7778 4.44444 42.1757 4.44444 42.6667C4.44444 43.1576 4.84241 43.5556 5.33333 43.5556H16.8889C16.9266 43.5506 16.964 43.5431 17.0007 43.533C17.0168 43.5456 17.0361 43.5534 17.0564 43.5556C17.1521 43.5557 17.2471 43.5401 17.3377 43.5095L22.9948 41.6241C23.0037 41.6212 23.0065 41.6137 23.0147 41.6102C23.1372 41.5683 23.249 41.4998 23.342 41.4097L33.7778 30.974V46.2222ZM45.9696 16.2682L44.0842 18.1537L41.5695 15.6393L43.4548 13.7539C43.8026 13.4076 44.3649 13.4076 44.7126 13.7539L45.9695 15.0109C46.3159 15.3584 46.3159 15.9206 45.9696 16.2682ZM20.4444 16.8889H31.1111C31.6019 16.889 31.9999 16.4913 32 16.0005C32 16.0003 32 16.0006 32 16.0005V3.55556C32.0001 3.06476 31.6024 2.66679 31.1116 2.66667C31.1114 2.66667 31.1117 2.66667 31.1116 2.66667H20.4444C19.9535 2.66667 19.5556 3.06464 19.5556 3.55556V16C19.5556 16.4909 19.9535 16.8889 20.4444 16.8889ZM21.3333 4.44444H30.2222V15.1111H21.3333V4.44444ZM5.33333 20.4444H21.3333C21.8243 20.4444 22.2222 20.8424 22.2222 21.3333C22.2222 21.8243 21.8243 22.2222 21.3333 22.2222H5.33333C4.84241 22.2222 4.44444 21.8243 4.44444 21.3333C4.44444 20.8424 4.84241 20.4444 5.33333 20.4444ZM22.2222 26.6667C22.2223 27.1575 21.8246 27.5554 21.3338 27.5556C21.3336 27.5556 21.334 27.5556 21.3338 27.5556H5.33333C4.84241 27.5556 4.44444 27.1576 4.44444 26.6667C4.44444 26.1757 4.84241 25.7778 5.33333 25.7778H21.3333C21.8241 25.7776 22.2221 26.1759 22.2222 26.6667C22.2222 26.6668 22.2222 26.6665 22.2222 26.6667ZM19.5556 32C19.5557 32.4908 19.1579 32.8888 18.6671 32.8889C18.667 32.8889 18.6673 32.8889 18.6671 32.8889H5.33333C4.84241 32.8889 4.44444 32.4909 4.44444 32C4.44444 31.5091 4.84241 31.1111 5.33333 31.1111H18.6667C19.1575 31.111 19.5554 31.5092 19.5556 32C19.5556 32.0002 19.5556 31.9998 19.5556 32ZM16 37.3333C16.0001 37.8241 15.6024 38.2221 15.1116 38.2222C15.1114 38.2222 15.1117 38.2222 15.1116 38.2222H5.33333C4.84241 38.2222 4.44444 37.8243 4.44444 37.3333C4.44444 36.8424 4.84241 36.4444 5.33333 36.4444H15.1111C15.6019 36.4443 15.9999 36.8425 16 37.3333C16 37.3335 16 37.3332 16 37.3333ZM30.7552 17.9557C31.1479 18.2494 31.2281 18.8058 30.9344 19.1984C30.934 19.199 30.9336 19.1995 30.9332 19.2001L28.2665 22.7556C28.1121 22.9618 27.8758 23.0907 27.6189 23.1089C27.5972 23.1102 27.5764 23.1111 27.5556 23.1111C27.3198 23.1112 27.0937 23.0175 26.9271 22.8507L25.1493 21.0729C24.8054 20.7227 24.8104 20.16 25.1606 19.816C25.5063 19.4764 26.0605 19.4764 26.4062 19.816L27.4592 20.869L29.5113 18.1333C29.8057 17.7407 30.3627 17.6613 30.7552 17.9557ZM25.1493 42.4062C24.8054 42.056 24.8104 41.4933 25.1606 41.1493C25.5063 40.8097 26.0605 40.8097 26.4062 41.1493L27.4592 42.2023L29.5113 39.467C29.8046 39.0736 30.3613 38.9924 30.7547 39.2857C31.1481 39.579 31.2293 40.1357 30.936 40.5292C30.9351 40.5304 30.9341 40.5317 30.9331 40.533L28.2665 44.0886C28.1122 44.2948 27.8758 44.4238 27.6189 44.4419C27.5972 44.4436 27.5764 44.4444 27.5556 44.4444C27.3198 44.4445 27.0937 44.3508 26.9271 44.184L25.1493 42.4062ZM3.55556 13.3333C3.55556 12.8424 3.95352 12.4444 4.44444 12.4444H8.88889C9.37981 12.4444 9.77778 12.8424 9.77778 13.3333C9.77778 13.8243 9.37981 14.2222 8.88889 14.2222H4.44444C3.95352 14.2222 3.55556 13.8243 3.55556 13.3333ZM12.4444 13.3333C12.4444 12.8424 12.8424 12.4444 13.3333 12.4444H15.1111C15.602 12.4444 16 12.8424 16 13.3333C16 13.8243 15.602 14.2222 15.1111 14.2222H13.3333C12.8424 14.2222 12.4444 13.8243 12.4444 13.3333ZM4.44444 16.8889C3.95352 16.8889 3.55556 16.4909 3.55556 16C3.55556 15.5091 3.95352 15.1111 4.44444 15.1111H8.88889C9.37981 15.1111 9.77778 15.5091 9.77778 16C9.77778 16.4909 9.37981 16.8889 8.88889 16.8889H4.44444ZM12.4444 16C12.4444 15.5091 12.8424 15.1111 13.3333 15.1111H15.1111C15.602 15.1111 16 15.5091 16 16C16 16.4909 15.602 16.8889 15.1111 16.8889H13.3333C12.8424 16.8889 12.4444 16.4909 12.4444 16ZM12.4444 8C12.4444 7.50908 12.8424 7.11111 13.3333 7.11111H15.1111C15.602 7.11111 16 7.50908 16 8C16 8.49092 15.602 8.88889 15.1111 8.88889H13.3333C12.8424 8.88889 12.4444 8.49092 12.4444 8ZM12.4444 5.33333C12.4444 4.84241 12.8424 4.44444 13.3333 4.44444H15.1111C15.602 4.44444 16 4.84241 16 5.33333C16 5.82425 15.602 6.22222 15.1111 6.22222H13.3333C12.8424 6.22222 12.4444 5.82425 12.4444 5.33333ZM12.4444 10.6667C12.4444 10.1757 12.8424 9.77778 13.3333 9.77778H15.1111C15.602 9.77778 16 10.1757 16 10.6667C16 11.1576 15.602 11.5556 15.1111 11.5556H13.3333C12.8424 11.5556 12.4444 11.1576 12.4444 10.6667Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    <Typography fontSize={14} fontFamily='Inter' fontWeight={500}>MCQ  .  Essay</Typography>
                </Stack>
                <Button
                    sx={{
                        width: '290px',
                        height: '50px',
                        background: '#fff',
                        color: '#000',
                        fontFamily: 'Inter',
                        fontSize: 14,
                        textTransform: 'none',
                        fontWeight: 400,
                        border: disabled ? '0.5px solid #000' : '0.5px solid #FF7E00',
                        borderRadius: '15px',
                        '&:hover': {
                            background: '#fff',
                            opacity: 1
                        },
                        marginBottom: 3
                    }}
                    disabled={disabled}
                    onClick={() => setQuestions ? setQuestions(prev => prev !== '' ? prev === finalExam.id ? '' : finalExam.id : finalExam.id) : disabled ? {} : mutate(finalExam.id)}
                >
                    {setQuestions ? questions === finalExam.id ? 'Hide Questions' : 'Show Questions' : 'Take Exam' }
                </Button>
            </Box>
        </Box>
    )
}

const memoizedFinalExamCard = memo(FinalExamCard)
export default memoizedFinalExamCard