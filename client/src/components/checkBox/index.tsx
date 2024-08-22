import React from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css';

interface CheckBoxProps {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: () => void;
}

const StyledCheckBox: React.FC<CheckBoxProps> = ({ label, checked, disabled, required, onChange }) => {
    return (
        <StyledEngineProvider injectFirst>
            <Box className='box1'>
                <FormControlLabel
                    disabled={disabled}
                    required={required}
                    control={
                        <Checkbox
                            id='input'
                            checked={checked}
                            onChange={onChange}
                            className='checkBox'
                        />
                    }
                    label={label}
                />
            </Box>
        </StyledEngineProvider>
    );
};

export {
    StyledCheckBox
};