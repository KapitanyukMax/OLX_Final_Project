import React, { useEffect, useState } from 'react';
import { Box, Input, InputLabel, InputAdornment, IconButton, SvgIconProps } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface StyledInputProps {
    value: string;
    placeholder?: string;
    widthType?: 'small' | 'middle' | 'big' | 'large';
    width?: string;
    label?: string;
    sx?: any;
    required?: boolean;
    maxLength?: number;
    type?: 'password' | 'text';
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    iconStart?: React.ElementType;
    iconEnd?: React.ElementType;
    iconStartClick?: () => void;
    iconEndClick?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const StyledInput: React.FC<StyledInputProps> = ({
    label,
    value,
    placeholder,
    sx,
    required,
    widthType,
    width,
    maxLength,
    iconStart: IconStart,
    iconEnd: IconEnd,
    disabled,
    iconEndClick,
    iconStartClick,
    type = 'text', // За замовчуванням 'text'
    onChange,
    onKeyDown
}) => {
    const getInputWidth = () => {
        switch (widthType) {
            case 'small':
                return 'small-input';
            case 'middle':
                return 'middle-input';
            case 'big':
                return 'big-input';
            case 'large':
                return 'large-input';
            default:
                return 'middle-input';
        }
    }

    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <StyledEngineProvider injectFirst>
            <Box className={widthType ? getInputWidth() : 'middle-input'}
                {
                ...(width ? { style: { width } } : {})
                }
            >
                {
                    label && (
                        <InputLabel className='label'>
                            {required ? `${label} *` : label}
                        </InputLabel>
                    )
                }
                <Input
                    id='input'
                    placeholder={placeholder}
                    value={inputValue}
                    type={type}
                    sx={sx}
                    disabled={disabled}
                    className='basic-input'
                    onChange={onChange} // Використовуй onChange прямо
                    required={required}
                    onKeyDown={onKeyDown}
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
                        {`${value.length}/${maxLength} символів`}
                    </label>
                )}
            </Box>
        </StyledEngineProvider >
    );
};

export { StyledInput };
