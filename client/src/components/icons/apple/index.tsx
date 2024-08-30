import React from 'react';
import apple from '../../../assets/icons/ic_round-apple.svg';
import { Box } from '@mui/material';

const AppleIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'40px',
            height:'40px',

        }}>
            <img src={apple} alt="appleIcon"/>
        </Box>
    )
}

export default AppleIcon;