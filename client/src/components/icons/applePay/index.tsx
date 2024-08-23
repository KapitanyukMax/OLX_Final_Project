import React from 'react';
import apple from '../../../assets/icons/logos_apple-pay.svg';
import { Box } from '@mui/material';

const ApplePayIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'55px',
            height:'58px',

        }}>
            <img src={apple} alt="applepay icon"/>
        </Box>
    )
}

export default ApplePayIcon;