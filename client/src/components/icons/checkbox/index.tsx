import React from 'react';
import checkbox from '../../../assets/icons/Checkbox.svg';
import { Box } from '@mui/material';

const CheckBoxIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'20px',
            height:'20px',

        }}>
            <img src={checkbox} alt="checkboxIcon"/>
        </Box>
    )
}

export default CheckBoxIcon;