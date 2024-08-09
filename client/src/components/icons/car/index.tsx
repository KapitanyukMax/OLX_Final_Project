import React from 'react';
import car from '../../../assets/icons/car.svg';
import { Box } from '@mui/material';

const CarIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={car} alt="carIcon"/>
        </Box>
    )
}

export default CarIcon;