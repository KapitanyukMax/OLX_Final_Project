import React, { useState } from 'react';
import { Box, TextareaAutosize } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface TextAreaProps {
    label: string;
    value: string;
    minRows?: number;
    maxRows?: number;
    maxLength?: number;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const StyledTextArea: React.FC<TextAreaProps> = ({ label, value, minRows, maxRows, maxLength, required, onChange }) => {
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
                    maxLength={maxLength}
                    minRows={minRows}
                    maxRows={maxRows}
                    required={required}
                    placeholder={currentValue}
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