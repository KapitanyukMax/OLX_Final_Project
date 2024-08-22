import React from 'react';
import time from '../../../assets/icons/lets-icons_time-fill.svg';
import { Box } from '@mui/material';

const TimeFillIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={time} alt="time icon"/>
        </Box>
    )
}

export default TimeFillIcon;