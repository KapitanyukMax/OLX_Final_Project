import React from 'react';
import paperClip from '../../../assets/icons/heroicons_paper-clip-solid.svg';
import { Box } from '@mui/material';

const PaperClipIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={paperClip} alt="paperclip icon"/>
        </Box>
    )
}

export default PaperClipIcon;