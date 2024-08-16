import React from 'react';
import microphone from '../../../assets/icons/microphone.svg';
import { Box } from '@mui/material';

const MicrophoneIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={microphone} alt="microphoneIcon"/>
        </Box>
    )
}

export default MicrophoneIcon;