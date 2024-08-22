import React from 'react';
import mastercard from '../../../assets/icons/logos_mastercard.svg';
import { Box } from '@mui/material';

const MastercardIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'55px',
            height:'58px',

        }}>
            <img src={mastercard} alt="mastercard icon"/>
        </Box>
    )
}

export default MastercardIcon;