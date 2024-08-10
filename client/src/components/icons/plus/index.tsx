import React from 'react';
import plus from '../../../assets/icons/plus.svg';
import { Box } from '@mui/material';

const Plus = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={plus} alt="plusIcon"/>
        </Box>
    )
}

export default Plus;