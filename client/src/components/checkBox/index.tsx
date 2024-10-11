import React from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import StyledLabel from '../lable';
import './styles.css';

interface CheckBoxProps {
    label: string;
    sx?: any;
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: () => void;
}

const StyledCheckBox: React.FC<CheckBoxProps> = ({ label, sx, checked, disabled, required, onChange }) => {
    return (
        <StyledEngineProvider injectFirst>
            <Box className='box1'>
                <FormControlLabel
                    disabled={disabled}
                    required={required}
                    sx={sx}
                    control={
                        <Checkbox
                            id='input'
                            checked={checked}
                            onChange={onChange}
                            className='checkBox'
                        />
                    }
                    label={<StyledLabel text={label} type='with-icon' textType='small' />}
                />
            </Box>
        </StyledEngineProvider>
    );
};

export { StyledCheckBox };
