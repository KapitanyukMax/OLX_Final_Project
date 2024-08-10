import React from 'react';
import transportSparePart from '../../../assets/icons/transport-spare-part.svg';
import { Box } from '@mui/material';

const TransportSparePartIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={transportSparePart} alt="transportSparePartIcon"/>
        </Box>
    )
}

export default TransportSparePartIcon;