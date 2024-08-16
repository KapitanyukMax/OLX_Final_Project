import React from 'react';
import phone from '../../../assets/icons/phone.svg';
import { Box } from '@mui/material';

const PhoneIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={phone} alt="phoneIcon"/>
        </Box>
    )
}

export default PhoneIcon;