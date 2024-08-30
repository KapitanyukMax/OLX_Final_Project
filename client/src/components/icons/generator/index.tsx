import React from 'react';
import generator from '../../../assets/icons/generator.svg';
import { Box } from '@mui/material';

const GeneratorIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={generator} alt="generatorIcon"/>
        </Box>
    )
}

export default GeneratorIcon;