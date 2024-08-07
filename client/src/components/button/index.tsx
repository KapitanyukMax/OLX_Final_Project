import * as React from 'react';
import { Box, Button, SvgIconProps, alpha } from '@mui/material';

interface StyledButtonProps {
    text: string;
    type: 'contained' | 'outlined';
    primaryColor?: string;
    secondaryColor?: string;
    hoverColor?: string;
    disabled?: boolean;
    icon?: React.ElementType<SvgIconProps>;
    onClick?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({ text, type, primaryColor, secondaryColor, hoverColor, disabled, icon: Icon, onClick }) => {
    // primaryColor ??= '#fff';
    primaryColor ??= 'var(--dark-blue)';
    secondaryColor ??= 'white';
    hoverColor ??= 'var(--green)';

    const getStyle = () => {
        switch (type) {
            case 'outlined':
                return {
                    color: primaryColor,
                    backgroundColor: alpha('#fff', 0),
                    borderColor: primaryColor,
                    border: 1,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: alpha('#fff', 0),
                        borderColor: hoverColor,
                        color: hoverColor,
                        boxShadow: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                };
            case 'contained':
            default:
                return {
                    color: secondaryColor,
                    backgroundColor: primaryColor,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: hoverColor,
                        boxShadow: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                };
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button sx={getStyle()} startIcon={Icon && <Icon />} onClick={onClick} disabled={disabled}>
                {text}
            </Button>
        </Box>
    );
};

export default StyledButton;
