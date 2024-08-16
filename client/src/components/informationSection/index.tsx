import React from "react";
import { Box, Typography } from "@mui/material";
import './style.css';
import { StyledEngineProvider } from '@mui/material/styles'

const InformationSection: React.FC = () => {
    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '1382px',
                padding: '60px 78px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '148px',
                backgroundColor: 'var(--dark-blue)',
            }}>
                <Box
                    sx={{
                        width: '396px',
                        height: '82px',
                        textAlign: 'left'
                    }}>
                    <Typography className="mainHeaderText">Чому варто розміщувати оголошення саме на DDX?</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '679px',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '64px',
                    flexShrink: '0',
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px'
                        }}>
                        <Box sx={{
                            width: '306px',
                            textAlign: 'left'
                        }}>
                            <Typography className="headerText" >1. Безкоштовне розміщення оголошень: </Typography>
                            <Typography className="contentText">Базове розміщення оголошень на DDX є безкоштовним, що дозволяє вам економити кошти на рекламі та маркетингу</Typography>
                        </Box>
                        <Box sx={{
                            width: '306px',
                            textAlign: 'left'
                        }}>
                            <Typography className="headerText">3. Безпека та надійність: </Typography>
                            <Typography className="contentText">DDX використовує сучасні технології захисту даних, щоб забезпечити безпечне спілкування та транзакції між користувачами. Ваші особисті дані будуть надійно захищені</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px'
                        }}>

                        <Box sx={{
                            width: '306px',
                            textAlign: 'left'
                        }}>
                            <Typography className="headerText">2. Різноманітність категорій: </Typography>
                            <Typography className="contentText">На DDX представлений широкий спектр категорій, що дозволяє розміщувати оголошення про продаж різноманітних товарів та послуг — від автомобілів та нерухомості до електроніки та одягу</Typography>
                        </Box>
                        <Box sx={{
                            width: '306px',
                            textAlign: 'left'
                        }}>
                            <Typography className="headerText">4. Географічна прив'язка: </Typography>
                            <Typography className="contentText">Дозволяє користувачам шукати товари та послуги в своєму регіоні, що зручно для локальних угод. Ви можете легко знайти пропозиції поблизу свого місцезнаходження</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export default InformationSection;