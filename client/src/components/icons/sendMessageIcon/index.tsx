import React from 'react';
import send from '../../../assets/icons/bxs_send.svg'
import { Box } from '@mui/material';

interface SendMessageIconProps {
    onClick?: () => void;
}

const SendMessageIcon: React.FC<SendMessageIconProps> = ({onClick}) => {
    return(
        <Box
        onClick={onClick}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',
            cursor:'pointer'
        }}>
            <img src={send} alt="send message icon"/>
        </Box>
    )
}

export default SendMessageIcon;