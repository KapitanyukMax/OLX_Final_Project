import React from 'react';
import work from '../../../assets/icons/work.svg';
import { Box } from '@mui/material';

const WorkIcon = () => {
    return(
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            width:'58px',
            height:'58px',

        }}>
            <img src={work} alt="workIcon"/>
        </Box>
    )
}

export default WorkIcon;