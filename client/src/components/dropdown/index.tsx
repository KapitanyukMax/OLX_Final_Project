import React, { useState } from 'react';
import { Box, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import ArrowDownIcon from '../icons/arrowDown';
import "./styles.css";

interface StyledDropdownProps {
    value: string;
    values: string[],
    widthType: 'small' | 'middle' | 'big';
}

const StyledDropdown: React.FC<StyledDropdownProps> = ({ value, values, widthType }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [items, setItems] = useState(values);

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentValue(event.target.value);
      };

    const getDropdownWidth = () => {
        switch (widthType) {
            case 'small':
                return 'small-dropdown';
            case 'middle':
                return 'middle-dropdown';
            case 'big':
                return 'big-dropdown';
            default:
                return 'middle-dropdown';
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Select
                defaultValue={value}
                value={currentValue}
                className={getDropdownWidth()}
                onChange={handleChange}
                IconComponent={() => null}
                renderValue={(value) => (
                    <Box sx={{ 
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {value}
                        </Typography>
                        <ArrowDownIcon color='black'/>
                    </Box>
                    )}
            >
                {items.map((item: string, index: number) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </StyledEngineProvider >
    );
};

export {
    StyledDropdown
};
