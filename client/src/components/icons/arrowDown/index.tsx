import React from 'react';
import arrowBlack from '../../../assets/icons/arrowBlack.svg';
import arrowWhite from '../../../assets/icons/arrowWhite.svg';
import { Box } from '@mui/material';


const ArrowDownBlackIcon = () => {
    return (
        <Box>
            <img src={arrowBlack} alt="arrowDownBlack"/>
        </Box>
    )
}

const ArrowDownWhiteIcon = () => {
    return (
        <Box>
            <img src={arrowWhite} alt="arrowDownWhite"/>
        </Box>
    )
}

export { ArrowDownBlackIcon, ArrowDownWhiteIcon };