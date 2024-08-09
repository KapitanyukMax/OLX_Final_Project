import React from 'react';
import furniture from '../../../assets/icons/furniture.svg';
import { Box } from '@mui/material';

const FurnitureIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={furniture} alt="furnitureIcon"/>
        </Box>
    )
}

export default FurnitureIcon;