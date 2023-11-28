import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import logo from '../../../assets/Ellipse 1.png'
import { memo, useContext } from "react";
import { PageContext } from "../../Layout";

// eslint-disable-next-line react-refresh/only-export-components
function Header() 
{
    //@ts-expect-error context
    const { page, setPage } = useContext(PageContext)

    

    return (
        <Box
            width='auto'
            px={14}
            py={2}
            display='flex'
            flexDirection='column'
            boxShadow='0px 2px 8px 0px rgba(0,0,0,0.2)'
            // mb={1}
            position='relative'
            zIndex={99}
        >
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                mb={1}
            >
                <img width='85px' height='85px' src={logo} alt='logo' />
                <Stack
                    direction='row'
                    alignItems='center'
                    gap={6}
                    pb={3}
                >
                    <SvgIcon sx={{ fontSize: 30, border: '1.5px solid', padding: 0.5, borderRadius: '6px', borderColor: '#6A9DBC' }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.098 23.8687L21.201 19.6566C22.8858 17.5505 24.0091 14.8828 24.0091 12.0747C23.8687 5.33535 18.5333 0 11.9343 0C5.33535 0 0 5.33535 0 11.9343C0 18.5333 5.33535 23.8687 11.9343 23.8687C14.8828 23.8687 17.4101 22.8858 19.5162 21.0606L23.7283 26.9576C24.5707 28.2212 26.2555 28.3616 27.2384 27.2384C28.2212 26.1151 28.2212 24.7111 27.098 23.8687ZM11.9343 21.0606C6.8798 21.0606 2.80808 16.9889 2.80808 11.9343C2.80808 6.8798 6.8798 2.80808 11.9343 2.80808C16.9889 2.80808 21.0606 6.8798 21.0606 11.9343C21.0606 16.9889 16.9889 21.0606 11.9343 21.0606Z" fill="url(#paint0_linear_2_11900)"/>
                            <defs>
                            <linearGradient id="paint0_linear_2_11900" x1="2" y1="3" x2="29.5" y2="30.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#226E9F"/>
                            <stop offset="0.94445" stopColor="#6A9DBC"/>
                            </linearGradient>
                            </defs>
                        </svg>
                    </SvgIcon>
                    <SvgIcon sx={{ fontSize: 42 }}>
                        <svg width="41" height="38" viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.08203" y="0.5" width="38.5833" height="37" rx="4.5" fill="white" stroke="#00C342"/>
                            <path d="M29.7939 25.6028C29.7949 26.0918 29.6019 26.5611 29.2572 26.908C28.9126 27.2548 28.4444 27.4507 27.9555 27.4528H12.4202C11.9321 27.4512 11.4646 27.2562 11.1201 26.9105C10.7755 26.5648 10.582 26.0966 10.582 25.6086C10.582 25.1205 10.7755 24.6523 11.1201 24.3066C11.4646 23.9609 11.9321 23.7659 12.4202 23.7643H27.9555C28.4426 23.7658 28.9094 23.9599 29.2539 24.3044C29.5984 24.6489 29.7925 25.1157 29.7939 25.6028ZM27.2621 17.1961C26.0957 17.1989 24.9521 16.8732 23.9621 16.2564C22.9721 15.6395 22.1758 14.7565 21.6643 13.7082C21.1527 12.6599 20.9466 11.4888 21.0695 10.3289C21.1925 9.169 21.6394 8.06712 22.3593 7.14937C21.966 7.02793 21.5621 6.94391 21.153 6.89843V4.96822C21.1534 4.84122 21.1287 4.71538 21.0804 4.59793C21.0321 4.48048 20.961 4.37372 20.8714 4.28377C20.7817 4.19383 20.6752 4.12246 20.5579 4.07376C20.4406 4.02507 20.3149 4 20.1879 4C20.0609 4 19.9351 4.02507 19.8178 4.07376C19.7005 4.12246 19.594 4.19383 19.5043 4.28377C19.4147 4.37372 19.3436 4.48048 19.2953 4.59793C19.247 4.71538 19.2223 4.84122 19.2227 4.96822V6.91774C17.3739 7.15948 15.6754 8.06331 14.442 9.4617C13.2087 10.8601 12.5241 12.6582 12.5152 14.5228V21.8383H27.8605V17.1672C27.6578 17.1865 27.4647 17.1961 27.2621 17.1961ZM17.9102 29.3854C17.9115 29.9886 18.152 30.5667 18.579 30.9929C19.006 31.419 19.5846 31.6583 20.1879 31.6583C20.7911 31.6583 21.3697 31.419 21.7967 30.9929C22.2237 30.5667 22.4642 29.9886 22.4655 29.3854H17.9102Z" fill="#226E9F"/>
                            <circle cx="27.582" cy="11" r="5" fill="#00C342"/>
                        </svg>
                    </SvgIcon>
                    <SvgIcon sx={{ fontSize: 30, border: '1.5px solid', padding: 0.5, borderRadius: '6px', borderColor: '#6A9DBC' }}>
                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.079 14.2794V13.6348C22.079 12.8283 21.4246 12.174 20.6181 12.174H19.8877C19.0811 12.174 18.4268 12.8283 18.4268 13.6348V14.2794C18.0829 14.3872 17.7524 14.5253 17.4377 14.6897L16.9818 14.2332C16.4114 13.6628 15.4862 13.6628 14.9158 14.2332L14.3991 14.75C13.8287 15.3203 13.8287 16.2455 14.3991 16.8159L14.8556 17.2724C14.6912 17.5865 14.5531 17.917 14.4453 18.2609H13.8007C12.9942 18.2609 12.3398 18.9153 12.3398 19.7218V20.4522C12.3398 21.2587 12.9942 21.9131 13.8007 21.9131H14.4453C14.5531 22.257 14.6912 22.5875 14.8556 22.9022L14.3991 23.3581C13.8287 23.9285 13.8287 24.8537 14.3991 25.424L14.9158 25.9408C15.4862 26.5112 16.4114 26.5112 16.9818 25.9408L17.4383 25.4843C17.7524 25.6486 18.0829 25.7868 18.4268 25.8946V26.5392C18.4268 27.3457 19.0811 28 19.8877 28H20.6181C21.4246 28 22.079 27.3457 22.079 26.5392V25.8946C22.4229 25.7868 22.7534 25.6486 23.0681 25.4843L23.524 25.9408C24.0944 26.5112 25.0196 26.5112 25.5899 25.9408L26.1067 25.424C26.6771 24.8537 26.6771 23.9285 26.1067 23.3581L25.6502 22.9016C25.8145 22.5875 25.9527 22.257 26.0604 21.9131H26.7051C27.5116 21.9131 28.1659 21.2587 28.1659 20.4522V19.7218C28.1659 18.9153 27.5116 18.2609 26.7051 18.2609H26.0604C25.9527 17.917 25.8145 17.5865 25.6502 17.2718L26.1067 16.8159C26.6771 16.2455 26.6771 15.3203 26.1067 14.75L25.5899 14.2332C25.0196 13.6628 24.0944 13.6628 23.524 14.2332L23.0675 14.6897C22.7534 14.5253 22.4229 14.3872 22.079 14.2794ZM20.8616 14.7445C20.8616 15.0287 21.0582 15.2753 21.3352 15.3386C21.8781 15.4615 22.387 15.6758 22.8441 15.9643C23.0845 16.1159 23.398 16.0812 23.5995 15.8797L24.3847 15.0945C24.4797 14.9989 24.6343 14.9989 24.7292 15.0945L25.2454 15.6106C25.341 15.7056 25.341 15.8602 25.2454 15.9552L24.4602 16.7404C24.2587 16.9419 24.224 17.2553 24.3756 17.4958C24.6641 17.9529 24.8784 18.4618 25.0013 19.0047C25.0646 19.2817 25.3112 19.4783 25.5954 19.4783H26.7051C26.8396 19.4783 26.9485 19.5873 26.9485 19.7218V20.4522C26.9485 20.5867 26.8396 20.6957 26.7051 20.6957C26.1755 20.6957 25.5954 20.6957 25.5954 20.6957C25.3112 20.6957 25.0646 20.8923 25.0013 21.1693C24.8784 21.7122 24.6641 22.2211 24.3756 22.6782C24.224 22.9186 24.2587 23.2321 24.4602 23.4336L25.2454 24.2188C25.341 24.3138 25.341 24.4684 25.2454 24.5633L24.7292 25.0795C24.6343 25.1751 24.4797 25.1751 24.3847 25.0795L23.5995 24.2943C23.398 24.0928 23.0845 24.0581 22.8441 24.2097C22.387 24.4982 21.8781 24.7125 21.3352 24.8354C21.0582 24.8987 20.8616 25.1453 20.8616 25.4295V26.5392C20.8616 26.6737 20.7526 26.7826 20.6181 26.7826H19.8877C19.7531 26.7826 19.6442 26.6737 19.6442 26.5392C19.6442 26.0096 19.6442 25.4295 19.6442 25.4295C19.6442 25.1453 19.4476 24.8987 19.1706 24.8354C18.6277 24.7125 18.1188 24.4982 17.6617 24.2097C17.4212 24.0581 17.1078 24.0928 16.9063 24.2943L16.1211 25.0795C16.0261 25.1751 15.8715 25.1751 15.7765 25.0795L15.2604 24.5633C15.1648 24.4684 15.1648 24.3138 15.2604 24.2188L16.0456 23.4336C16.2471 23.2321 16.2818 22.9186 16.1302 22.6782C15.8417 22.2211 15.6274 21.7122 15.5045 21.1693C15.4412 20.8923 15.1946 20.6957 14.9104 20.6957H13.8007C13.6662 20.6957 13.5572 20.5867 13.5572 20.4522V19.7218C13.5572 19.5873 13.6662 19.4783 13.8007 19.4783C14.3303 19.4783 14.9104 19.4783 14.9104 19.4783C15.1946 19.4783 15.4412 19.2817 15.5045 19.0047C15.6274 18.4618 15.8417 17.9529 16.1302 17.4958C16.2818 17.2553 16.2471 16.9419 16.0456 16.7404L15.2604 15.9552C15.1648 15.8602 15.1648 15.7056 15.2604 15.6106L15.7765 15.0945C15.8715 14.9989 16.0261 14.9989 16.1211 15.0945L16.9063 15.8797C17.1078 16.0812 17.4212 16.1159 17.6617 15.9643C18.1188 15.6758 18.6277 15.4615 19.1706 15.3386C19.4476 15.2753 19.6442 15.0287 19.6442 14.7445V13.6348C19.6442 13.5003 19.7531 13.3913 19.8877 13.3913H20.6181C20.7526 13.3913 20.8616 13.5003 20.8616 13.6348C20.8616 14.1644 20.8616 14.7445 20.8616 14.7445Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.6427 16.8395C9.92923 16.2875 8.68809 14.6787 8.68809 12.7826C8.68809 10.4312 10.5976 8.52171 12.949 8.52171C14.8451 8.52171 16.4538 9.76284 17.0059 11.4763C17.1088 11.7965 17.4521 11.9724 17.7717 11.8695C18.0912 11.7661 18.2677 11.4234 18.1643 11.1032C17.4545 8.90032 15.3868 7.30432 12.949 7.30432C9.92557 7.30432 7.4707 9.75919 7.4707 12.7826C7.4707 15.2204 9.0667 17.2881 11.2696 17.9979C11.5897 18.1014 11.9324 17.9248 12.0359 17.6053C12.1388 17.2857 11.9629 16.9424 11.6427 16.8395Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.2544 17.0435C18.5744 17.0435 17.2109 18.4069 17.2109 20.0869C17.2109 21.7669 18.5744 23.1304 20.2544 23.1304C21.9344 23.1304 23.2979 21.7669 23.2979 20.0869C23.2979 18.4069 21.9344 17.0435 20.2544 17.0435ZM20.2544 18.2608C21.2624 18.2608 22.0805 19.0789 22.0805 20.0869C22.0805 21.0949 21.2624 21.913 20.2544 21.913C19.2464 21.913 18.4283 21.0949 18.4283 20.0869C18.4283 19.0789 19.2464 18.2608 20.2544 18.2608Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.3399 24.3478C12.1786 24.3478 12.0234 24.2839 11.9096 24.1695C11.7951 24.0557 11.7312 23.9004 11.7312 23.7391V22.3507C11.7312 22.0579 11.5237 21.8071 11.2364 21.7523C9.98855 21.5156 8.8308 21.0237 7.81854 20.3347C7.57689 20.1703 7.25245 20.2008 7.0455 20.4071L6.06184 21.3908C5.94802 21.5052 5.7928 21.5691 5.6315 21.5691C5.47019 21.5691 5.31558 21.5052 5.20115 21.3908L4.34045 20.5301C4.22602 20.4157 4.1621 20.261 4.1621 20.0997C4.1621 19.9384 4.22602 19.7832 4.34045 19.6694L5.3241 18.6857C5.53045 18.4788 5.56089 18.1544 5.39654 17.9127C4.70689 16.9004 4.21567 15.7421 3.97889 14.4949C3.92411 14.2076 3.67332 14 3.38054 14H1.9921C1.8308 14 1.67558 13.9361 1.56175 13.8217C1.44732 13.7078 1.38341 13.5526 1.38341 13.3913V12.1739C1.38341 12.0126 1.44732 11.8574 1.56175 11.7436C1.67558 11.6291 1.8308 11.5652 1.9921 11.5652H3.38054C3.67332 11.5652 3.92411 11.3577 3.97889 11.0703C4.21567 9.82252 4.7075 8.66478 5.39654 7.65252C5.56089 7.41087 5.53045 7.08643 5.3241 6.87948L4.34045 5.89583C4.22602 5.782 4.1621 5.62678 4.1621 5.46548C4.1621 5.30417 4.22602 5.14957 4.34045 5.03513L5.20115 4.17444C5.31558 4.06 5.47019 3.99609 5.6315 3.99609C5.7928 3.99609 5.94802 4.06 6.06184 4.17444L7.0455 5.15809C7.25245 5.36443 7.57689 5.39487 7.81854 5.23052C8.8308 4.54087 9.98915 4.04965 11.2364 3.81287C11.5237 3.75809 11.7312 3.5073 11.7312 3.21452V1.82609C11.7312 1.66478 11.7951 1.50956 11.9096 1.39574C12.0234 1.2813 12.1786 1.21739 12.3399 1.21739H13.5573C13.7186 1.21739 13.8738 1.2813 13.9877 1.39574C14.1021 1.50956 14.166 1.66478 14.166 1.82609V3.21452C14.166 3.5073 14.3736 3.75809 14.6609 3.81287C15.9087 4.04965 17.0665 4.54148 18.0787 5.23052C18.3204 5.39487 18.6448 5.36443 18.8518 5.15809L19.8354 4.17444C19.9492 4.06 20.1044 3.99609 20.2658 3.99609C20.4271 3.99609 20.5817 4.06 20.6961 4.17444L21.5568 5.03513C21.6712 5.14957 21.7351 5.30417 21.7351 5.46548C21.7351 5.62678 21.6712 5.782 21.5568 5.89583L20.5731 6.87948C20.3668 7.08643 20.3364 7.41087 20.5007 7.65252C21.1904 8.66478 21.6816 9.82313 21.9184 11.0703C21.9731 11.3577 22.2239 11.5652 22.5167 11.5652H23.9051C24.0665 11.5652 24.2217 11.6291 24.3355 11.7436C24.4499 11.8574 24.5138 12.0126 24.5138 12.1739C24.5138 12.5099 24.7865 12.7826 25.1225 12.7826C25.4585 12.7826 25.7312 12.5099 25.7312 12.1739C25.7312 11.6894 25.5389 11.225 25.1962 10.8829C24.8541 10.5402 24.3897 10.3478 23.9051 10.3478H23.0079C22.7523 9.29052 22.3341 8.29591 21.7814 7.39261L22.4175 6.75713C22.7602 6.41444 22.9525 5.95 22.9525 5.46548C22.9525 4.98157 22.7602 4.51652 22.4175 4.17444L21.5568 3.31374C21.2147 2.97104 20.7497 2.77869 20.2658 2.77869C19.7812 2.77869 19.3168 2.97104 18.9741 3.31374L18.3386 3.94922C17.4353 3.39713 16.4407 2.97896 15.3834 2.7233V1.82609C15.3834 1.34157 15.1911 0.877131 14.8484 0.535044C14.5063 0.192349 14.0418 0 13.5573 0H12.3399C11.8554 0 11.391 0.192349 11.0489 0.535044C10.7062 0.877131 10.5138 1.34157 10.5138 1.82609V2.7233C9.45654 2.97896 8.46193 3.39713 7.55863 3.94983L6.92315 3.31374C6.58045 2.97104 6.11602 2.77869 5.6315 2.77869C5.14758 2.77869 4.68254 2.97104 4.34045 3.31374L3.47976 4.17444C3.13706 4.51652 2.94471 4.98157 2.94471 5.46548C2.94471 5.95 3.13706 6.41444 3.47976 6.75713L4.11524 7.39261C3.56315 8.29591 3.14497 9.29052 2.88932 10.3478H1.9921C1.50758 10.3478 1.04314 10.5402 0.701058 10.8829C0.358362 11.225 0.166016 11.6894 0.166016 12.1739V13.3913C0.166016 13.8758 0.358362 14.3403 0.701058 14.6824C1.04314 15.025 1.50758 15.2174 1.9921 15.2174H2.88932C3.14497 16.2747 3.56315 17.2693 4.11584 18.1726L3.47976 18.8081C3.13706 19.1508 2.94471 19.6152 2.94471 20.0997C2.94471 20.5837 3.13706 21.0487 3.47976 21.3908L4.34045 22.2515C4.68254 22.5942 5.14758 22.7865 5.6315 22.7865C6.11602 22.7865 6.58045 22.5942 6.92315 22.2515L7.55863 21.616C8.46193 22.1681 9.45654 22.5863 10.5138 22.8419V23.7391C10.5138 24.2237 10.7062 24.6881 11.0489 25.0302C11.391 25.3729 11.8554 25.5652 12.3399 25.5652C12.6759 25.5652 12.9486 25.2925 12.9486 24.9565C12.9486 24.6205 12.6759 24.3478 12.3399 24.3478Z" fill="black"/>
                        </svg>
                    </SvgIcon>
                </Stack>
            </Stack>
            <hr style={{ borderTop: '1px solid #000', margin: 0, opacity: 0.25 }} />
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                mb={2}
                mt={3}
                gap={5}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    ml={3}
                >
                    <SvgIcon sx={{ fontSize: 36 }}>
                        <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.103 22.3771L26.3598 19.6449C25.8898 19.3006 25.3106 19.1585 24.7314 19.2514C24.1521 19.3388 23.6439 19.6503 23.3051 20.1203L22.1467 21.705C22.0866 21.7869 22.1084 21.7104 22.0811 21.8143C22.0756 21.8252 22.0101 21.9126 21.8024 21.9454C21.4527 22 20.4035 21.9345 18.1357 20.1203L17.9172 19.9618C15.5292 18.3716 15.1467 17.3935 15.092 17.0438C15.0647 16.8634 15.1084 16.776 15.103 16.7705C15.1795 16.7214 15.1576 16.7214 15.2177 16.6449L16.3762 15.0602C16.7204 14.5902 16.8625 14.011 16.7696 13.4317C16.6767 12.8525 16.3707 12.3443 15.9008 12L12.092 9.21863C11.1193 8.50824 9.74776 8.72136 9.03738 9.69404L7.86798 11.3006C6.83519 12.7159 6.55651 14.6503 7.1412 16.3552C8.04284 18.9837 10.3434 21.776 13.9827 24.6613C14.0319 24.7214 14.0866 24.7705 14.1521 24.8197C14.245 24.8853 14.3379 24.9509 14.4308 25.011C14.5183 25.082 14.6112 25.1476 14.6986 25.2186C14.7587 25.2678 14.8297 25.3061 14.9008 25.3334C18.7587 27.9181 22.1193 29.2569 24.9008 29.317C24.939 29.317 24.9718 29.317 25.0101 29.317C26.7368 29.317 28.3816 28.47 29.4254 27.0328L30.5948 25.4263C30.939 24.9563 31.0811 24.3771 30.9882 23.7979C30.8953 23.2186 30.5729 22.7214 30.103 22.3771ZM29.256 24.4645L28.0866 26.0711C27.3325 27.1039 26.1467 27.6995 24.9172 27.6776C23.1521 27.6394 20.0756 26.9126 15.3816 23.6886C10.8844 20.2022 9.2505 17.4919 8.67672 15.8252C8.26142 14.623 8.45268 13.2569 9.17946 12.2678L10.3543 10.6612C10.4418 10.541 10.5674 10.4645 10.7095 10.4427C10.8516 10.4208 10.9991 10.4536 11.1193 10.541L14.9281 13.3225C15.0483 13.4099 15.1248 13.5356 15.1467 13.6776C15.1685 13.8197 15.1357 13.9673 15.0483 14.0875L13.9281 15.623C13.6658 15.9072 13.4035 16.4263 13.4472 17.082C13.5346 18.399 14.6986 19.7815 16.9827 21.3006L17.1467 21.4153C19.3106 23.1476 20.9882 23.8361 22.2669 23.5137C22.9062 23.3552 23.3215 22.9509 23.5128 22.6121L24.633 21.0766C24.8079 20.8307 25.1521 20.7815 25.398 20.9563L29.1412 23.6886C29.2614 23.776 29.3379 23.9017 29.3598 24.0438C29.3762 24.2022 29.3434 24.3498 29.256 24.4645Z" fill="#04A427"/>
                            <path d="M19 0C8.52459 0 0 8.52459 0 19C0 23.4918 1.5847 27.8197 4.47541 31.2404L1.10383 37.8142C0.956284 38.1038 0.994536 38.459 1.20219 38.7104C1.36066 38.9016 1.59563 39.0055 1.8306 39.0055C1.9071 39.0055 1.98907 38.9945 2.06557 38.9727L11.1093 36.2842C13.5956 37.4208 16.2459 37.9945 19 37.9945C29.4754 37.9945 38 29.4699 38 18.9945C38 8.51912 29.4754 0 19 0ZM19 36.3552C16.388 36.3552 13.8743 35.7869 11.5246 34.6667C11.3388 34.5792 11.1311 34.5628 10.9399 34.623L3.43716 36.8525L6.18579 31.4918C6.3388 31.1913 6.29508 30.8251 6.06557 30.5683C3.21312 27.3825 1.63934 23.2678 1.63934 18.9945C1.63934 9.42076 9.42623 1.63388 19 1.63388C28.5738 1.63388 36.3607 9.42076 36.3607 18.9945C36.3607 28.5683 28.5738 36.3552 19 36.3552Z" fill="#04A427"/>
                        </svg>
                    </SvgIcon>
                    <Stack
                        direction='row'
                        gap={2}
                        ml={{xs: 4, sm: 4, lg: 8}}
                        alignItems='center'
                    >
                        <Typography onClick={() => setPage('profile')} sx={{ color: page === 'profile' ? '#226E9F' : '#000', cursor: 'pointer' }}>
                            Profile
                        </Typography>
                        <SvgIcon>
                            <svg width="1" height="22" viewBox="0 0 1 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.501953" y1="2.18558e-08" x2="0.501952" y2="22" stroke="black"/>
                            </svg>
                        </SvgIcon>
                        <Typography onClick={() => setPage('programs')} sx={{ color: page === 'profile' ? '#000' : '#226E9F', cursor: 'pointer' }}>
                            Programs
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    gap={5}
                >
                    <Button
                        sx={{
                            background: 'linear-gradient(95deg, #FF7E00 5.94%, #FF9F06 95.69%)',
                            borderRadius: '2rem',
                            border: '0px',
                            outline: 'none',
                            width: '160px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <SvgIcon>
                            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" d="M9.1609 3.08257C5.8597 3.08257 3.17403 5.6945 3.17403 8.90517C3.17403 10.8642 4.16663 12.6635 5.83707 13.7482V15.4653C5.83707 15.6158 5.9591 15.7381 6.10983 15.7381H12.212C12.3625 15.7381 12.4847 15.6161 12.4847 15.4653V13.7482C14.1554 12.6632 15.1478 10.864 15.1478 8.90517C15.1478 5.6945 12.4621 3.08257 9.1609 3.08257ZM12.0692 13.3656C11.9884 13.4153 11.9392 13.5032 11.9392 13.598V15.1926H6.3826V13.598C6.3826 13.5032 6.33337 13.4153 6.25263 13.3656C4.66643 12.3907 3.71933 10.7233 3.71933 8.90493C3.71933 5.99527 6.16047 3.62787 9.1609 3.62787C12.1613 3.62787 14.6025 5.99503 14.6025 8.90493C14.6025 10.7233 13.6554 12.3909 12.0692 13.3656ZM8.88813 1.93713V0.272767C8.88813 0.122033 9.0104 0 9.1609 0C9.3114 0 9.43367 0.122033 9.43367 0.272767V1.93737C9.43367 2.08787 9.31163 2.21013 9.1609 2.21013C9.0104 2.2099 8.88813 2.08787 8.88813 1.93713ZM4.48233 1.5687C4.40533 1.4392 4.4478 1.2719 4.5773 1.1949C4.7068 1.1179 4.8741 1.1606 4.9511 1.28987L5.80813 2.7314C5.88513 2.8609 5.84243 3.0282 5.71317 3.1052C5.66953 3.1311 5.62147 3.14347 5.5741 3.14347C5.481 3.14347 5.39047 3.09587 5.33937 3.01L4.48233 1.5687ZM1.22547 4.4555C1.2992 4.32413 1.46533 4.27723 1.5967 4.35097L3.08093 5.18327C3.2123 5.257 3.2592 5.42313 3.18547 5.5545C3.13553 5.64363 3.0429 5.6938 2.94723 5.6938C2.90197 5.6938 2.85623 5.6826 2.814 5.6588L1.32977 4.8265C1.19863 4.75323 1.15197 4.58687 1.22547 4.4555ZM1.98637 9.17793H0.272767C0.122267 9.17793 0 9.0559 0 8.90517C0 8.75443 0.122033 8.6324 0.272767 8.6324H1.9866C2.1371 8.6324 2.25937 8.75443 2.25937 8.90517C2.25937 9.0559 2.1371 9.17793 1.98637 9.17793ZM3.18547 12.2556C3.2592 12.387 3.2123 12.5531 3.08093 12.6268L1.5967 13.4591C1.55447 13.4827 1.50873 13.4941 1.46347 13.4941C1.36803 13.4941 1.2754 13.444 1.22523 13.3548C1.1515 13.2235 1.1984 13.0573 1.32977 12.9836L2.814 12.1513C2.9456 12.0776 3.11197 12.1242 3.18547 12.2556ZM17.0961 13.3548C17.0462 13.444 16.9535 13.4941 16.8579 13.4941C16.8126 13.4941 16.7669 13.4829 16.7246 13.4591L15.2404 12.6268C15.109 12.5531 15.0621 12.387 15.1359 12.2556C15.2096 12.1242 15.3757 12.0773 15.5071 12.1511L16.9913 12.9834C17.1232 13.0571 17.1698 13.2235 17.0961 13.3548ZM18.3218 8.90517C18.3218 9.05567 18.1998 9.17793 18.049 9.17793H16.3352C16.1847 9.17793 16.0624 9.0559 16.0624 8.90517C16.0624 8.75443 16.1845 8.6324 16.3352 8.6324H18.049C18.1998 8.6324 18.3218 8.75443 18.3218 8.90517ZM15.1363 5.5545C15.0626 5.42313 15.1095 5.257 15.2409 5.18327L16.7251 4.35097C16.8565 4.27723 17.0226 4.32413 17.0963 4.4555C17.1701 4.58687 17.1232 4.753 16.9918 4.82673L15.5076 5.65903C15.4653 5.6826 15.4196 5.69403 15.3743 5.69403C15.2789 5.69403 15.1863 5.64387 15.1363 5.5545ZM12.5137 2.7314L13.3705 1.28987C13.4475 1.16037 13.6148 1.1179 13.7443 1.1949C13.8738 1.2719 13.9162 1.4392 13.8392 1.5687L12.9824 3.01C12.9316 3.09587 12.8408 3.14347 12.7477 3.14347C12.7003 3.14347 12.6523 3.1311 12.6086 3.1052C12.4794 3.0282 12.4367 2.8609 12.5137 2.7314ZM12.2936 16.3744C12.2936 16.5249 12.1716 16.6472 12.0209 16.6472H6.3007C6.1502 16.6472 6.02793 16.5251 6.02793 16.3744C6.02793 16.2239 6.14997 16.1016 6.3007 16.1016H12.0209C12.1716 16.1016 12.2936 16.2237 12.2936 16.3744ZM11.8617 18.844H6.46007C6.3791 18.844 6.30233 18.8799 6.25053 18.942C6.19873 19.0041 6.17727 19.0862 6.19173 19.1658C6.3833 20.2116 7.65963 21 9.1609 21C10.6622 21 11.9385 20.2116 12.1298 19.1658C12.1443 19.0862 12.1228 19.0043 12.071 18.942C12.0192 18.8799 11.9425 18.844 11.8617 18.844ZM9.1609 20.4545C8.11393 20.4545 7.17943 20.0069 6.8439 19.3893H11.4779C11.1424 20.0069 10.2079 20.4545 9.1609 20.4545ZM12.4752 7.57237C12.5475 7.40647 12.5881 7.2226 12.5881 7.02917C12.5881 6.3154 12.0405 5.73253 11.3594 5.71037C11.1883 5.18467 10.7088 4.81343 10.1572 4.81343C9.75357 4.81343 9.39353 5.01083 9.1609 5.3172C8.92827 5.0106 8.56823 4.81343 8.16457 4.81343C7.61297 4.81343 7.13347 5.18467 6.96243 5.71037C6.28133 5.73253 5.7337 6.3154 5.7337 7.02917C5.7337 7.22283 5.7743 7.4067 5.84663 7.57237C5.278 7.79987 4.8853 8.3706 4.8853 9.03723C4.8853 9.5977 5.1688 10.0903 5.59417 10.3679C5.53887 10.5177 5.50993 10.6776 5.50993 10.8411C5.50993 11.5689 6.07927 12.1611 6.77903 12.1611C6.8243 12.1611 6.8691 12.1583 6.91343 12.1534C7.014 12.7773 7.53667 13.2543 8.16457 13.2543C8.56823 13.2543 8.92827 13.0569 9.1609 12.7505C9.39353 13.0571 9.75357 13.2543 10.1572 13.2543C10.7851 13.2543 11.3078 12.7773 11.4086 12.1534C11.4529 12.1583 11.4975 12.1611 11.543 12.1611C12.2428 12.1611 12.8121 11.5689 12.8121 10.8411C12.8121 10.6778 12.7832 10.518 12.7279 10.3679C13.1532 10.09 13.4367 9.59747 13.4367 9.03723C13.4365 8.3706 13.0438 7.79987 12.4752 7.57237ZM8.16457 12.7087C7.7756 12.7087 7.45803 12.3781 7.4424 11.9658C7.76113 11.7621 7.9891 11.4154 8.0381 11.0061C8.05607 10.8565 7.94943 10.7207 7.79987 10.7028C7.6503 10.6848 7.5145 10.7914 7.49653 10.941C7.45033 11.3255 7.14187 11.6156 6.7788 11.6156C6.3798 11.6156 6.05523 11.2681 6.05523 10.8411C6.05523 10.7499 6.0704 10.661 6.09887 10.5772C6.19383 10.5968 6.29183 10.6073 6.3924 10.6073C6.80843 10.6073 7.19577 10.4347 7.483 10.1211C7.58473 10.01 7.57727 9.83757 7.4662 9.73583C7.35513 9.6341 7.1827 9.64157 7.08097 9.75263C6.89827 9.9519 6.65397 10.0618 6.39263 10.0618C5.86227 10.0618 5.43107 9.60213 5.43107 9.03723C5.43107 8.5477 5.74793 8.13843 6.1852 8.03717C6.40617 8.23153 6.69177 8.3489 7.00303 8.3489C7.15353 8.3489 7.2758 8.22687 7.2758 8.07613C7.2758 7.92563 7.15377 7.80337 7.00303 7.80337C6.60403 7.80337 6.27947 7.45593 6.27947 7.02893C6.27947 6.60193 6.60403 6.2545 7.00303 6.2545C7.40203 6.2545 7.7266 6.60193 7.7266 7.02893C7.7266 7.17943 7.84863 7.3017 7.99937 7.3017C8.1501 7.3017 8.27213 7.17967 8.27213 7.02893C8.27213 6.48643 7.95573 6.01953 7.5047 5.81677C7.6188 5.54517 7.87453 5.35873 8.16503 5.35873C8.56403 5.35873 8.8886 5.70617 8.8886 6.13317V11.9341C8.88813 12.3613 8.56357 12.7087 8.16457 12.7087ZM11.9294 10.0618C11.6683 10.0618 11.4238 9.9519 11.2411 9.75263C11.1393 9.64157 10.9667 9.6341 10.8558 9.73583C10.7448 9.83757 10.7373 10.01 10.839 10.1211C11.1263 10.4347 11.5136 10.6073 11.9294 10.6073C12.0297 10.6073 12.128 10.5968 12.2229 10.5772C12.2514 10.6612 12.2666 10.7501 12.2666 10.8411C12.2666 11.2681 11.942 11.6156 11.543 11.6156C11.1802 11.6156 10.8715 11.3255 10.8253 10.941C10.8073 10.7914 10.6717 10.685 10.5219 10.7028C10.3724 10.7207 10.2657 10.8565 10.2837 11.0061C10.3329 11.4154 10.5607 11.7619 10.8794 11.9658C10.8638 12.3781 10.5464 12.7087 10.1572 12.7087C9.75823 12.7087 9.43367 12.3613 9.43367 11.9343V6.1334C9.43367 5.7064 9.75823 5.35897 10.1572 5.35897C10.4477 5.35897 10.7035 5.5454 10.8176 5.817C10.3665 6.01977 10.0501 6.48667 10.0501 7.02917C10.0501 7.17967 10.1722 7.30193 10.3229 7.30193C10.4736 7.30193 10.5957 7.1799 10.5957 7.02917C10.5957 6.60217 10.9202 6.25473 11.3192 6.25473C11.7182 6.25473 12.0428 6.60217 12.0428 7.02917C12.0428 7.45617 11.7182 7.8036 11.3192 7.8036C11.1687 7.8036 11.0465 7.92563 11.0465 8.07637C11.0465 8.22687 11.1685 8.34913 11.3192 8.34913C11.6307 8.34913 11.9161 8.23177 12.1371 8.0374C12.5741 8.13867 12.8912 8.5477 12.8912 9.03747C12.891 9.60213 12.4595 10.0618 11.9294 10.0618ZM12.2936 17.2366C12.2936 17.3871 12.1716 17.5093 12.0209 17.5093H6.3007C6.1502 17.5093 6.02793 17.3873 6.02793 17.2366C6.02793 17.0861 6.14997 16.9638 6.3007 16.9638H12.0209C12.1716 16.964 12.2936 17.0861 12.2936 17.2366ZM12.2936 18.1993C12.2936 18.3498 12.1716 18.4721 12.0209 18.4721H6.3007C6.1502 18.4721 6.02793 18.35 6.02793 18.1993C6.02793 18.0488 6.14997 17.9265 6.3007 17.9265H12.0209C12.1716 17.9265 12.2936 18.0486 12.2936 18.1993Z" fill="white"/>
                            </svg>
                        </SvgIcon>
                        <Typography
                            color='#fff'
                            fontSize={14}
                            fontWeight={300}
                            noWrap
                            fontFamily='Inter'
                            textTransform='none'
                        >
                            Knowledge bank
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            background: 'linear-gradient(95deg, #226E9F 5.94%, #6A9DBC 95.69%)',
                            borderRadius: '2rem',
                            border: '0px',
                            outline: 'none',
                            width: '160px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <SvgIcon>
                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M0 0H18V21H0V0ZM3.37717 11.7638L4.26099 12.5937L6.20865 10.5539L7.06331 11.2971L4.30727 14.1836L2.56772 12.5502L3.37717 11.7638ZM7.47231 12.6001H15.4323V13.6804H7.47231V12.6001ZM3.37717 16.841L4.26099 17.6709L6.20865 15.6312L7.06331 16.3744L4.30727 19.2608L2.56772 17.6274L3.37717 16.841ZM7.47231 17.6773H15.4323V18.7576H7.47231V17.6773ZM2.14828 6.39344H15.8517V9.11556H2.14828V6.39344ZM2.14828 2.029H15.8517V4.75138H2.14828V2.029Z" fill="white"/>
                            </svg>
                        </SvgIcon>
                        <Typography
                            color='#fff'
                            fontSize={14}
                            fontWeight={300}
                            fontFamily='Inter'
                            textTransform='none'
                        >
                            Exam bank
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

const memoizedHeader = memo(Header)
export default memoizedHeader