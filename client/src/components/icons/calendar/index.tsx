import React from 'react';
import calendar from '../../../assets/icons/calendar.svg';
import { Box } from '@mui/material';

const CalendarIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={calendar} alt="calendarIcon"/>
        </Box>
    )
}

export default CalendarIcon;