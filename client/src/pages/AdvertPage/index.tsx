import { Box, StyledEngineProvider } from "@mui/material";
import React from "react";
import { Header } from "../../components/header";
import { StyledInput } from "../../components/input";
import StyledButton from "../../components/button";
import ImageComponent from "../../components/image";
import StyledLabel from "../../components/lable";
import "./styles.css";
import HeartIcon from "../../components/icons/heart";
import Carousel from "react-material-ui-carousel";

const AdvertPage: React.FC = () => {
    const images = [
        "https://cdn3.riastatic.com/photosnew/auto/photo/bmw_m3__565465833hd.webp",
        "https://cdn2.riastatic.com/photosnew/auto/photo/bmw_m3__565465837hd.webp",
        "https://cdn0.riastatic.com/photosnew/auto/photo/bmw_m3__565465835hd.webp",
        "https://cdn3.riastatic.com/photosnew/auto/photo/bmw_m3__565465843hd.webp",
        "https://cdn4.riastatic.com/photosnew/auto/photo/bmw_m3__565465849hd.webp",
        "https://cdn1.riastatic.com/photosnew/auto/photo/bmw_m3__565465846hd.webp",
        "https://cdn0.riastatic.com/photosnew/auto/photo/bmw_m3__565465855hd.webp",
        "https://cdn0.riastatic.com/photosnew/auto/photo/bmw_m3__565465865hd.webp",
        "https://cdn1.riastatic.com/photosnew/auto/photo/bmw_m3__565466001hd.webp",
        "https://cdn2.riastatic.com/photosnew/auto/photo/bmw_m3__565465997hd.webp",
        "https://cdn2.riastatic.com/photosnew/auto/photo/bmw_m3__565465992hd.webp",
    ];

    return (
        <StyledEngineProvider injectFirst>
            <Header />
            <Box
                sx={{
                    width: "1360px",
                    margin: "0 auto",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        gap: "60px",
                        justifyContent: "space-between",
                        marginTop: "60px",
                    }}
                >
                    <StyledInput value={""} widthType="large" />
                    <StyledInput value={""} widthType="small" />
                    <StyledInput value={""} widthType="small" />
                    <StyledButton primaryColor="var(--dark-blue)" text={"Пошук"} type={"contained"} />
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        width: "100%",
                        height: "505px",
                        margin: "60px 0",
                        padding: "25px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            flex: "4",
                        }}
                    >
                        <Box
                            sx={{
                                width: "80%",
                                height: "80%",
                            }}
                        >
                            <Carousel
                                animation="slide"
                                autoPlay={false}
                                indicators={true}
                            >
                                {images.map((image, i) => (
                                    <ImageComponent
                                        key={i}
                                        src={image}
                                        alt={""}
                                    />
                                ))}
                            </Carousel>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: "2",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <StyledLabel
                                text={"Опубліковано сьогодні"}
                                type={"primary"}
                                textType={"small"}
                                textColor="var(--light-gray)"
                            />
                            <HeartIcon />
                        </Box>
                        <Box sx={{
                            flex: "1"
                        }}>
                            <StyledLabel
                                text={"Продам BMW M3 G80 2021"}
                                type={"primary"}
                                textType={"middle"}
                            />
                            <StyledLabel
                                text={"4049000 грн."}
                                type={"primary"}
                                textType={"middle"}
                            />
                        </Box>
                        <Box
                            sx={{
                                flex: "2",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "24px",
                            }}
                        >
                            <StyledButton
                                text={"Написати повідомлення"}
                                type={"contained"}
                            />
                            <StyledButton
                                
                                text={"Показати телефон"}
                                type={"outlined"}
                            />
                            <StyledButton
                                
                                text={"DDX доставка"}
                                type={"outlined"}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export { AdvertPage };
