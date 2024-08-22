import React from 'react';
import iInCircle from '../../../assets/icons/mdi_alpha-i-circle-outline.svg'
import { Box } from '@mui/material';

const IInCircleIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={iInCircle} alt="iIn circle icon"/>
        </Box>
    )
}

export default IInCircleIcon;