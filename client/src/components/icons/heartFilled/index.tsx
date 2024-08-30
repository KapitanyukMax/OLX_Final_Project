import React from 'react';
import heartFilled from '../../../assets/icons/heart-filled.svg';
import { Box } from '@mui/material';

const HeartFilledIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={heartFilled} alt="heartFilledIcon"/>
        </Box>
    )
}

export default HeartFilledIcon;