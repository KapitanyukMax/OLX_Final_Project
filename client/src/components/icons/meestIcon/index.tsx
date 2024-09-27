import React from 'react';
import mist from '../../../assets/icons/Meest_Corporation_logo 1.svg'
import { Box } from '@mui/material';

const MeestCorpIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'32px',
            height:'32px',

        }}>
            <img src={mist} alt="mist corporation icon"/>
        </Box>
    )
}

export default MeestCorpIcon;