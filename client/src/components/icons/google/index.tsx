import React from 'react';
import google from '../../../assets/icons/flat-color-icons_google.svg';
import { Box } from '@mui/material';

const GoogleIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'40px',
            height:'40px',

        }}>
            <img src={google} alt="googleIcon"/>
        </Box>
    )
}

export default GoogleIcon;