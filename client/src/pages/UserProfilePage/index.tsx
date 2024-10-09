import {
    Box,
    Button,
    Rating,
    StyledEngineProvider,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageComponent from "../../components/image";
import StyledButton from "../../components/button";
import StyledLabel from "../../components/lable";
import TimeFillIcon from "../../components/icons/timeFill";
import LocationIcon from "../../components/icons/location";
import CarFillIcon from "../../components/icons/carFill";

const UserProfilePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const host = import.meta.env.VITE_HOST;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(
                    `${host}/users/${userId}`
                );
                setUserData(userResponse.data);

                console.log(userResponse.data);
            } catch (error) {
                console.error("Error getting data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    width: "1360px",
                    margin: "70px auto",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "22px",
                            alignItems: "center",
                        }}
                    >
                        <ImageComponent
                            width="136px"
                            height="136px"
                            borderRadius="50%"
                            src={userData?.picture}
                            alt={"user-avatar"}
                        />
                        <Typography
                            sx={{
                                fontFamily: "Nunito",
                                fontSize: "22px",
                            }}
                        >
                            {userData?.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Nunito",
                                fontSize: "18px",
                                textAlign: "left",
                            }}
                        >
                            Рейтинг
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "24px",
                            }}
                        >
                            <Rating value={userData?.rating} readOnly />
                            <Typography
                                sx={{ fontFamily: "Nunito", fontSize: "18px" }}
                            >
                                {userData?.rating}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "42px",
                        }}
                    >
                        <StyledButton
                            sx={{ width: "146px" }}
                            text={"Поширити"}
                            type={"outlined"}
                        />
                        <StyledButton
                            sx={{ width: "146px" }}
                            text={"Підписатися"}
                            type={"contained"}
                        />
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
                    <Typography
                        sx={{
                            fontFamily: "Nunito",
                            fontSize: "18px",
                            textAlign: "left",
                        }}
                    >
                        На DDX з : {}
                    </Typography>
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
                            {/* {advertData.location} */}
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
                        marginTop: "12px",
                        padding: "10px",
                        width: "140px",
                        borderBottom: "1px solid #254ACE",
                        alignSelf: "flex-end",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontWeight: "600",
                        }}
                    >
                        <Link
                            to={""}
                            style={{
                                textDecoration: "none",
                                color: "#000",
                            }}
                        >
                            Що таке рейтинг?
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export { UserProfilePage };
