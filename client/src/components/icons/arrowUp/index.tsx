import React from 'react';
import arrowUp from '../../../assets/icons/ph_arrow-up.svg';
import { Box } from '@mui/material';

const ArrowUpIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={arrowUp} alt="arrowUpIcon"/>
        </Box>
    )
}

export default ArrowUpIcon;