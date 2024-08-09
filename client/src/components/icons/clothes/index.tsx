import React from 'react';
import clothes from '../../../assets/icons/clothes.svg';
import { Box } from '@mui/material';

const ClothesIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={clothes} alt="clothesIcon"/>
        </Box>
    )
}

export default ClothesIcon;