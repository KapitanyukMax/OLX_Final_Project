import React from 'react';
import youtube from '../../../assets/icons/youtube-fill.svg';
import { Box } from '@mui/material';

const YoutubeIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'30px',
            height:'30px',

        }}>
            <img src={youtube} alt="youtubeIcon"/>
        </Box>
    )
}

export default YoutubeIcon;