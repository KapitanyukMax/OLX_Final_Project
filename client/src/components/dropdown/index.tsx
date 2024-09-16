import React, { useState } from "react";
import {
    Box,
    MenuItem,
    Typography,
    Button,
    Menu,
    Paper,
    TextField,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { ArrowDownBlackIcon, ArrowDownWhiteIcon } from "../icons/arrowDown";
import "./styles.css";

interface StyledDropdownProps {
    placeholder?: string;
    values: string[];
    selectOnly?: boolean;
    type?: "small" | "middle" | "large";
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledDropdown: React.FC<StyledDropdownProps> = ({
    placeholder,
    values,
    selectOnly,
    type,
    onChange,
    onInput,
}) => {
    const [currentValue, setCurrentValue] = useState('');
    const [filteredItems, setFilteredItems] = useState(values);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setCurrentValue(inputValue);
        setFilteredItems(
            values.filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
        if (onChange) {
            onChange(event);
        }
    };

    const handleSelect = (item: string) => {
        setCurrentValue(item);
        setIsOpen(false);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsOpen(false), 150);
    };

    const getStyle = () => {
        switch (type) {
            case "small":
                return {
                    width: "117px",
                };
            case "middle":
                return {
                    width: "259px",
                };
            case "large":
                return {
                    width: "592px",
                };
            default:
                return {};
        }
    };

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ position: "relative", ...getStyle() }}>
                <TextField
                    value={currentValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    variant="outlined"
                    onInput={onInput}
                    fullWidth
                    InputProps={{
                        placeholder: placeholder,
                        readOnly: selectOnly,
                        endAdornment: (
                            <span
                                style={{
                                    transform: isOpen
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                                    transition: "transform 0.3s",
                                }}
                            >
                                <ArrowDownBlackIcon />
                            </span>
                        ),
                    }}
                    sx={{
                        ...getStyle(),
                        textAlign: "left",
                        color: "#737070",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        border: "1px solid #000",
                        "& .MuiOutlinedInput-input": {
                            padding: "10px",
                            fontFamily: "Nunito",
                            fontSize: "18px",
                        },
                    }}
                />
                {isOpen && (
                    <Paper
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            maxHeight: "200px",
                            overflowY: "auto",
                            border: "1px solid #ddd",
                        }}
                    >
                        {filteredItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleSelect(item)}
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Paper>
                )}
            </Box>
        </StyledEngineProvider>
    );
};

const StyledHeaderDropdown: React.FC<StyledDropdownProps> = ({
    placeholder,
    values,
}) => {
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
            <div
                onMouseLeave={handleMouseLeave}
                style={{ display: "inline-block" }}
            >
                <Button
                    aria-controls="hover-select-menu"
                    aria-haspopup="true"
                    onMouseEnter={handleMouseEnter}
                    variant="text"
                    endIcon={
                        <span
                            style={{
                                transform: anchorEl
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s",
                            }}
                        >
                            <ArrowDownWhiteIcon />
                        </span>
                    }
                    sx={{
                        height: "27px",
                        justifyContent: "space-between",
                        color: "#fff",
                        width: "120px",
                    }}
                >
                    <Typography
                        sx={{
                            whiteSpace: "nowrap",
                            fontFamily: "Nunito",
                            fontSize: "18px",
                            textTransform: "none",
                        }}
                    >
                        {placeholder}
                    </Typography>
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
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </StyledEngineProvider>
    );
};

export { StyledDropdown, StyledHeaderDropdown };
