import React from 'react';
import oIcon from '../../../assets/icons/Component 1.svg';
import { Box } from '@mui/material';

const OComponentIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'55px',
            height:'58px',

        }}>
            <img src={oIcon} alt="o letter icon"/>
        </Box>
    )
}

export default OComponentIcon;