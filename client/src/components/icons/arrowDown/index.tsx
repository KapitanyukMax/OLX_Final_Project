import React from 'react';
import arrow from '../../../assets/icons/arrow.svg';
import { Box } from '@mui/material';

interface ArrowDownIconInterface {
    color: "white" | "black"
}

const ArrowDownIcon: React.FC<ArrowDownIconInterface> = ( {color} ) => {
    return (
        <Box
        sx={{
            color: {color}
        }}>
            <img src={arrow} alt="arrowDown"/>
        </Box>
    )
}

export default ArrowDownIcon;