import { Avatar } from "@mui/material";
import avatar from '../../../assets/teacherprofile-min.png'
import { memo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function AvatarLazyLoad() {
  return (
    <Avatar src={avatar} sx={{ width: '82px', height: '82px' }} />
  )
}

const memoizedAvatar = memo(AvatarLazyLoad)
export default memoizedAvatar