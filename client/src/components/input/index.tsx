import React from 'react';
import { Box, Input, InputLabel, InputAdornment } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface BasicInputProps {
    label: string;
    value: string;
}

const BasicInput: React.FC<BasicInputProps> = ({ label, value }) => {
    return (
        <StyledEngineProvider injectFirst>
            <Box className='box'>
                <InputLabel htmlFor='input' className='label'>{label}</InputLabel>
                <Input id='input' defaultValue={value} className='basic-input' />
            </Box>
        </StyledEngineProvider>
    );
};

interface InputWithIconProps {
    label: string;
    value: string;
    isPassword?: boolean;
    iconStart?: SvgIconComponent;
    iconEnd?: SvgIconComponent;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ label, value, isPassword, iconStart: IconStart, iconEnd: IconEnd }) => {
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
                            <IconStart />
                        </InputAdornment>
                    ) : undefined}
                    endAdornment={IconEnd ? (
                        <InputAdornment position="end">
                            <IconEnd />
                        </InputAdornment>
                    ) : undefined}
                />
            </Box>
        </StyledEngineProvider>
    );
};

export {
    BasicInput,
    InputWithIcon
};
