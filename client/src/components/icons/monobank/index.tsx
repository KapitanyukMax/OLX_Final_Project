import React from 'react';
import card from '../../../assets/icons/arcticons_monobank.svg';
import { Box } from '@mui/material';

const MonobankIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'55px',
            height:'58px',

        }}>
            <img src={card} alt="monobank icon"/>
        </Box>
    )
}

export default MonobankIcon;