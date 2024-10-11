import React, { useState } from 'react';
import { Box, TextareaAutosize } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface TextAreaProps {
    label: string;
    value: string;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const StyledTextArea: React.FC<TextAreaProps> = ({ label, value, placeholder, minRows, maxRows, maxLength, required, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <StyledEngineProvider injectFirst>
            <Box className='box'>
                <label className='label'>
                    {required ? `${label} *` : label}
                </label>
                <TextareaAutosize
                    value={currentValue}
                    maxLength={maxLength}
                    minRows={minRows}
                    maxRows={maxRows}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className='textArea'
                />
                {maxLength && (
                    <label className='label symbols'>
                        {`${currentValue.length}/${maxLength} символів`}
                    </label>
                )}
            </Box>
        </StyledEngineProvider>
    );
};

export {
    StyledTextArea
};