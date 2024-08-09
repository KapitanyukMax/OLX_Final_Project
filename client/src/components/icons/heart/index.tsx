import React from 'react';
import heart from '../../../assets/icons/heart.svg';
import { Box } from '@mui/material';

const HeartIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'35px',
            height:'35px',

        }}>
            <img src={heart} alt="heartIcon"/>
        </Box>
    )
}

export default HeartIcon;