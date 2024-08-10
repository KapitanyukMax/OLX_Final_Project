import React from 'react';
import realEstateAgent from '../../../assets/icons/real-estate-agent.svg';
import { Box } from '@mui/material';

const RealEstateAgentIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={realEstateAgent} alt="realEstateAgentIcon"/>
        </Box>
    )
}

export default RealEstateAgentIcon;