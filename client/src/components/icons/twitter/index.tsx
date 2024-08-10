import React from 'react';
import twitter from '../../../assets/icons/twitter-x.svg';
import { Box } from '@mui/material';

const TwitterIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'30px',
            height:'30px',

        }}>
            <img src={twitter} alt="twitterIcon"/>
        </Box>
    )
}

export default TwitterIcon;