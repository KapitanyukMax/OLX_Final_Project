import * as React from 'react';
import { Box, Icon, IconButton, SvgIconProps } from '@mui/material';

interface StyledIconProps {
    icon: React.ElementType<SvgIconProps>;
    type?: 'default' | 'button';
    color?: string;
    hoverColor?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const StyledIcon: React.FC<StyledIconProps> = ({ icon: IconElement, color, hoverColor, type, onClick, disabled }) => {
    color ??= '#000';
    hoverColor ??= color;

    switch (type) {
        case 'button':
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconButton disabled={disabled} onClick={onClick} sx={{
                        color,
                        '&:hover': {
                            color: hoverColor
                        },
                        '&:focus': {
                            outline: 'none'
                        }
                    }}>
                        <IconElement />
                    </IconButton>
                </Box>
            );
        case 'default':
        default:
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon sx={{
                        color,
                        '&:hover': {
                            color: hoverColor
                        }
                    }}>
                        <IconElement />
                    </Icon>
                </Box>
            );
    }
};

export default StyledIcon;
