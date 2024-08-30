import React from 'react';
import message from '../../../assets/icons/message.svg';
import { Box } from '@mui/material';

const MessageIcon = () => {
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

export default MessageIcon;