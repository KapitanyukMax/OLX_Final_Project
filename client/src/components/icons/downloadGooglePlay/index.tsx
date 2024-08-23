import React from 'react';
import downloadGP from '../../../assets/icons/Group 79.svg';
import { Box } from '@mui/material';

const DownloadGooglePlay = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'280',
            height:'68.5px',

        }}>
            <img src={downloadGP} alt="download google play icon"/>
        </Box>
    )
}

export default DownloadGooglePlay;