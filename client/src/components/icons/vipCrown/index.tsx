import React from 'react';
import crown from '../../../assets/icons/mingcute_vip-2-fill.svg'
import { Box } from '@mui/material';

const VipCrownIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={crown} alt="vip icon"/>
        </Box>
    )
}

export default VipCrownIcon;