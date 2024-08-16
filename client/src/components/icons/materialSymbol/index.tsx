import React from 'react';
import materialSym from '../../../assets/icons/material-symbols_cloud-done-outline.svg';
import { Box } from '@mui/material';

const MaterialSymbolIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'180px',
            height:'180px',
            margin: '20px',
        }}>
            <img src={materialSym} alt="materialSymbolIcon"/>
        </Box>
    )
}

export default MaterialSymbolIcon;