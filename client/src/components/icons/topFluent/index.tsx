import React from 'react';
import top from '../../../assets/icons/fluent-emoji-high-contrast_top-arrow.svg'
import { Box } from '@mui/material';

const TopFluentIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={top} alt="top fluent icon"/>
        </Box>
    )
}

export default TopFluentIcon;