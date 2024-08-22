import React from 'react';
import addPhoto from '../../../assets/icons/material-symbols_add-a-photo.svg'
import { Box } from '@mui/material';

const AddPhotoIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={addPhoto} alt="add photo icon"/>
        </Box>
    )
}

export default AddPhotoIcon;