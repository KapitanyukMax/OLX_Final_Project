import * as React from 'react';
import { Box, Button, SvgIconProps, alpha } from '@mui/material';

interface StyledButtonProps {
    text: string;
    type: 'contained' | 'outlined';
    primaryColor?: string;
    secondaryColor?: string;
    hoverColor?: string;
    icon?: React.ElementType<SvgIconProps>;
    onClick?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({ text, type, primaryColor, secondaryColor, hoverColor, icon: Icon, onClick }) => {
    primaryColor ??= '#fff';
    secondaryColor ??= '#000';
    hoverColor ??= '#ddd';

    const getStyle = () => {
        switch (type) {
            case 'contained':
                return {
                    color: secondaryColor,
                    backgroundColor: primaryColor,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: hoverColor,
                        boxShadow: 'none'
                    }
                };
            case 'outlined':
                return {
                    color: primaryColor,
                    backgroundColor: alpha('#fff', 0),
                    borderColor: primaryColor,
                    borderWidth: 1,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: alpha('#fff', 0),
                        borderColor: hoverColor,
                        boxShadow: 'none'
                    }
                };
            default:
                return {
                    color: secondaryColor,
                    backgroundColor: primaryColor,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: hoverColor,
                        boxShadow: 'none'
                    }
                };
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button sx={getStyle()} variant={type} startIcon={Icon && <Icon />} onClick={onClick}>
                {text}
            </Button>
        </Box>
    );
};

export default StyledButton;
