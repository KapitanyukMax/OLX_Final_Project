import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import ImageComponent from "../image";
import StyledLabel from "../lable";
import LocationIcon from "../icons/location";
import CalendarIcon from "../icons/calendarSolid";
import HeartIcon from "../icons/heart";
import "./styles.css";
import StyledIconButton from "../iconButton";

interface StyledAdvertProps {
    title: string;
    location: string;
    date: string;
    image: string;
    isVIP?: boolean;
    isTOP?: boolean;
    onClick: () => void;
    onHeartClick?: () => void;
    price: number;
};

const StyledAdvert: React.FC<StyledAdvertProps> = ({ title, location, date, image, isVIP, isTOP, price, onClick, onHeartClick }) => {
    return (
        <StyledEngineProvider injectFirst>
            <Box className='advert' onClick={onClick} style={{ cursor: 'pointer' }}>
                <Box className='imageContainer'>
                    <ImageComponent src={image} alt={title} />
                    {
                        isVIP && isTOP &&
                        <Box className='vip-top'>
                            <Box>
                                <StyledLabel text={isVIP ? "VIP" : ""} textType="small" type="status" textColor="white" backgroundColor="#61d85a" />
                            </Box>
                            <Box>
                                <StyledLabel text={isTOP ? "TOP" : ""} textType="small" type="status" textColor="white" backgroundColor="#049ce4" />
                            </Box>
                        </Box>
                    }
                    {
                        isVIP && !isTOP &&
                        <Box className='vip-top'>
                            <StyledLabel text={isVIP ? "VIP" : ""} textType="small" type="status" textColor="white" backgroundColor="#61d85a" />
                        </Box>
                    }
                    {
                        !isVIP && isTOP &&
                        <Box className='vip-top'>
                            <StyledLabel text={isTOP ? "TOP" : ""} textType="small" type="status" textColor="white" backgroundColor="#049ce4" />
                        </Box>
                    }
                    <Box className='heart' onClick={
                        (event) => {
                            event.stopPropagation();
                        }
                    }>
                        <StyledIconButton icon={HeartIcon} onClick={onHeartClick} />
                    </Box>
                </Box>
                <Box className='advertText'>
                    <StyledLabel text={title} textType="middle" type="primary" textColor="black" />
                </Box>
                <StyledLabel text={location} textType="small" type="with-icon" icon={LocationIcon} textColor="black" />
                <StyledLabel text={date} textType="small" type="with-icon" icon={CalendarIcon} textColor="black" />
                <StyledLabel text={price.toString() + " грн"} textType="middle" type="primary" textColor="blue" />
            </Box>
        </StyledEngineProvider>
    );
};

export {
    StyledAdvert
};