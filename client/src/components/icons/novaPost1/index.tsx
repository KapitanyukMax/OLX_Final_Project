import React from 'react';
import nova from '../../../assets/icons/Nova_Poshta_2014_logo 1.svg'
import { Box } from '@mui/material';

const NovaPostIcon1 = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'32px',
            height:'32px',

        }}>
            <img src={nova} alt="nova post icon"/>
        </Box>
    )
}

export default NovaPostIcon1;