import React from 'react';
import cross from '../../../assets/icons/oui_cross.svg';
import { Box } from '@mui/material';

const CrossStyledIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={cross} alt="cross icon"/>
        </Box>
    )
}

export default CrossStyledIcon;