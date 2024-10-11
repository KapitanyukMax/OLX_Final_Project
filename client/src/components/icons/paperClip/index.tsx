import React from 'react';
import paperClip from '../../../assets/icons/heroicons_paper-clip-solid.svg';
import { Box } from '@mui/material';

interface PaperClipIconProps {
    onClick?: () => void;
}

const PaperClipIcon:React.FC<PaperClipIconProps> = ({onClick}) => {
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
            <img src={paperClip} alt="paperclip icon"/>
        </Box>
    )
}

export default PaperClipIcon;