import React from 'react';
import userProfile from '../../../assets/icons/user-profileWhite.svg';
import { Box } from '@mui/material';

const UserProfileWhiteIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'35px',
            height:'35px',

        }}>
            <img src={userProfile} alt="userProfileIcon"/>
        </Box>
    )
}

export default UserProfileWhiteIcon;