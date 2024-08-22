import React from 'react';
import logo from '../../../assets/icons/лого 1.svg';
import { Box } from '@mui/material';

const DDXLogoIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'145px',
            height:'45px',

        }}>
            <img src={logo} alt="ddx logo icon"/>
        </Box>
    )
}

export default DDXLogoIcon;