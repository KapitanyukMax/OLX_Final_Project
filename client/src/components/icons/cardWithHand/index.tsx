import React from 'react';
import card from '../../../assets/icons/Group.svg';
import { Box } from '@mui/material';

const CardWithHandIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'55px',
            height:'58px',

        }}>
            <img src={card} alt="card with hand icon"/>
        </Box>
    )
}

export default CardWithHandIcon;