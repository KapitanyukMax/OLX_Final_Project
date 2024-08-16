import React from 'react';
import arrow from '../../../assets/icons/arrow.svg';
import { Box } from '@mui/material';

const ArrowDownIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={arrow} alt="arrowDown"/>
        </Box>
    )
}

export default ArrowDownIcon;