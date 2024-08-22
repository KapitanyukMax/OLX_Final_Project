import React, { useState } from 'react';
import { Box, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { ArrowDownBlackIcon, ArrowDownWhiteIcon } from '../icons/arrowDown';
import "./styles.css";

interface StyledDropdownProps {
    value: string;
    values: string[],
    type?: 'small' | 'middle' | 'large';
}

const StyledDropdown: React.FC<StyledDropdownProps> = ({ value, values, type }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [items, setItems] = useState(values);

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentValue(event.target.value);
    };

    const getStyle = () => {
        switch (type) {
            case 'small':
                return {
                    width: '117px',
                    height: '48px',
                };
            case 'middle':
                return {
                    width: '259px',
                    height: '48px',
                };
            case 'large':
                return {
                    width: '592px',
                    height: '48px',
                };
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Select
                defaultValue={value}
                value={currentValue}
                onChange={handleChange}
                IconComponent={() => null}
                renderValue={(value) => (
                    <Box sx={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography sx={{ 
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: "Nunito",
                            fontSize: "18px",
                        }}>
                            {value}</Typography>
                        <ArrowDownBlackIcon/>
                    </Box>
                    )}
                sx={{
                    ...getStyle(),
                    textAlign: 'left',
                    color: '#737070',
                    backgroundColor: "#fff",
                    borderRadius: '5px',
                    border: '1px solid #000',
                }}
            >
                {items.map((item: string, index: number) => (
                    <MenuItem
                        key={index}
                        value={item}
                        sx={{
                            fontFamily: "Nunito",
                            fontSize: "18px",
                        }}
                    >{item}</MenuItem>
                ))}
            </Select>
        </StyledEngineProvider >
    );
};

const StyledHeaderDropdown: React.FC<StyledDropdownProps> = ({ value, values }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [items, setItems] = useState(values);

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentValue(event.target.value);
    };

    return (
        <StyledEngineProvider injectFirst>
            <Select
                defaultValue={value}
                value={currentValue}
                onChange={handleChange}
                IconComponent={() => null}
                renderValue={(value) => (
                    <Box sx={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography sx={{ 
                            fontFamily: "Nunito",
                            fontSize: "20px",
                        }}>
                            {value}</Typography>
                        <ArrowDownWhiteIcon/>
                    </Box>
                    )}
                sx={{
                    textAlign: 'left',
                    color: '#fff',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    boxShadow: "none",
                    width: "120px",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
            >
                {items.map((item: string, index: number) => (
                    <MenuItem
                        key={index}
                        value={item}
                        sx={{
                            fontFamily: "Nunito",
                            fontSize: "18px",
                        }}
                    >{item}</MenuItem>
                ))}
            </Select>
        </StyledEngineProvider >
    );
}

export {
    StyledDropdown,
    StyledHeaderDropdown
};
