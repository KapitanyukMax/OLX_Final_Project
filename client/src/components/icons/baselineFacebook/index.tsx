import React from 'react';
import baselineFacebook from '../../../assets/icons/baseline-facebook.svg';
import { Box } from '@mui/material';

const BaselineFacebookIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'30px',
            height:'30px'
        }}>
            <img src={baselineFacebook} alt="baselineFacebookIcon"/>
        </Box>
    )
}

export default BaselineFacebookIcon;