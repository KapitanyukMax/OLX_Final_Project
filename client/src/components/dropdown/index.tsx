import React, { useState } from 'react';
import { Box, Select, MenuItem, SelectChangeEvent, Typography, Button, Menu } from '@mui/material';
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
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentValue(event.target.value);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
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
                onOpen={handleOpen}
                onClose={handleClose}
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
                            <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><ArrowDownBlackIcon/></span>
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
        </StyledEngineProvider>
    );
};

const StyledHeaderDropdown: React.FC<StyledDropdownProps> = ({ value, values }) => {
    const [items, setItems] = useState(values);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (value: string) => {
        // link to category page.
        setAnchorEl(null);
    };

    return (
        <StyledEngineProvider injectFirst>
            <div onMouseLeave={handleMouseLeave} style={{ display: 'inline-block' }}>
                <Button
                    aria-controls="hover-select-menu"
                    aria-haspopup="true"
                    onMouseEnter={handleMouseEnter}
                    variant="text"
                    endIcon={<span style={{ transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><ArrowDownWhiteIcon/></span>}
                    sx={{ 
                        height: '27px',
                        justifyContent: 'space-between',
                        color: '#fff',
                        width: '120px',
                    }}
                >
                    <Typography sx={{
                        whiteSpace: 'nowrap',
                        fontFamily: "Nunito",
                        fontSize: "18px",
                        textTransform: 'none',
                    }}>{value}</Typography>
                </Button>
                <Menu
                    id="hover-select-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMouseLeave}
                    MenuListProps={{
                        onMouseLeave: handleMouseLeave,
                    }}
                    PaperProps={{
                        sx: {
                            minWidth: anchorEl?.clientWidth,
                            fontFamily: "Nunito",
                            fontSize: "20px",
                        },
                    }}
                >
                    {items.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                        onClick={() => handleMenuItemClick(item)}
                        sx={{
                            fontFamily: "Nunito",
                            fontSize: "18px",
                        }}
                    >{item}</MenuItem>
                    ))}
                </Menu>
            </div>
        </StyledEngineProvider>
    );
}

export {
    StyledDropdown,
    StyledHeaderDropdown
};
