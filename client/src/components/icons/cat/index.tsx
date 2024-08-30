import React from 'react';
import cat from '../../../assets/icons/cat.svg';
import { Box } from '@mui/material';

const CatIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={cat} alt="catIcon"/>
        </Box>
    )
}

export default CatIcon;