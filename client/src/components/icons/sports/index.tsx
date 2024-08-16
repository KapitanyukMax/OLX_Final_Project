import React from 'react';
import sports from '../../../assets/icons/sports.svg';
import { Box } from '@mui/material';

const SportsIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={sports} alt="sportsIcon"/>
        </Box>
    )
}

export default SportsIcon;