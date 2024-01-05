import { Box, Stack, SvgIcon, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../../authentication/auth/AuthProvider'
import { getStudentInTeacherPrograms } from '../../helpers/getStudentInTeacherPrograms'
import { StarOutline, StarRate } from '@mui/icons-material'
import { getStudentGraduatedTeacherPrograms } from '../../helpers/getStudentGraduatedTeacherPrograms'

export default function TeacherTestimonials() 
{
    //@ts-expect-error context
    const { userData } = useContext(AuthContext)

    const { data: teacheStudents } = useQuery({
        queryKey: ['teacherStudentsPrograms', userData?.id],
        queryFn: () => getStudentInTeacherPrograms(userData?.programs),
        enabled: !!userData?.id
    })

    const { data: teacherStudentsGraduated } = useQuery({
        queryKey: ['teacherStudentsGraduated', userData?.id],
        queryFn: () => getStudentGraduatedTeacherPrograms(userData?.programs),
        enabled: !!userData?.id
    })

    return (
        <Box
            mx={14}
            sx={{
                borderRadius: '20px',
            }}
            overflow='hidden'
            height='auto'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            mb={10}
        >
            <Box
                p={2}
                px={4}
                bgcolor='#D0EBFC'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    fontWeight={900}
                    fontFamily='Inter'
                    fontSize={24}
                >
                    Student & Program Analytics
                </Typography>
                <Typography
                    fontWeight={700}
                    fontFamily='Inter'
                    fontSize={18}
                    mr={6}
                    sx={{
                        color: '#226E9F'
                    }}
                >
                    View All
                </Typography>
            </Box>
            <Box
                py={3}
                px={16}
                height='auto'
                display='flex'
                gap={8}
                flexDirection='row'
                flexWrap='wrap'
                justifyContent='space-between'
            >
                <Stack
                    alignItems='center'
                    width='fit-content'
                    gap={1.5}
                >
                    <SvgIcon sx={{ fontSize: 60 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                            <path d="M18.3618 14.0011C20.9393 11.4235 20.9393 7.24444 18.3617 4.66686C15.7842 2.08928 11.6051 2.08928 9.02748 4.66686C6.4499 7.24444 6.4499 11.4235 9.02748 14.0011C11.6051 16.5787 15.7842 16.5787 18.3618 14.0011Z" fill="black"/>
                            <path d="M40.4718 15.9322C44.1094 15.9322 47.0721 12.9695 47.0721 9.33182C47.0721 5.69418 44.1094 2.73145 40.4718 2.73145C36.8341 2.73145 33.8828 5.69418 33.8828 9.33182C33.8828 12.9695 36.8341 15.9322 40.4718 15.9322Z" fill="black"/>
                            <path d="M30.165 22.3041V24.6949H34.4776C34.5805 24.1573 35.0152 23.7454 35.5758 23.7454C36.1363 23.7454 36.5824 24.1573 36.6739 24.6949H44.2466C44.3496 24.1573 44.7843 23.7454 45.3448 23.7454C45.9053 23.7454 46.3514 24.1573 46.4429 24.6949H50.7669V22.3041C50.7669 19.2956 48.319 16.8477 45.3105 16.8477H35.5986C32.613 16.8477 30.165 19.2956 30.165 22.3041Z" fill="black"/>
                            <path d="M3.37402 22.3041V24.6949H7.1375C7.24045 24.1573 7.67514 23.7454 8.23566 23.7454C8.79618 23.7454 9.2423 24.1573 9.33382 24.6949H16.9065C17.0095 24.1573 17.4442 23.7454 18.0047 23.7454C18.5652 23.7454 19.0113 24.1573 19.1028 24.6949H23.9874V22.3041C23.9874 19.2956 21.5394 16.8477 18.5309 16.8477H8.80762C5.822 16.8477 3.37402 19.2956 3.37402 22.3041Z" fill="black"/>
                            <path d="M53.0319 26.9824H1.14391C0.514761 26.9824 0 27.4972 0 28.1263C0 28.7555 0.514761 29.2702 1.14391 29.2702H53.0319C53.661 29.2702 54.1758 28.7555 54.1758 28.1263C54.1758 27.4972 53.661 26.9824 53.0319 26.9824Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    <Typography
                        fontSize={14}
                        fontFamily='Inter'
                        fontWeight={700}
                        sx={{
                            color: '#000'
                        }}
                    >
                        {teacheStudents} Student(s)
                    </Typography>
                </Stack>
                <Stack
                    alignItems='center'
                    width='fit-content'
                    gap={1.5}
                >
                    <SvgIcon sx={{ fontSize: 60 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="26" viewBox="0 0 45 26" fill="none">
                            <path d="M29.5554 12.073V11.3214C29.5554 10.3349 29.3205 9.39536 28.9447 8.5498L23.6834 10.6167C23.2607 10.8046 22.7909 10.8516 22.3211 10.8516C21.8514 10.8516 21.4286 10.7577 20.9589 10.6167L15.6976 8.5498C15.3218 9.39536 15.0869 10.3349 15.0869 11.3214V12.073C15.0869 12.4018 15.2748 12.6836 15.6036 12.8246L21.6635 15.2203C22.0863 15.4082 22.603 15.4082 23.0258 15.2203L29.0856 12.8246C29.3675 12.6836 29.5554 12.4018 29.5554 12.073Z" fill="black"/>
                            <path d="M11.0466 5.12033L21.5221 9.25417C22.0388 9.44208 22.6025 9.44208 23.1193 9.25417L31.5279 5.91891V8.03281H31.4339C31.293 8.03281 31.1521 8.17374 31.1521 8.31466V8.59652C31.1521 8.73744 31.246 8.8314 31.387 8.87837L30.8233 10.0058C30.6823 10.2876 30.8702 10.6165 31.1991 10.6165H32.8902C33.219 10.6165 33.4069 10.2876 33.266 10.0058L32.7023 8.87837C32.8432 8.87837 32.9372 8.73744 32.9372 8.59652V8.31466C32.9372 8.17374 32.7962 8.03281 32.6553 8.03281H32.5614V5.49613L33.5948 5.12033C33.9706 4.9794 33.9706 4.4157 33.5948 4.27477L23.1193 0.140927C22.6025 -0.0469755 22.0388 -0.0469755 21.5221 0.140927L11.0466 4.2278C10.6238 4.4157 10.6238 4.93243 11.0466 5.12033Z" fill="black"/>
                            <path d="M19.69 23.2997C19.2203 23.2057 18.9854 23.1588 18.5626 23.0178C18.6566 22.4541 18.6566 21.6086 18.2338 20.763C17.764 19.7765 16.9185 19.0719 16.4957 18.6961C16.3548 18.5552 16.1199 18.6021 16.0259 18.7431C15.7911 19.2128 15.4153 20.1523 15.838 21.1858C15.979 21.6086 16.2608 21.9844 16.5897 22.3132C15.6032 21.9374 15.1804 21.7025 14.2879 21.2328C14.5227 20.716 14.7106 19.9175 14.5227 18.9779C14.3348 17.9445 13.7241 17.052 13.3483 16.5822C13.2074 16.3943 12.9725 16.3943 12.8786 16.5352C12.5498 16.958 11.9861 17.7566 12.127 18.837C12.174 19.2598 12.3619 19.7296 12.5967 20.1054C11.7512 19.5417 11.3754 19.2128 10.6238 18.5552C10.9526 18.1324 11.3284 17.3338 11.3754 16.4413C11.4223 15.4078 11.0465 14.3743 10.8117 13.8576C10.7177 13.6697 10.5298 13.5758 10.3419 13.7167C9.91913 14.0455 9.16752 14.7032 9.0266 15.7836C8.97962 16.2064 9.0266 16.6761 9.16752 17.0989C8.50987 16.3473 8.18104 15.9715 7.61733 15.126C8.04011 14.7502 8.60382 14.1395 8.83869 13.2469C9.12055 12.2605 8.97962 11.18 8.88567 10.6163C8.83869 10.4284 8.65079 10.2875 8.46289 10.3814C7.99314 10.6163 7.1006 11.0861 6.7248 12.1195C6.58387 12.5423 6.5369 13.0121 6.5369 13.4348C6.06714 12.5423 5.83226 12.1195 5.50343 11.18C5.97319 10.9451 6.67782 10.4284 7.14758 9.62982C7.66431 8.69031 7.75826 7.60988 7.80523 7.04617C7.80523 6.85827 7.66431 6.67037 7.47641 6.71734C6.95967 6.81129 5.97319 7.09315 5.40948 7.98568C5.17461 8.36148 5.03368 8.78426 4.93973 9.25402C4.65788 8.26753 4.56392 7.79778 4.46997 6.76432C4.9867 6.62339 5.78529 6.29456 6.39597 5.6369C7.1006 4.83832 7.4764 3.80486 7.66431 3.24115C7.71128 3.05325 7.61733 2.81837 7.42943 2.81837C6.9127 2.7714 5.87924 2.81838 5.08066 3.61696C4.75183 3.94579 4.51695 4.32159 4.32905 4.74437C4.32905 3.61696 4.32905 3.05325 4.46997 1.87886C4.51695 1.45609 4.32905 1.12726 4.04719 1.08028C3.76534 1.03331 3.48349 1.31516 3.43651 1.78491C3.29559 3.00628 3.24861 3.61696 3.24861 4.79135C3.06071 4.36857 2.82583 3.94579 2.54398 3.52301C1.79237 2.5835 0.85286 2.25467 0.336129 2.16072C0.148227 2.11374 -0.0396747 2.39559 0.00730082 2.72442C0.101252 3.56998 0.43008 5.16715 1.27564 6.05968C1.98027 6.81129 2.87281 6.95222 3.43651 6.95222C3.57744 8.03265 3.67139 8.54939 3.95324 9.58285C3.67139 9.20704 3.34256 8.83124 2.96676 8.54939C2.02725 7.84475 1.04076 7.7508 0.524031 7.79778C0.336129 7.79778 0.242178 8.12661 0.336129 8.40846C0.617982 9.20704 1.32261 10.6163 2.3091 11.274C3.20163 11.8377 4.04719 11.7437 4.6109 11.6028C4.9867 12.5893 5.22158 13.059 5.69134 13.9985C5.31553 13.7167 4.93973 13.4348 4.46997 13.2469C3.38954 12.7772 2.40305 12.9651 1.9333 13.106C1.74539 13.153 1.74539 13.4818 1.88632 13.7167C2.35608 14.4213 3.34256 15.5957 4.46997 15.9715C5.45646 16.3003 6.25504 16.0185 6.77177 15.7836C7.38245 16.6761 7.66431 17.052 8.36894 17.8505C7.94616 17.6626 7.47641 17.4747 7.00665 17.3808C5.87924 17.1929 4.93973 17.5687 4.51695 17.8505C4.37602 17.9445 4.423 18.2733 4.6109 18.4612C5.22158 19.0249 6.44294 19.9644 7.66431 20.0584C8.69777 20.1523 9.44938 19.6826 9.87216 19.3538C10.6707 20.0584 11.0465 20.3872 11.9391 20.9979C11.4693 20.9039 10.9996 20.857 10.5298 20.857C9.35542 20.9039 8.55684 21.5146 8.18104 21.8904C8.04011 22.0314 8.18104 22.3132 8.41591 22.4541C9.12055 22.8769 10.5768 23.4876 11.7512 23.3467C12.7846 23.2057 13.3953 22.5951 13.7241 22.1253C14.6637 22.642 15.1334 22.8769 16.1669 23.2527C15.6971 23.2527 15.1804 23.2997 14.7106 23.4406C13.5832 23.7694 12.9256 24.5211 12.6437 24.9438C12.5498 25.0848 12.7377 25.3666 13.0195 25.4606C13.8181 25.6954 15.4153 25.9773 16.5427 25.5545C17.5292 25.1787 17.9989 24.4271 18.1868 23.9104C18.6566 24.0513 18.8915 24.0983 19.3612 24.1922C19.784 24.2862 20.1598 24.0983 20.2068 23.8164C20.3477 23.6755 20.0658 23.3467 19.69 23.2997Z" fill="black"/>
                            <path d="M44.1641 7.84502C43.6474 7.79804 42.6609 7.89199 41.7214 8.59663C41.3456 8.87848 41.0167 9.25428 40.7349 9.63009C41.0167 8.59663 41.1107 8.0799 41.2516 6.99946C41.8153 6.99946 42.6609 6.90551 43.4125 6.10693C44.258 5.21439 44.5869 3.61722 44.6808 2.77166C44.7278 2.44284 44.5399 2.16098 44.352 2.20796C43.8353 2.30191 42.8957 2.63074 42.1441 3.57025C41.8623 3.94605 41.6274 4.41581 41.4395 4.83859C41.4395 3.6642 41.4395 3.05352 41.2516 1.83215C41.2046 1.40938 40.9228 1.08055 40.6409 1.12752C40.3591 1.1745 40.1712 1.5503 40.2181 1.92611C40.3591 3.05352 40.406 3.6642 40.3591 4.79161C40.1712 4.36883 39.9363 3.94605 39.6075 3.6642C38.8089 2.86562 37.7754 2.86562 37.2587 2.86562C37.0708 2.86562 36.9299 3.10049 37.0238 3.2884C37.2117 3.8521 37.5405 4.88556 38.2921 5.68415C38.9028 6.38878 39.7014 6.71761 40.2181 6.81156C40.0772 7.84502 39.9833 8.31477 39.7484 9.30126C39.6544 8.87848 39.5135 8.40872 39.2786 8.03292C38.668 7.09341 37.6815 6.85853 37.2117 6.76458C37.0238 6.71761 36.8829 6.90551 36.8829 7.09341C36.9299 7.65712 37.0238 8.73755 37.5405 9.67706C37.9633 10.4756 38.668 10.9924 39.1847 11.2273C38.8089 12.1668 38.621 12.6365 38.1512 13.4821C38.1982 13.0593 38.1512 12.5895 37.9633 12.1668C37.5875 11.1333 36.695 10.6635 36.2252 10.4287C36.0373 10.3347 35.8494 10.4756 35.8024 10.6635C35.7085 11.2273 35.5676 12.2607 35.8494 13.2942C36.0843 14.1867 36.648 14.7974 37.0708 15.1732C36.5071 16.0188 36.2252 16.3946 35.5206 17.1462C35.6615 16.7234 35.7085 16.2536 35.6615 15.8309C35.5206 14.7504 34.769 14.0928 34.3462 13.7639C34.2053 13.67 33.9704 13.717 33.8765 13.9049C33.6416 14.4216 33.2658 15.4081 33.3127 16.4885C33.3597 17.381 33.7355 18.1327 34.0644 18.6024C33.3127 19.2601 32.9369 19.5889 32.0914 20.1526C32.3263 19.7768 32.4672 19.354 32.5611 18.8843C32.7021 17.8038 32.0914 16.9583 31.8095 16.5825C31.6686 16.4415 31.4337 16.4415 31.3398 16.6294C31.0109 17.0992 30.4003 17.9917 30.1654 19.0252C29.9775 19.9177 30.1654 20.7633 30.4003 21.28C29.5077 21.7967 29.038 21.9846 28.0985 22.3604C28.4273 22.0316 28.7091 21.6558 28.8501 21.233C29.2259 20.1996 28.897 19.2601 28.6622 18.7903C28.5682 18.6024 28.3333 18.6024 28.1924 18.7433C27.7696 19.1191 26.9241 19.8238 26.4543 20.8103C26.0315 21.6558 26.0315 22.5014 26.1255 23.0651C25.6557 23.206 25.4678 23.253 24.9981 23.3469C24.6223 23.4409 24.2934 23.7227 24.3404 24.0046C24.3874 24.2864 24.7632 24.4743 25.186 24.3804C25.6557 24.2864 25.8906 24.2395 26.3604 24.0985C26.5483 24.6153 27.018 25.3669 28.0045 25.7427C29.1789 26.1655 30.7291 25.8836 31.5277 25.6487C31.8095 25.5548 31.9974 25.3199 31.9035 25.132C31.6216 24.7092 31.0109 23.9106 29.8366 23.6288C29.3668 23.4879 28.897 23.4409 28.3803 23.4409C29.4138 23.0651 29.8835 22.8302 30.823 22.3135C31.1519 22.7832 31.7626 23.3939 32.796 23.5348C34.0174 23.6758 35.4266 23.0651 36.1313 22.6423C36.3662 22.5014 36.5071 22.2195 36.3662 22.0786C35.9904 21.7028 35.1918 21.1391 34.0174 21.0451C33.5476 21.0451 33.0779 21.0921 32.6081 21.1861C33.5006 20.5754 33.8765 20.2466 34.675 19.5419C35.0978 19.9177 35.8024 20.3875 36.8829 20.2466C38.1042 20.1056 39.3256 19.2131 39.9363 18.6494C40.1712 18.4615 40.2181 18.1327 40.0302 18.0387C39.6075 17.7569 38.668 17.381 37.5405 17.5689C37.0708 17.6629 36.601 17.8038 36.1783 18.0387C36.8829 17.2401 37.2117 16.8173 37.7754 15.9718C38.2452 16.2067 39.0907 16.5355 40.0772 16.1597C41.2046 15.7839 42.1911 14.5625 42.6609 13.9049C42.8018 13.67 42.8018 13.3412 42.6139 13.2942C42.0972 13.1063 41.1577 12.9653 40.0772 13.4351C39.6544 13.623 39.2317 13.9049 38.8559 14.1867C39.3726 13.2472 39.5605 12.7774 39.9363 11.791C40.453 11.9319 41.3456 12.0258 42.2381 11.4621C43.2716 10.8045 43.9762 9.39521 44.2111 8.59663C44.4459 8.17385 44.352 7.84502 44.1641 7.84502Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    <Typography
                        fontSize={14}
                        fontFamily='Inter'
                        fontWeight={700}
                        sx={{
                            color: '#000'
                        }}
                    >
                        {teacherStudentsGraduated ?? 0} Student(s)
                    </Typography>
                </Stack>
                <Stack
                    alignItems='center'
                    width='fit-content'
                    gap={1.5}
                >
                    <SvgIcon sx={{ fontSize: 60 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 35 30" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M27.6867 4.43094L28.8326 6.7154L31.3347 7.1459L29.5682 8.96863L29.9417 11.5401L27.7044 10.382L25.4328 11.5401L25.817 9.00186L24.0397 7.1449L26.5138 6.73453L27.6867 4.42994V4.43094ZM7.31208 4.43094L8.45847 6.7154L10.9611 7.1459L9.19211 8.96863L9.56556 11.5401L7.32829 10.382L5.05762 11.5401L5.4409 9.00186L3.66504 7.1449L6.13915 6.73453L7.31208 4.42994V4.43094ZM17.4999 0L19.3593 3.70789L23.4201 4.40728L20.5533 7.36493L21.1587 11.5391L17.5274 9.66248L13.8421 11.5426L14.4651 7.42284L11.5787 4.40828L15.5958 3.74213L17.4999 0.00100744V0ZM17.4999 21.4463C19.5604 21.4465 21.548 22.2277 23.0801 23.6396C24.6121 25.0514 25.5804 26.9941 25.7984 29.0937C25.8103 29.208 25.7986 29.3236 25.764 29.433C25.7295 29.5424 25.6729 29.6431 25.5978 29.7286C25.5228 29.8141 25.431 29.8825 25.3285 29.9292C25.226 29.976 25.115 30.0001 25.0028 30H9.9965C9.88429 30.0001 9.77331 29.976 9.6708 29.9292C9.56828 29.8825 9.47652 29.8141 9.40148 29.7286C9.32644 29.6431 9.26981 29.5424 9.23526 29.433C9.20071 29.3236 9.18902 29.208 9.20095 29.0937C9.41919 26.9942 10.3876 25.0517 11.9197 23.64C13.4519 22.2284 15.4395 21.4473 17.4999 21.4473C16.7543 21.4473 16.0255 21.2207 15.4055 20.7963C14.7856 20.3718 14.3024 19.7685 14.017 19.0627C13.7317 18.3569 13.657 17.5802 13.8024 16.8309C13.9478 16.0815 14.3068 15.3932 14.834 14.8529C15.3612 14.3127 16.0329 13.9447 16.7641 13.7956C17.4954 13.6465 18.2534 13.7229 18.9422 14.0152C19.6311 14.3075 20.2199 14.8026 20.6342 15.4378C21.0485 16.073 21.2697 16.8198 21.2698 17.5838C21.2698 18.6084 20.8726 19.591 20.1656 20.3155C19.4587 21.04 18.4998 21.4471 17.4999 21.4473V21.4463ZM27.6867 22.4669C28.3435 22.4669 28.9854 22.2673 29.5315 21.8934C30.0775 21.5196 30.5031 20.9881 30.7544 20.3664C31.0056 19.7446 31.0713 19.0605 30.9431 18.4005C30.8149 17.7405 30.4986 17.1343 30.0342 16.6585C29.5697 16.1827 28.978 15.8588 28.3339 15.7276C27.6897 15.5965 27.0221 15.664 26.4154 15.9216C25.8088 16.1793 25.2903 16.6155 24.9256 17.1752C24.5608 17.7348 24.3663 18.3927 24.3665 19.0656C24.3667 19.9678 24.7167 20.8329 25.3393 21.4708C25.9619 22.1086 26.8063 22.4669 27.6867 22.4669ZM7.31208 15.6629C6.87269 15.6574 6.43661 15.7414 6.02912 15.9099C5.62163 16.0784 5.25083 16.3281 4.93823 16.6445C4.62563 16.961 4.37743 17.3379 4.20804 17.7533C4.03865 18.1688 3.95142 18.6146 3.95142 19.0649C3.95142 19.5152 4.03865 19.961 4.20804 20.3764C4.37743 20.7919 4.62563 21.1688 4.93823 21.4852C5.25083 21.8017 5.62163 22.0514 6.02912 22.2199C6.43661 22.3884 6.87269 22.4724 7.31208 22.4669C5.49795 22.4673 3.74803 23.155 2.39889 24.3977C1.04975 25.6405 0.196678 27.3505 0.00375794 29.1989C-0.00641056 29.2995 0.00411273 29.4011 0.0346488 29.4972C0.0651848 29.5933 0.115055 29.6819 0.181039 29.757C0.247023 29.8322 0.327655 29.8923 0.41773 29.9336C0.507804 29.9748 0.605318 29.9962 0.703977 29.9965H8.39607C8.24286 29.6841 8.18108 29.333 8.21819 28.9854C8.43441 26.8683 9.33762 24.8868 10.7832 23.3581C9.71629 22.7712 8.52398 22.4647 7.31306 22.4659C7.75245 22.4714 8.18853 22.3874 8.59602 22.2189C9.00351 22.0504 9.37431 21.8007 9.68691 21.4842C9.99951 21.1678 10.2477 20.7909 10.4171 20.3754C10.5865 19.9599 10.6737 19.5142 10.6737 19.0639C10.6737 18.6136 10.5865 18.1678 10.4171 17.7523C10.2477 17.3369 9.99951 16.96 9.68691 16.6435C9.37431 16.3271 9.00351 16.0774 8.59602 15.9089C8.18853 15.7403 7.75245 15.6564 7.31306 15.6619L7.31208 15.6629ZM27.6867 22.4679C26.4758 22.4659 25.2834 22.7722 24.2166 23.3591C25.6619 24.8883 26.5647 26.8702 26.7806 28.9874C26.818 29.3349 26.7566 29.686 26.6037 29.9985H34.2958C34.3947 29.9983 34.4924 29.9768 34.5826 29.9354C34.6728 29.8941 34.7535 29.8337 34.8196 29.7583C34.8856 29.683 34.9354 29.5942 34.9658 29.4978C34.9962 29.4015 35.0065 29.2996 34.996 29.1989C34.8031 27.3504 33.9498 25.6404 32.6005 24.3978C31.2511 23.1552 29.5009 22.4678 27.6867 22.4679Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                    <Typography
                        fontSize={14}
                        fontFamily='Inter'
                        fontWeight={700}
                        sx={{
                            color: '#000'
                        }}
                    >
                        {
                            userData?.averageRating === 5 ?
                            <Stack
                                direction='row'
                                gap={0.65}
                            >
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                            </Stack>
                            :
                            userData?.averageRating === 4 ?
                            <Stack
                                direction='row'
                                gap={0.65}
                            >
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                            </Stack>
                            :
                            userData?.averageRating === 3 ?
                            <Stack
                                direction='row'
                                gap={0.65}
                            >
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                            </Stack>
                            :
                            userData?.averageRating === 2 ?
                            <Stack
                                direction='row'
                                gap={0.65}
                            >
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                            </Stack>
                            :
                            <Stack
                                direction='row'
                                gap={0.65}
                            >
                                <StarRate sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                                <StarOutline sx={{ fontSize: 18, color: '#FF9F06' }} />
                            </Stack>
                        }
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}
