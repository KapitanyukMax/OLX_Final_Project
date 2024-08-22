import React from 'react';
import menu from '../../../assets/icons/solar_menu-dots-bold.svg';
import { Box } from '@mui/material';

const MenuDotsIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={menu} alt="menu dots icon"/>
        </Box>
    )
}

export default MenuDotsIcon;