import React from 'react';
import downloadAS from '../../../assets/icons/Group 78.svg';
import { Box } from '@mui/material';

const DownloadAppStore = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'280',
            height:'68.5px',

        }}>
            <img src={downloadAS} alt="download app store icon"/>
        </Box>
    )
}

export default DownloadAppStore;