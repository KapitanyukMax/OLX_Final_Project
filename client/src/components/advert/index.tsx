import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import ImageComponent from "../image";
import StyledLabel from "../lable";
import LocationIcon from "../icons/location";
import CalendarIcon from "../icons/calendarSolid";
import HeartIcon from "../icons/heart";
import "./styles.css";

interface StyledAdvertProps {
    title: string;
    location: string;
    date: string;
    image: string;
    isVIP?: boolean;
    price: number;
};

const StyledAdvert: React.FC<StyledAdvertProps> = ({ title, location, date, image, isVIP, price }) => {
    return (
        <StyledEngineProvider injectFirst>
            <Box className='advert'>
                <Box className='imageContainer'>
                    <ImageComponent src={image} alt={title} height="266px" width="297px" />
                    {
                        isVIP &&
                        <Box className='vip'>
                            <StyledLabel text={isVIP ? "VIP" : ""} textType="small" type="status" textColor="white" backgroundColor="#61d85a" />
                        </Box>
                    }
                    <Box className='heart'>
                        <HeartIcon />
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