import React from 'react';
import photo from '../../../assets/icons/ic_baseline-photo.svg';
import { Box } from '@mui/material';

interface PhotoBaselineIconProps{
    onClick?:()=>void;
}

const PhotoBaselineIcon:React.FC<PhotoBaselineIconProps> = ({onClick}) => {
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
            <img src={photo} alt="baseline photo icon"/>
        </Box>
    )
}

export default PhotoBaselineIcon;