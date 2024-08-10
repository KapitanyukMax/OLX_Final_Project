import React from 'react';
import childrenToy from '../../../assets/icons/children-toy.svg';
import { Box } from '@mui/material';

const ChildrenToyIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={childrenToy} alt="childrenToyIcon"/>
        </Box>
    )
}

export default ChildrenToyIcon;