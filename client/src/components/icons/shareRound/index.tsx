import React from 'react';
import share from '../../../assets/icons/ic_round-share.svg'
import { Box } from '@mui/material';

const ShareRoundIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={share} alt="share icon"/>
        </Box>
    )
}

export default ShareRoundIcon;