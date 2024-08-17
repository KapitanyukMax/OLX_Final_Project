import * as React from 'react';
import { useState } from 'react';
import { Box, IconButton, SvgIconProps } from '@mui/material';

interface StyledIconProps {
    icon: React.ElementType<SvgIconProps>;
    checkedIcon?: React.ElementType<SvgIconProps>;
    onClick?: () => void;
    disabled?: boolean;
}

const StyledIconButton: React.FC<StyledIconProps> = ({ icon: Icon, checkedIcon: CheckedIcon, onClick, disabled }) => {
    CheckedIcon ??= Icon;
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0 }}>
            <IconButton disabled={disabled} onClick={() => {
                setIsChecked(!isChecked);
                onClick?.();
            }} sx={{
                margin: 0,
                padding: 0,
                '&:focus': {
                    outline: 'none'
                }
            }}>
                {isChecked
                    ? <CheckedIcon />
                    : <Icon />}
            </IconButton>
        </Box>
    );
};

export default StyledIconButton;
