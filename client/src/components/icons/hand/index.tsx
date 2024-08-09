import React from 'react';
import hand from '../../../assets/icons/hand.svg';
import { Box } from '@mui/material';

const HandIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={hand} alt="handIcon"/>
        </Box>
    )
}

export default HandIcon;