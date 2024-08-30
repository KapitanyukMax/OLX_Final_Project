import React from 'react';
import area from '../../../assets/icons/area.svg';
import { Box } from '@mui/material';

const AreaIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={area} alt="areaIcon"/>
        </Box>
    )
}

export default AreaIcon;