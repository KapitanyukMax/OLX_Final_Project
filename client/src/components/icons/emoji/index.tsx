import React from 'react';
import emoji from '../../../assets/icons/mdi_emoji.svg';
import { Box } from '@mui/material';

const EmojiSmileIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={emoji} alt="emoji icon"/>
        </Box>
    )
}

export default EmojiSmileIcon;