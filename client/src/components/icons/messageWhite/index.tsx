import React from 'react';
import message from '../../../assets/icons/messageWhite.svg';
import { Box } from '@mui/material';

const MessageWhiteIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'35px',
            height:'35px',

        }}>
            <img src={message} alt="messageIcon"/>
        </Box>
    )
}

export default MessageWhiteIcon;