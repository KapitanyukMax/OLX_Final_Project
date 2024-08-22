import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles'
import { Box, Link } from "@mui/material";
import { Typography } from '@mui/material';
import StyledIconButton from '../iconButton';
import HeartWhiteIcon from '../icons/heartWhite';
import MessageWhiteIcon from '../icons/messageWhite';
import UserProfileWhiteIcon from '../icons/userProfileWhite';
import StyledButton from '../button';
import PlusIcon from '../icons/plus';
import { StyledHeaderDropdown } from '../dropdown';
import DDXLogoIcon from '../icons/ddxLogo';

const Header: React.FC = () => {
    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{
                width: '100vw',
                height: '90px',
                textAlign: 'center',
                backgroundColor: 'var(--dark-blue)',
                position: 'sticky',
                top: '0',
                zIndex: 1000,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '1360px',
                    height: '100%',
                    margin: '0 auto',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Link href="/components-preview" >
                        <StyledIconButton icon={DDXLogoIcon} />
                    </Link>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                    }}>
                        <Link href="/components-preview" sx={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            Головна
                        </Link>
                        <StyledHeaderDropdown value='Категорії' values={["Категорія 1", "Категорія 2", "Категорія 3"]} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: '30px',
                    }}>
                        <StyledIconButton icon={HeartWhiteIcon} />
                        <StyledIconButton icon={MessageWhiteIcon} />
                        <StyledIconButton icon={UserProfileWhiteIcon} />
                    </Box>
                    <StyledButton text='Додати оголошення' type='contained' icon={PlusIcon} primaryColor='var(--green)' secondaryColor='white' hoverBackColor='var(--light-blue)' className='button-fit'
                        onClick={() => {
                            console.log('Button 2 clicked')
                        }} />
                    <Box sx={{
                        display: 'flex',
                        gap: '8px',
                    }}>
                        <Link href="/components-preview" sx={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            UA
                        </Link>
                        <Typography sx={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            |
                        </Typography>
                        <Link href="/components-preview" sx={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            EN
                        </Link>
                    </Box>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    Header
};