import React from 'react';
import password from '../../../assets/icons/password.svg';
import { Box } from '@mui/material';

const PasswordIcon: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '15px',
                height: '15px',
                cursor: 'pointer'
            }}
        >
            <img src={password} alt="passwordIcon" />
        </Box>
    );
};

export default PasswordIcon;
