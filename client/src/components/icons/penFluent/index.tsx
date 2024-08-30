import React from 'react';
import pen from '../../../assets/icons/fluent_pen-28-filled.svg';
import { Box } from '@mui/material';

const PenFluentIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'15px',
            height:'15px',

        }}>
            <img src={pen} alt="filter icon"/>
        </Box>
    )
}

export default PenFluentIcon;