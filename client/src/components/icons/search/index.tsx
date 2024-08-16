import React from 'react';
import search from '../../../assets/icons/search.svg';
import { Box } from '@mui/material';

const SearchIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'25px',
            height:'25px',

        }}>
            <img src={search} alt="searchIcon"/>
        </Box>
    )
}

export default SearchIcon;