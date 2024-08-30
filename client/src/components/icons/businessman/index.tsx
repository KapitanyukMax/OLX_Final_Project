import React from 'react';
import businessman from '../../../assets/icons/businessman.svg';
import { Box } from '@mui/material';

const BusinessManIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={businessman} alt="businessManIcon"/>
        </Box>
    )
}

export default BusinessManIcon;