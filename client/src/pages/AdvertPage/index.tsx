import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Rating,
    StyledEngineProvider,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledInput } from "../../components/input";
import StyledButton from "../../components/button";
import ImageComponent from "../../components/image";
import StyledLabel from "../../components/lable";
import "./styles.css";
import Carousel from "react-material-ui-carousel";
import SearchIcon from "../../components/icons/search";
import { Close, Favorite, FavoriteBorder } from "@mui/icons-material";
import VipCrownIcon from "../../components/icons/vipCrown";
import TopFluentIcon from "../../components/icons/topFluent";
import CarFillIcon from "../../components/icons/carFill";
import LocationIcon from "../../components/icons/location";
import TimeFillIcon from "../../components/icons/timeFill";
import { StyledAdvert } from "../../components/advert";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ReportDialog } from "../../components/reportDialog";
import Chat from "../../components/chat";

const AdvertPage: React.FC = () => {
    const { advertId } = useParams<{ advertId: string }>();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [advertData, setAdvertData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [userAdverts, setUserAdverts] = useState<any[]>([]);
    const [adverts, setAdverts] = useState<any[]>([]);
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [favoriteAdvertsIds, setFavoriteAdvertsIds] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    const host = import.meta.env.VITE_HOST;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthorized(true);
                if (user?.email) {
                    const response = await axios.get(
                        `${host}/users/email?email=${user.email}`
                    );
                    setCurrentUser(response.data);
                    console.log(response.data);
                }
            } else {
                setIsAuthorized(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const advertResponse = await axios.get(
                    `${host}/adverts/${advertId}`
                );
                setAdvertData(advertResponse.data);

                const userId = advertResponse.data.userId;
                const userResponse = await axios.get(`${host}/users/${userId}`);
                setUserData(userResponse.data);

                const userAdvertsResponse = await axios.get(
                    `${host}/adverts/userId/?userId=${userId}`
                );
                setUserAdverts(userAdvertsResponse.data.adverts);

                const advertsResponse = await axios.get(
                    `${host}/adverts?limit=8`
                );
                setAdverts(advertsResponse.data.adverts);

                console.log(advertResponse.data);
                console.log(userResponse.data);
                console.log(userAdvertsResponse.data);
                console.log(advertsResponse.data);
            } catch (error) {
                console.error("Error getting data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [advertId]);

    const fetchFavorites = async () => {
        try {
            if (!userData) return;
            const response = await axios.get(
                `${host}/favorites/userId?userId=${userData.id}`
            );
            const favoriteAdvertIds = response.data.adverts.map(
                (advert: any) => advert.id
            );
            setFavoriteAdvertsIds(favoriteAdvertIds);
            console.log(`favorite: \n${favoriteAdvertIds}`);
        } catch (error) {
            console.error("Error fetching favorites", error);
        }
    };

    const handleHeartIconClick = async (advertId: string) => {
        if (!isAuthorized) {
            window.location.href = "/registration";
        }
        if (favoriteAdvertsIds.includes(advertId)) {
            await axios.get(
                `${host}/favorites/remove?userId=${userData.id}&advertId=${advertId}`
            );
            setFavoriteAdvertsIds(
                favoriteAdvertsIds.filter((id) => id !== advertId)
            );
        } else {
            await axios.get(
                `${host}/favorites/add?userId=${userData.id}&advertId=${advertId}`
            );
            setFavoriteAdvertsIds([...favoriteAdvertsIds, advertId]);
        }
    };

    const handleClickImageOpen = (image: string) => {
        setSelectedImage(image);
        setOpenImage(true);
    };

    const handleImageClose = () => {
        setOpenImage(false);
        setSelectedImage("");
    };

    const handleAdvertClick = (advertId: string) => {
        window.location.href = `/advert/${advertId}`;
    };

    const handleShowPhoneNumber = () => {
        setShowPhoneNumber(true);
    };

    const handleOpenReportDialog = () => {
        setOpenReportDialog(true);
    };

    const handleCloseReportDialog = () => {
        setOpenReportDialog(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "17.8vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <StyledEngineProvider injectFirst>
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
                                    {advertData.pictures.map(
                                        (item: any, index: number) => (
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
                                                        handleClickImageOpen(
                                                            item
                                                        )
                                                    }
                                                />
                                            </Paper>
                                        )
                                    )}
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
                                                width: "90vw",
                                                height: "90vh",
                                                objectFit: "contain",
                                                maxWidth: "90%",
                                                maxHeight: "90%",
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
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#737070",
                                    fontFamily: "Nunito",
                                    fontSize: "16px",
                                }}
                            >
                                Опубліковано{" "}
                                {new Date(
                                    advertData.creationDate
                                ).toLocaleDateString() ===
                                    new Date().toLocaleDateString()
                                    ? "сьогодні"
                                    : new Date(
                                        advertData.creationDate
                                    ).toLocaleDateString()}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    handleHeartIconClick(advertData.id)
                                }
                            >
                                {favoriteAdvertsIds.includes(advertData.id) ? (
                                    <Favorite
                                        sx={{
                                            width: "35px",
                                            height: "35px",
                                            color: "#ff0054",
                                        }}
                                    />
                                ) : (
                                    <FavoriteBorder
                                        sx={{ width: "35px", height: "35px" }}
                                    />
                                )}
                            </IconButton>
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
                                {advertData.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "22px",
                                    fontWeight: "700",
                                    textAlign: "left",
                                }}
                            >
                                {advertData.currencyId == "USD"
                                    ? `${advertData.price}$`
                                    : advertData.currencyId == "EUR"
                                        ? `${advertData.price}€`
                                        : `${advertData.price} грн.`}
                            </Typography>
                        </Box>
                        {isAuthorized ? (
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
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                />
                                <StyledButton
                                    text={
                                        showPhoneNumber
                                            ? userData.phone
                                            : "Показати телефон"
                                    }
                                    type={"outlined"}
                                    onClick={() => handleShowPhoneNumber()}
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
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    flex: "1.5",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "20px",
                                        textAlign: "left",
                                    }}
                                >
                                    Увійдіть у свій профіль DDX або створіть
                                    новий, щоб зв’язатися з автором
                                </Typography>
                                <Link to={"/registration"}>
                                    <StyledButton
                                        sx={{
                                            borderRadius: "15px",
                                            height: "48px",
                                            marginTop: "20px",
                                        }}
                                        text={"Увійти або створити профіль"}
                                        type={"contained"}
                                    />
                                </Link>
                            </Box>
                        )}
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
                            display: "flex",
                            flexDirection: "column",
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
                            <Button
                                onClick={handleOpenReportDialog}
                                sx={{
                                    textTransform: "none",
                                    fontFamily: "Nunito",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    color: "#E23030",
                                }}
                                style={{
                                    backgroundColor: "transparent",
                                }}
                            >
                                Поскаржитися
                            </Button>
                            <ReportDialog
                                open={openReportDialog}
                                advertId={advertData.id}
                                userId={userData.id}
                                handleClose={handleCloseReportDialog}
                            />
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
                                    Стан: {advertData.status}
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
                                    }} // TODO
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
                            {advertData.description}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTop: "1px solid #000",
                                padding: "10px",
                                marginTop: "auto",
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
                                Переглядів: {advertData.viewsCount}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                justifySelf: "flex-end",
                                color: "#737070",
                                fontFamily: "Nunito",
                                fontSize: "16px",
                                fontWeight: "400",
                                textAlign: "right",
                                marginTop: "10px",
                            }}
                        >
                            ID: {advertData.id}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            padding: "25px 30px",
                            width: "546px",
                            maxHeight: "596px",
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
                                src={userData.picture}
                                alt={"user-avatar"}
                            />
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "22px",
                                    fontWeight: "400",
                                }}
                            >
                                {userData.name}
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
                                <Rating value={userData.rating} readOnly />
                                <Typography
                                    sx={{
                                        fontFamily: "Nunito",
                                        fontSize: "18px",
                                        fontWeight: "400",
                                    }}
                                >
                                    {userData.rating}
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
                                text={"80+ успішних доставок з DDX"} // TODO
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
                                    {advertData.location}
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
                                    text={"Останній візит"} // ?????
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
                                <Link
                                    to={`/user/${userData.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "#000",
                                    }}
                                >
                                    Переглянути профіль
                                </Link>
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
                        gap: "17px",
                        flexWrap: "wrap",
                    }}
                >
                    {userAdverts.length === 0 ? (
                        <Typography>
                            У користувача ще немає оголошень...
                        </Typography>
                    ) : (
                        userAdverts.slice(0, 4).map((advert) => (
                            <StyledAdvert
                                key={advert.id}
                                title={advert.name}
                                location={advert.location}
                                date={advert.creationDate}
                                image={advert.pictures[0]}
                                isFavorite={favoriteAdvertsIds.includes(
                                    advert.id
                                )}
                                onClick={() => {
                                    handleAdvertClick(advert.id);
                                }}
                                onHeartClick={() => {
                                    handleHeartIconClick(advert.id);
                                }}
                                price={advert.price}
                                currency={advert.currencyId}
                            />
                        ))
                    )}
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
                <Box
                    sx={{
                        display: "flex",
                        margin: "40px 0",
                        flexWrap: "wrap",
                        gap: "17px",
                    }}
                >
                    {adverts.slice(0, 8).map((advert) => (
                        <StyledAdvert
                            key={advert.id}
                            title={advert.name}
                            location={advert.location}
                            date={advert.creationDate}
                            image={advert.pictures[0]}
                            isFavorite={favoriteAdvertsIds.includes(advert.id)}
                            onClick={() => {
                                handleAdvertClick(advert.id);
                            }}
                            onHeartClick={() => {
                                handleHeartIconClick(advert.id);
                            }}
                            price={advert.price}
                            currency={advert.currencyId}
                        />
                    ))}
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">Чат</DialogTitle>
                <DialogContent>
                    <Chat advertId={advertData.id} advertHeader={advertData.name} sellerId={advertData.userId} width="500px" onSend={()=>{}} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Вийти
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledEngineProvider>
    );
};

export { AdvertPage };
