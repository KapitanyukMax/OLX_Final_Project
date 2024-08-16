import React, { useState } from 'react';
import { Box, Input, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface StyledInputProps {
    value: string;
    widthType: 'small' | 'middle' | 'big';
    label?: string;
    required?: boolean;
    maxLength?: number;
    isPassword?: boolean;
    iconStart?: SvgIconComponent;
    iconEnd?: SvgIconComponent;
    iconStartClick?: () => void;
    iconEndClick?: () => void;
}

const StyledInput: React.FC<StyledInputProps> = ({ label, value, required, widthType, maxLength, isPassword, iconStart: IconStart, iconEnd: IconEnd, iconEndClick, iconStartClick }) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(event.target.value);
    };

    const getInputWidth = () => {
        switch (widthType) {
            case 'small':
                return 'small-input';
            case 'middle':
                return 'middle-input';
            case 'big':
                return 'big-input';
            default:
                return 'middle-input';
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Box className={getInputWidth()}>
                {
                    label && (
                        <InputLabel className='label'>
                            {required ? `${label} *` : label}
                        </InputLabel>
                    )
                }
                <Input
                    id='input'
                    placeholder={currentValue}
                    type={isPassword ? 'password' : 'text'}
                    className='basic-input'
                    onChange={handleChange}
                    required={required}
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
                {maxLength && (
                    <label className='label symbols'>
                        {`${currentValue.length}/${maxLength} символів`}
                    </label>
                )}
            </Box>
        </StyledEngineProvider >
    );
};

export {
    StyledInput
};
