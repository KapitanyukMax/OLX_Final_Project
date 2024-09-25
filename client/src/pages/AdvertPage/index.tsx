import {
    Box,
    Dialog,
    IconButton,
    Paper,
    Rating,
    StyledEngineProvider,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Header } from "../../components/header";
import { StyledInput } from "../../components/input";
import StyledButton from "../../components/button";
import ImageComponent from "../../components/image";
import StyledLabel from "../../components/lable";
import "./styles.css";
import HeartIcon from "../../components/icons/heart";
import Carousel from "react-material-ui-carousel";
import SearchIcon from "../../components/icons/search";
import { Close } from "@mui/icons-material";
import VipCrownIcon from "../../components/icons/vipCrown";
import TopFluentIcon from "../../components/icons/topFluent";
import CarFillIcon from "../../components/icons/carFill";
import LocationIcon from "../../components/icons/location";
import TimeFillIcon from "../../components/icons/timeFill";
import { StyledAdvert } from "../../components/advert";
import StyledFooter from "../../components/footer";

const AdvertPage: React.FC = () => {
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");

    const handleClickImageOpen = (image: any) => {
        setSelectedImage(image);
        setOpenImage(true);
    };

    const handleImageClose = () => {
        setOpenImage(false);
        setSelectedImage(null);
    };

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
                    <StyledInput
                        iconEnd={SearchIcon}
                        value={"Що шукаємо?"}
                        widthType="large"
                    />
                    <StyledInput
                        iconEnd={SearchIcon}
                        value={"Вся Україна"}
                        widthType="small"
                    />
                    <StyledInput
                        iconEnd={SearchIcon}
                        value={"Місто/село"}
                        widthType="small"
                    />
                    <StyledButton
                        sx={{ width: "152px" }}
                        primaryColor="var(--dark-blue)"
                        text={"Пошук"}
                        type={"contained"}
                    />
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        height: "505px",
                        margin: "50px 0",
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
                        <Box>
                            <Box
                                sx={{
                                    width: "800px",
                                    height: "100%",
                                    overflow: "hidden",
                                }}
                            >
                                <Carousel
                                    animation="slide"
                                    autoPlay={false}
                                    indicators={true}
                                    navButtonsAlwaysVisible={true}
                                    indicatorContainerProps={{
                                        style: {
                                            marginTop: "4px",
                                        },
                                    }}
                                >
                                    {images.map((item, index) => (
                                        <Paper
                                            key={index}
                                            elevation={3}
                                            sx={{
                                                boxShadow: "none",
                                            }}
                                        >
                                            <img
                                                src={item}
                                                alt={""}
                                                style={{
                                                    width: "800px",
                                                    height: "485px",
                                                    objectFit: "cover",
                                                }}
                                                onClick={() =>
                                                    handleClickImageOpen(item)
                                                }
                                            />
                                        </Paper>
                                    ))}
                                </Carousel>
                                <Dialog
                                    open={openImage}
                                    onClose={handleImageClose}
                                    maxWidth="lg"
                                    fullWidth
                                    PaperProps={{
                                        style: {
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <Box position="relative">
                                        <IconButton
                                            onClick={handleImageClose}
                                            sx={{
                                                position: "absolute",
                                                top: 10,
                                                right: 10,
                                                color: "white",
                                                zIndex: 1,
                                            }}
                                        >
                                            <Close />
                                        </IconButton>
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Box>
                                </Dialog>
                            </Box>
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
                        <Box
                            sx={{
                                flex: "1",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                marginBottom: "42px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "28px",
                                    fontWeight: "500",
                                    textAlign: "left",
                                }}
                            >
                                Продам BMW M3 G80 2021
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "22px",
                                    fontWeight: "700",
                                    textAlign: "left",
                                }}
                            >
                                4049000 грн.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
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
                                sx={{
                                    height: "65px",
                                    width: "436px",
                                }}
                            />
                            <StyledButton
                                text={"Показати телефон"}
                                type={"outlined"}
                                sx={{
                                    height: "65px",
                                    width: "436px",
                                }}
                            />
                            <StyledButton
                                text={"DDX доставка"}
                                type={"outlined"}
                                sx={{
                                    height: "65px",
                                    width: "436px",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "30px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            padding: "25px 30px",
                            width: "806px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                sx={{
                                    display: "flex",
                                    gap: "5px",
                                    alignItems: "center",
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                }}
                            >
                                {<VipCrownIcon />}Рекламувати оголошення
                            </Typography>
                            <Typography
                                sx={{
                                    display: "flex",
                                    gap: "5px",
                                    alignItems: "center",
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                }}
                            >
                                {<TopFluentIcon />}Підняти оголошення
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#E23030",
                                }}
                            >
                                Поскаржитися
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "45px 0",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #000",
                                    borderRadius: "5px",
                                    padding: "15px 14px",
                                    width: "176px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        display: "flex",
                                        gap: "5px",
                                        alignItems: "center",
                                    }}
                                >
                                    <CarFillIcon />
                                    DDX доставка
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #000",
                                    borderRadius: "5px",
                                    padding: "15px 14px",
                                    width: "176px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        display: "flex",
                                        gap: "5px",
                                        alignItems: "center",
                                    }}
                                >
                                    Стан: вживане
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #000",
                                    borderRadius: "5px",
                                    padding: "15px 14px",
                                    width: "176px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        display: "flex",
                                        gap: "5px",
                                        alignItems: "center",
                                    }}
                                >
                                    Марка: Canon
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: "Nunito",
                                fontSize: "28px",
                                fontWeight: "500",
                                textAlign: "left",
                            }}
                        >
                            Опис
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Nunito",
                                fontSize: "18px",
                                fontWeight: "400",
                                textAlign: "left",
                                margin: "30px 0",
                            }}
                        >
                            М3 G80 COMPETITION Стан нового авто! Максимальна
                            комплектація! Замовний колір! Салон Individual!
                            Повністю заводський карбоновий пакет, камери 360,
                            повний привід, що відключається, проекція на лобове
                            скло, індивідуальний салон з карбоновими сидіннями і
                            розширеним шкіряним пакетом для торпеди і дверних
                            карт, розширений клімат для пасажирів заднього ряду,
                            фари Black Laser з авто дальним, всі асистенти
                            водія, екстер'єр в індивідуальному кольорі Nardo
                            gray, та багато іншого. Автомобіль у стоку, без чіп
                            тюнінгу.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTop: "1px solid #000",
                                padding: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#737070",
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "400",
                                }}
                            >
                                Переглядів: 1254
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                color: "#737070",
                                fontFamily: "Nunito",
                                fontSize: "16px",
                                fontWeight: "400",
                                textAlign: "right",
                                marginTop: "10px",
                            }}
                        >
                            ID: 115154742
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            padding: "25px 30px",
                            width: "546px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Nunito",
                                fontSize: "28px",
                                fontWeight: "500",
                                textAlign: "left",
                            }}
                        >
                            Автор
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "25px",
                                alignSelf: "flex-start",
                                marginTop: "36px",
                            }}
                        >
                            <ImageComponent
                                borderRadius="86px"
                                width="86px"
                                height="86px"
                                src={
                                    "https://s3-alpha-sig.figma.com/img/2dd0/3dbc/b26f802d324fad24e23ed1651c7e0951?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BEGe9~LcCSdS1E0birpDENmM38lf6ZSOAexR9yp0JHa-1VGbNhfoYbT603dzLzDnMsleWCaQQ0mUSnIHAdO8xbE5M~pM6UvLGPJSHBs9vF6V0GPXGBKN54jYILn20mGQF8kI3HuvLk4zDZmrE3eHLISb9G~PgdrAyxdE8eDifTYOq0npwwW11dMybBWWDDNtcVTeg8YUZ~7VKjxXe1-8elXPUyu2EAGiBonCuPuCg6OQZbAE6~zTdAUhs~k4gatxu5B204uJ4aexu7RHtrI6rLBzqKCtBt~OEcLiNZO99yjrLbajhticcTgQ08pQdkiIkx9nU~2EGlk1NWnvyvdP~w__"
                                }
                                alt={""}
                            />
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "22px",
                                    fontWeight: "400",
                                }}
                            >
                                Володимир Романюк
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginTop: "24px",
                                textAlign: "left",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    textAlign: "left",
                                }}
                            >
                                Рейтинг
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: "5px",
                                    display: "flex",
                                    gap: "12px",
                                }}
                            >
                                <Rating value={3} readOnly />
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "18px",
                                        fontWeight: "400",
                                    }}
                                >
                                    3.0
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "24px",
                                gap: "36px",
                                padding: "20px",
                                background: "rgba(0, 37, 121, 0.07)",
                            }}
                        >
                            <StyledLabel
                                icon={CarFillIcon}
                                text={"80+ успішних доставок з DDX"}
                                type={"with-icon"}
                                textType={"small"}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "40px",
                                }}
                            >
                                <StyledLabel
                                    icon={LocationIcon}
                                    text={"Місцезнаходження"}
                                    type={"with-icon"}
                                    textType={"small"}
                                />
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Львів
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "40px",
                                }}
                            >
                                <StyledLabel
                                    icon={TimeFillIcon}
                                    text={"Останній візит"}
                                    type={"with-icon"}
                                    textType={"small"}
                                />
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                >
                                    30 хв тому
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                padding: "10px",
                                marginTop: "40px",
                                borderBottom: "1px solid #254ACE",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                }}
                            >
                                Переглянути профіль
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography
                    sx={{
                        marginTop: "60px",
                        fontFamily: "Nunito",
                        fontSize: "36px",
                        fontWeight: "500",
                    }}
                >
                    Інші оголошення автора
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        margin: "40px 0",
                        gap: "18px",
                    }}
                >
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                </Box>
                <StyledButton
                    sx={{
                        width: "367px",
                        margin: "0 auto",
                        marginBottom: "60px",
                    }}
                    text={"Дивитися всі"}
                    type={"outlined"}
                />
                <Typography
                    sx={{
                        fontFamily: "Nunito",
                        fontSize: "36px",
                        fontWeight: "500",
                    }}
                >
                    Схожі оголошення
                </Typography>
                <Box sx={{
                    display: "flex",
                    margin: "40px 0",
                    flexWrap: "wrap",
                    gap: "17px",
                }}>
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                    <StyledAdvert
                        title={"Плівковий Nikon Em"}
                        location={"Львів"}
                        date={"09.08.2024"}
                        image={
                            "https://s3-alpha-sig.figma.com/img/c8ef/cf9b/4a12d8d907b3b06dc7724ba6e098edb8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0Fvy~DWFy1CYOfOIM8-dKBn008eKbXItjAEzq3uHulrMzgab4pVVWrg2pU3q4j~GKow30u1dknXtq5XUfyHwi4aFqigjqOZnEvanLwkUVLU4Iu5Yw~dp1EBZDbvSklPmfnbDklbuq-8IYKQzeYBd2JsqR3~C5btifnYVSXKHCBvHe~0miEuQEWVNn835epCwEGYtM1A3Lvt0lrH6zsUjiGyNC56-KBlXzXixJE8xkzVl8iY4x9pLaXz094XgYqZjkGJp4IKfo8jiDq9pNVw-HnXJjisyM7ykyG5XSuIyuJ6Ey4Uj2XXg2XwBJNnH4RR7KIhyJyKR4Iozi3u-fhs7g__"
                        }
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        price={3500}
                    />
                </Box>
            </Box>
            <StyledFooter />
        </StyledEngineProvider>
    );
};

export { AdvertPage };
