import React from 'react';
import emoji from '../../../assets/icons/mdi_emoji.svg';
import { Box } from '@mui/material';

interface EmojiSmileIconProps{
    onClick?:()=>void;
}

const EmojiSmileIcon:React.FC<EmojiSmileIconProps>= ({onClick}) => {
    return(
        <Box
        onClick={onClick}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',
            cursor: 'pointer'
        }}>
            <img src={emoji} alt="emoji icon"/>
        </Box>
    )
}

export default EmojiSmileIcon;