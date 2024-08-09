import React from 'react';
import location from '../../../assets/icons/location.svg';
import { Box } from '@mui/material';

const LocationIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={location} alt="locationIcon"/>
        </Box>
    )
}

export default LocationIcon;