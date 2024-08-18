import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles'
import InstagramIcon from "../icons/instagram";
import TwitterIcon from "../icons/twitter";
import YoutubeIcon from "../icons/youtube";
import BaselineFacebookIcon from "../icons/baselineFacebook";
import DownloadGooglePlay from "../icons/downloadGooglePlay";
import DownloadAppStore from "../icons/downloadAppStore";

const StyledFooter: React.FC = () => {
    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '1920px',
                padding: '140px 272px',
                alignItems: 'flex-start',
                gap:'140px',
                boxSizing:'border-box',
                backgroundColor: 'var(--dark-blue)',
            }}>
                <Box
                sx={{
                    display: 'flex',
                    gap: '80px',
                    flexDirection:'row',
                    alignItems:'flex-start',
                    alignSelf:'stretch'
                }} >
                    <Box sx={{
                        display:'flex',
                        alignItems: 'flex-start',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        gap:'80px',
                        alignSelf:'stretch',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap:'20px'
                        }}>
                            <InstagramIcon/>
                            <BaselineFacebookIcon/>
                            <TwitterIcon/>
                            <YoutubeIcon/>
                        </Box>
                        <Box sx={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'flex-start',
                            gap:'60px'
                        }}>
                            <Box sx={{
                                display:'flex',
                                width: '262px',
                                flexDirection:'column',
                                alignItems:'flex-start',
                                gap:'12px'
                            }}>

                                <List sx={{
                                    color:'white',
                                    fontSize:'25px',
                                    fontFamily: 'Nunito',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: '25.2px',
                                }}>
                                    <ListItem>Про нас</ListItem>
                                    <ListItem>Контакти</ListItem>
                                    <ListItem>Карта сайту</ListItem>
                                    <ListItem>Карта регіонів</ListItem>
                                    <ListItem>DDX доставка</ListItem>
                                    <ListItem>Робота в DDX</ListItem>
                                </List>


                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: '262px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '12px',
                            }}>
                                <List sx={{
                                    color:'white',
                                    fontSize:'25px',
                                    fontFamily: 'Nunito',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: '25.2px',
                                }}>
                                    <ListItem>Безпека на DDX</ListItem>
                                    <ListItem>Реклама на сайті</ListItem>
                                    <ListItem>Бізнес на DDX</ListItem>
                                    <ListItem>Платні послуги</ListItem>
                                    <ListItem>Мобільний додаток</ListItem>
                                </List>


                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: 'auto',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '12px',
                            }}>
                                <List sx={{
                                    color:'white',
                                    fontSize:'25px',
                                    fontFamily: 'Nunito',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: '25.2px',
                                }}>
                                    <ListItem>Допомога та зворотній зв’язок</ListItem>
                                    <ListItem>Політика конфіденційності</ListItem>
                                    <ListItem>Умови використання</ListItem>
                                    <ListItem>Поширені запитання (FAQ)</ListItem>
                                    <ListItem>Як продавати та купувати?</ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '45px'
                }}>
                    <DownloadGooglePlay/>
                    <DownloadAppStore/>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export default StyledFooter;