import React from 'react';
import instagram from '../../../assets/icons/instagram.svg';
import { Box } from '@mui/material';

const InstagramIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'30px',
            height:'30px',
            }}>
            <img src={instagram} alt="instagramIcon"/>
        </Box>
    )
}

export default InstagramIcon;