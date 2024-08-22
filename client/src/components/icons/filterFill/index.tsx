import React from 'react';
import filter from '../../../assets/icons/mage_filter-fill.svg';
import { Box } from '@mui/material';

const FilterFillIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={filter} alt="filter icon"/>
        </Box>
    )
}

export default FilterFillIcon;