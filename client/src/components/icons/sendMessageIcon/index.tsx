import React from 'react';
import send from '../../../assets/icons/bxs_send.svg'
import { Box } from '@mui/material';

const SendMessageIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={send} alt="send message icon"/>
        </Box>
    )
}

export default SendMessageIcon;