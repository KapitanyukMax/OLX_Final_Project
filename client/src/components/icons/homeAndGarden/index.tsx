import React from 'react';
import homeAndGarden from '../../../assets/icons/home-and-garden.svg';
import { Box } from '@mui/material';

const HomeAndGardenIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={homeAndGarden} alt="homeAndGardenIcon"/>
        </Box>
    )
}

export default HomeAndGardenIcon;