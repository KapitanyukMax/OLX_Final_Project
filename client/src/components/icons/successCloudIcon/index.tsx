import React from 'react';
import cloud from '../../../assets/icons/material-symbols_cloud-done-outline.svg';
import { Box } from '@mui/material';

const CloudDoneIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'180px',
            height:'180px',

        }}>
            <img src={cloud} alt="cloud done icon"/>
        </Box>
    )
}

export default CloudDoneIcon;