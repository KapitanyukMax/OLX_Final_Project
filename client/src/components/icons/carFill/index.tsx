import React from 'react';
import carFill from '../../../assets/icons/car-fill.svg';
import { Box } from '@mui/material';

const CarFillIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={carFill} alt="carFillIcon"/>
        </Box>
    )
}

export default CarFillIcon;