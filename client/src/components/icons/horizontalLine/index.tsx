import React from 'react';
import horLine from '../../../assets/icons/Vector 2.svg'
import { Box } from '@mui/material';

const HorizontalLineIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'90px',
            height:'0px',

        }}>
            <img src={horLine} alt="horizontal line icon"/>
        </Box>
    )
}

export default HorizontalLineIcon;