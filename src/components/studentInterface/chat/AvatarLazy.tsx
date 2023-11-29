import { Avatar } from "@mui/material";
import avatar from '../../../assets/Ellipse 3.png'
import { memo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function AvatarLazy() {
  return (
    <Avatar src={avatar} sx={{ width: '70px', height: '70px' }} />
  )
}

const memoizedAvatar = memo(AvatarLazy)
export default memoizedAvatar