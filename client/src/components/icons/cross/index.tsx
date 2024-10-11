import React from 'react';
import cross from '../../../assets/icons/oui_cross.svg';
import { Box } from '@mui/material';

interface CrossStyledIconProps{
    onClick?:()=>void;
}

const CrossStyledIcon:React.FC<CrossStyledIconProps> = ({onClick}) => {
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
            <img src={cross} alt="cross icon"/>
        </Box>
    )
}

export default CrossStyledIcon;