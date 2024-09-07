import * as React from 'react';
import { Box, Button, SvgIconProps, Typography, alpha } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { SxProps } from '@mui/material';

interface StyledButtonProps {
    text: string;
    type: 'contained' | 'outlined' | 'category';
    sx?: SxProps;
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
    hoverBackColor?: string;
    hoverColor?: string;
    disabled?: boolean;
    icon?: React.ElementType<SvgIconProps>;
    onClick?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({ text, type, sx, className, primaryColor, secondaryColor = 'white', hoverBackColor = 'var(--green)', hoverColor = 'black', disabled, icon: Icon, onClick }) => {
    primaryColor ??= type == 'outlined'
        ? 'black'
        : type == 'category'
            ? 'white'
            : 'var(--blue)';

    sx ??= {};

    if (type == 'category') {
        secondaryColor = '#049CE4';
        hoverBackColor = '#ddd';
        hoverColor = 'var(--green)';
    }

    const getStyle = () => {
        switch (type) {
            case 'outlined':
                return {
                    height: '57px',
                    color: primaryColor,
                    backgroundColor: alpha('#fff', 0),
                    borderColor: primaryColor,
                    borderRadius: '8px',
                    border: 1,
                    '&:hover': {
                        backgroundColor: hoverBackColor,
                        color: hoverColor,
                        boxShadow: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                };
            case 'category':
                return {
                    height: '74px',
                    color: '#000',
                    backgroundColor: primaryColor,
                    borderColor: secondaryColor,
                    border: 1,
                    borderRadius: 0,
                    '&:hover': {
                        borderColor: hoverColor,
                        color: hoverColor,
                        backgroundColor: primaryColor,
                        boxShadow: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                };
            case 'contained':
            default:
                return {
                    height: '57px',
                    color: secondaryColor,
                    backgroundColor: primaryColor,
                    borderRadius: '8px',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: hoverBackColor,
                        color: hoverColor,
                        boxShadow: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                };
        }
    };

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{  display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button sx={{ 
                    ...getStyle(),
                    boxShadow: 'none',
                    padding: 0,
                    ...sx
                }} onClick={onClick} disabled={disabled}
                    className={type === 'category' ? 'category-button' : className}>
                    {Icon &&
                        <Box className='button-icon'>
                            <Icon />
                        </Box>}
                    <Typography className='button-text'>{text}</Typography>
                </Button>
            </Box>
        </StyledEngineProvider>
    );
};

export default StyledButton;
