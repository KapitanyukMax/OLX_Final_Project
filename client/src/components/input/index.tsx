import React from 'react';
import { Box, Input, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface StyledInputProps {
    label: string;
    value: string;
    isPassword?: boolean;
    iconStart?: SvgIconComponent;
    iconEnd?: SvgIconComponent;
    iconStartClick?: () => void;
    iconEndClick?: () => void;
}

const StyledInput: React.FC<StyledInputProps> = ({ label, value, isPassword, iconStart: IconStart, iconEnd: IconEnd, iconEndClick, iconStartClick }) => {
    return (
        <StyledEngineProvider injectFirst>
            <Box className='box'>
                <InputLabel htmlFor='input' className='label'>{label}</InputLabel>
                <Input
                    id='input'
                    defaultValue={value}
                    type={isPassword ? 'password' : 'text'}
                    className='basic-input'
                    startAdornment={IconStart ? (
                        <InputAdornment position="start">
                            {iconStartClick ? (
                                <IconButton onClick={iconStartClick}>
                                    <IconStart />
                                </IconButton>
                            ) : (
                                <IconStart />
                            )}
                        </InputAdornment>
                    ) : undefined}
                    endAdornment={IconEnd ? (
                        <InputAdornment position="end">
                            {iconEndClick ? (
                                <IconButton onClick={iconEndClick}>
                                    <IconEnd />
                                </IconButton>
                            ) : (
                                <IconEnd />
                            )}
                        </InputAdornment>
                    ) : undefined}
                />
            </Box>
        </StyledEngineProvider>
    );
};

export {
    StyledInput
};
