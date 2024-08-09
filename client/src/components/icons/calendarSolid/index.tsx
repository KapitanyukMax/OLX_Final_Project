import React from 'react';
import calendarSolid from '../../../assets/icons/calendar-solid.svg';
import { Box } from '@mui/material';

const CalendarSolidIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={calendarSolid} alt="calendarSolidIcon"/>
        </Box>
    )
}

export default CalendarSolidIcon;