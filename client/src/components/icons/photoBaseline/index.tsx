import React from 'react';
import photo from '../../../assets/icons/ic_baseline-photo.svg';
import { Box } from '@mui/material';

const PhotoBaselineIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={photo} alt="baseline photo icon"/>
        </Box>
    )
}

export default PhotoBaselineIcon;