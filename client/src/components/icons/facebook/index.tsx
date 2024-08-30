import React from 'react';
import facebook from '../../../assets/icons/jam_facebook.svg';
import { Box } from '@mui/material';

const FacebookIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'40px',
            height:'40px',

        }}>
            <img src={facebook} alt="facebookIcon"/>
        </Box>
    )
}

export default FacebookIcon;