import * as React from 'react';
import { Box, Button, SvgIconProps, alpha } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

interface StyledButtonProps {
    text: string;
    type: 'contained' | 'outlined';
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
    hoverBackColor?: string;
    hoverColor?: string;
    disabled?: boolean;
    icon?: React.ElementType<SvgIconProps>;
    onClick?: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({ text, type, className, primaryColor, secondaryColor = 'white', hoverBackColor = 'var(--green)', hoverColor = 'black', disabled, icon: Icon, onClick }) => {
    primaryColor ??= type == 'outlined' ? 'black' : 'var(--blue)';

    const getStyle = () => {
        switch (type) {
            case 'outlined':
                return {
                    color: primaryColor,
                    backgroundColor: alpha('#fff', 0),
                    borderColor: primaryColor,
                    border: 1
                };
            case 'contained':
            default:
                return {
                    color: secondaryColor,
                    backgroundColor: primaryColor,
                    boxShadow: 'none'
                };
        }
    };

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button sx={{
                    ...getStyle(),
                    height: '57px',
                    borderRadius: '8px',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '14pt',
                    fontWeight: 'normal',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: hoverBackColor,
                        color: hoverColor,
                        boxShadow: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    }
                }} startIcon={Icon && <Icon />} onClick={onClick} disabled={disabled} className={className}>
                    {text}
                </Button>
            </Box>
        </StyledEngineProvider>
    );
};

export default StyledButton;
