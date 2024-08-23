import React from 'react';
import privateIcon from '../../../assets/icons/arcticons_privat24.svg';
import { Box } from '@mui/material';

const Privat24Icon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'55px',
            height:'58px',

        }}>
            <img src={privateIcon} alt="private 24 icon"/>
        </Box>
    )
}

export default Privat24Icon;