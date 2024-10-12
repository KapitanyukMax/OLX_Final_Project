import {
    Box,
    Button,
    Card,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    StyledEngineProvider,
    TextField,
    textFieldClasses,
    Typography,
} from "@mui/material";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import ImageComponent from "../../components/image";
import { ArrowBackIosNewSharp } from "@mui/icons-material";
import NovaPostIcon1 from "../../components/icons/novaPost1";
import NovaPostIcon2 from "../../components/icons/novaPost2";
import MeestCorpIcon from "../../components/icons/meestIcon";

interface FormData {
    firstName: string;
    middleName: string;
    email: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    comment: string;
}

const DeliveryPage: React.FC = () => {
    const { advertId } = useParams<{ advertId: string }>();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [advertData, setAdvertData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string>("nova-branch");
    const [step, setStep] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        middleName: "",
        email: "",
        phone: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
        comment: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const navigate = useNavigate();

    const host = import.meta.env.VITE_HOST;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthorized(true);
                if (user?.email) {
                    const response = await axios.get(`${host}/users/email?email=${user.email}`);
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
        const fetchData = async () => {
            try {
                const advertResponse = await axios.get(`${host}/adverts/id/?id=${advertId}`);
                setAdvertData(advertResponse.data);

                const userId = advertResponse.data.userId;
                const userResponse = await axios.get(`${host}/users/${userId}`);
                setUserData(userResponse.data);

                console.log(advertResponse.data);
                console.log(userResponse.data);
            } catch (error) {
                console.error("Error getting data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [advertId]);

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

    const handleDeliveryOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDeliveryOption(event.target.value);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    }
    
    const validate = (): boolean => {
        const tempErrors: Partial<FormData> = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            tempErrors.firstName = "Це поле обов'язкове";
            isValid = false;
        }
        if (!formData.middleName.trim()) {
            tempErrors.middleName = "Це поле обов'язкове";
            isValid = false;
        }
        if (!formData.email.includes("@")) {
            tempErrors.email = "Невірний формат електронної пошти";
            isValid = false;
        }
        if (!formData.phone.trim()) {
            tempErrors.phone = "Це поле обов'язкове";
            isValid = false;
        }
        if (!formData.city.trim()) {
            tempErrors.city = "Це поле обов'язкове";
            isValid = false;
        }
        if (!formData.street.trim()) {
            tempErrors.street = "Це поле обов'язкове";
            isValid = false;
        }
        if (!formData.house.trim()) {
            tempErrors.house = "Це поле обов'язкове";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            try {
                console.log(formData);
                // await axios.post("https://example.com/submit", formData);
                // alert("Дані успішно надіслані!");
            } catch (error) {
                console.error("Помилка відправлення форми:", error);
            }
        }
    };

    const deliveryOptions = [
        {
            id: "nova-branch",
            label: "У відділення Нова пошта",
            time: "1-3 днів",
            price: "50 грн",
            icon: <NovaPostIcon1 />,
        },
        {
            id: "nova-courier",
            label: "Кур'єром Нова пошта",
            time: "1-3 днів",
            price: "85 грн",
            icon: <NovaPostIcon1 />,
        },
        {
            id: "ukrposhta",
            label: "Укрпошта",
            time: "2-5 днів",
            price: "безкоштовно",
            icon: <NovaPostIcon2 />,
        },
        {
            id: "meest-branch",
            label: "Meest",
            time: "2-5 днів",
            price: "30 грн",
            icon: <MeestCorpIcon />,
        },
        {
            id: "meest-courier",
            label: "Кур'єром Meest",
            time: "2-5 днів",
            price: "60 грн",
            icon: <MeestCorpIcon />,
        },
    ];

    return (
        <StyledEngineProvider injectFirst>
            <Box
                sx={{
                    width: "1360px",
                    margin: "0 auto",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Nunito",
                        fontSize: "36px",
                        fontWeight: "700",
                        color: "#254ACE",
                        margin: "60px 0 27px 0",
                    }}
                >
                    DDX доставка
                </Typography>
                <Box
                    sx={{
                        textAlign: "left",
                        marginBottom: "30px",
                    }}
                >
                    <Button
                        sx={{
                            textTransform: "none",
                            fontFamily: "Nunito",
                            fontSize: "18px",
                            color: "#000",
                            gap: "5px",
                        }}
                        style={{
                            backgroundColor: "transparent",
                        }}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <ArrowBackIosNewSharp
                            sx={{
                                width: "20px",
                            }}
                        />
                        Назад
                    </Button>
                </Box>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        display: "flex",
                        padding: "20px 24px",
                        height: "150px",
                        gap: "24px",
                        marginBottom: "30px",
                        borderRadius: "5px",
                    }}
                >
                    <ImageComponent
                        sx={{
                            objectFit: "contain",
                            width: "196px",
                        }}
                        src={advertData.pictures[0]}
                        alt={"advert-photo"}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            gap: "16px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#737070",
                                fontFamily: "Nunito",
                                fontSize: "18px",
                                alignSelf: "start",
                            }}
                        >
                            ID: {advertId}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "20px",
                                    fontWeight: "500",
                                }}
                            >
                                {advertData.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSize: "25px",
                                    fontWeight: "700",
                                }}
                            >
                                {advertData.currencyId == "USD"
                                    ? `${advertData.price}$`
                                    : advertData.currencyId == "EUR"
                                    ? `${advertData.price}€`
                                    : `${advertData.price} грн.`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "700px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "30px",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
                            <circle cx="27" cy="27" r="27" fill="#254ACE" />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="24"
                                fontFamily="Nunito"
                                fontWeight="700"
                                fill="white"
                            >
                                {step}
                            </text>
                        </svg>
                        <Typography
                            sx={{
                                fontFamily: "Nunito",
                                fontSize: "22px",
                            }}
                        >
                            {step === 1 && `Оберіть спосіб отримання замовлення `}
                            {step === 2 && `Заповніть контактні дані отримувача `}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "Nunito",
                            fontSize: "22px",
                            justifySelf: "flex-end",
                        }}
                    >
                        Етап: <span style={{ color: "#049CE4" }}>{step}</span>/2
                    </Typography>
                </Box>
                <Box
                    sx={{
                        margin: "30px 0",
                    }}
                >
                    {step === 1 && (
                        <RadioGroup sx={{ width: "700px" }} value={selectedDeliveryOption} onChange={handleDeliveryOptionChange}>
                            {deliveryOptions.map((option) => (
                                <Card
                                    key={option.id}
                                    sx={{
                                        margin: "15px 0",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "24px 16px",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <FormControlLabel
                                        value={option.id}
                                        control={<Radio />}
                                        label={
                                            <Box
                                                sx={{
                                                    marginLeft: "16px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Nunito",
                                                        fontSize: "20px",
                                                        fontWeight: "500",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {option.label}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Nunito",
                                                        fontSize: "18px",
                                                        color: "#737070",
                                                    }}
                                                >
                                                    доставка протягом {option.time}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Nunito",
                                                fontSize: "18px",
                                                fontWeight: "500",
                                                color: "#254ACE",
                                                marginRight: "60px",
                                            }}
                                        >
                                            {option.price == "безкоштовно" ? `Доставка безкоштовна` : `Доставка від ${option.price}`}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                marginRight: "16px",
                                            }}
                                        >
                                            {option.icon}
                                        </Typography>
                                    </Box>
                                </Card>
                            ))}
                        </RadioGroup>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "32px",
                                    marginBottom: "30px",
                                    backgroundColor: "#fff",
                                    borderRadius: "5px",
                                    padding: "50px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "100px",
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Ваше ім'я"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.firstName)}
                                        helperText={errors.firstName}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="По батькові"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.middleName)}
                                        helperText={errors.middleName}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "100px",
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Електронна адреса"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Номер телефону"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.phone)}
                                        helperText={errors.phone}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "100px",
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Місто"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.city)}
                                        helperText={errors.city}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Вулиця"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.street)}
                                        helperText={errors.street}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                </Box>

                                <Box display="flex" gap={2}>
                                    <TextField
                                        label="Будинок"
                                        name="house"
                                        value={formData.house}
                                        onChange={handleFormChange}
                                        error={Boolean(errors.house)}
                                        helperText={errors.house}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                    <TextField
                                        label="Квартира"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleFormChange}
                                        sx={{ marginBottom: "16px" }}
                                        InputProps={{ style: { fontFamily: "Nunito" } }}
                                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                        FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                    />
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Залишити коментар для кур'єра (необов’язково)"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleFormChange}
                                    InputProps={{ style: { fontFamily: "Nunito" } }}
                                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                                    FormHelperTextProps={{ style: { fontFamily: "Nunito" } }}
                                />
                            </Box>
                            {step === 2 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "20px",
                                    }}
                                >
                                    <Button
                                        onClick={handleBack}
                                        variant="contained"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "15px",
                                            padding: "10px",
                                            backgroundColor: "#254ACE",
                                            width: "250px",
                                            fontFamily: "Nunito",
                                            fontSize: "20px",
                                            textTransform: "none",
                                        }}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={() => {handleDialogOpen()}}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "15px",
                                            padding: "10px",
                                            backgroundColor: "#61D85A",
                                            width: "250px",
                                            fontFamily: "Nunito",
                                            fontSize: "20px",
                                            textTransform: "none",
                                            "&:hover": {
                                                backgroundColor: "#55bf4e",
                                            },
                                        }}
                                    >
                                        Готово
                                    </Button>
                                    <Dialog transitionDuration={0.5} open={openDialog} sx={{ padding: "36px 24px", textAlign: "center" }}>
                                        <DialogTitle>
                                            <Typography sx={{ fontFamily: "Nunito", fontSize: "26px", color: "#61D85A", fontWeight: "700" }}>
                                                Ваше замовлення успішно прийняте
                                            </Typography>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Typography sx={{ fontFamily: "Nunito", fontSize: "20px", marginTop: "10px", }}>
                                                Очікуйте повідомлення від власника{" "}
                                            </Typography>
                                            <Button
                                                onClick={() => navigate(-1)}
                                                sx={{
                                                    marginTop: "30px",
                                                    textTransform: "none",
                                                    fontFamily: "Nunito",
                                                    fontSize: "18px",
                                                    "&:hover": {
                                                        backgroundColor: "transparent",
                                                    },
                                                }}
                                            >
                                                Повернутися назад
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                            )}
                        </form>
                    )}
                    {step === 1 && (
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "15px",
                                padding: "10px",
                                backgroundColor: "#254ACE",
                                width: "250px",
                                fontFamily: "Nunito",
                                fontSize: "20px",
                                textTransform: "none",
                                marginTop: "30px",
                            }}
                        >
                            Далі
                        </Button>
                    )}
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export { DeliveryPage };
