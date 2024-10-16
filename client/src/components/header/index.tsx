import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StyledEngineProvider } from '@mui/material/styles'
import { Box, FormControl, IconButton, InputLabel, Link, MenuItem, Select } from "@mui/material";
import { Typography } from '@mui/material';
import StyledIconButton from '../iconButton';
import HeartWhiteIcon from '../icons/heartWhite';
import MessageWhiteIcon from '../icons/messageWhite';
import UserProfileWhiteIcon from '../icons/userProfileWhite';
import StyledButton from '../button';
import PlusIcon from '../icons/plus';
import { StyledHeaderDropdown } from '../dropdown';
import DDXLogoIcon from '../icons/ddxLogo';
import { AdminPanelSettingsOutlined } from '@mui/icons-material';
const Header: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    const [categories, setCategories] = useState<{ id: string, name: string, picture: string, subcategories: [] }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => unsubscribe();
    }, []);

    const setUser = async () => {
        if (currentUser) {
            try {
                const response = await axios.get(`${host}/users/email?email=${currentUser.email}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${host}/categories`);
            console.log(response.data);
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.error('Error getting categories:', error);
        }
    }

    useEffect(() => {
        setUser();
        fetchCategories();
    }, [currentUser]);

    useEffect(() => {
        setIsAdmin(userData?.isAdmin);
        console.log("Admin " + isAdmin);
    }, [userData]);

    const handleCategoryChange = (category: string) => {
        console.log(category);
        window.location.href = `/adverts/${category}`;
    }

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
                    <Link href="/" >
                        <StyledIconButton icon={DDXLogoIcon} />
                    </Link>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                    }}>
                        <Link href="/" sx={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            Головна
                        </Link>
                        {/* <StyledHeaderDropdown placeholder={'Категорії'} values={categories} onChange={(e) => handleCategoryChange(e.target.value)} /> */}
                        <FormControl fullWidth sx={{ width: '115px' }}>
                            <InputLabel id='category' sx={{ fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400', color: 'white' }}>Категорія</InputLabel>
                            <Select labelId='category' label='Категорія' sx={{ height: '50px', borderRadius: '10px', border: '0px solid white', background: '#011034', textAlign: 'left', fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400', color: 'white' }} value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value as string)}>
                                {categories.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item.name}
                                        sx={{
                                            fontFamily: "Nunito",
                                            fontSize: "18px",
                                            fontWeight: '400',
                                            color: '#737070'
                                        }}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: '30px',
                    }}>
                        <StyledIconButton icon={HeartWhiteIcon} onClick={() => {
                            if (currentUser) {
                                window.location.href = `/favorites/${userData?.id}`;
                            } else {
                                window.location.href = '/registration';
                            }
                        }} />
                        <StyledIconButton icon={MessageWhiteIcon} />
                        <StyledIconButton icon={UserProfileWhiteIcon} onClick={() => {
                            if (currentUser) {
                                window.location.href = '/profile-page';
                            } else {
                                window.location.href = '/registration';
                            }
                        }} />
                        {
                            isAdmin &&
                            <IconButton sx={{ padding: '0px' }} onClick={() => { window.location.href = '/admin-panel' }}><AdminPanelSettingsOutlined sx={{ color: 'white', width: '35px', height: '35px' }} /></IconButton>
                        }
                    </Box>
                    <StyledButton text='Додати оголошення' type='contained' icon={PlusIcon} primaryColor='var(--green)' secondaryColor='white' hoverBackColor='var(--light-blue)' className='button-fit'
                        onClick={() => {
                            if (currentUser) {
                                window.location.href = '/advert-create';
                            } else {
                                window.location.href = '/registration';
                            }
                        }} />
                    {/* <Box sx={{
                        display: 'flex',
                        gap: '8px',
                    }}>
                        <Link href="/components-preview" sx={{
                            color: 'var(--dark-blue)',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center'
                        }}>
                            UA
                        </Link>
                        <Typography sx={{
                            color: 'var(--dark-blue)',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            |
                        </Typography>
                        <Link href="/components-preview" sx={{
                            color: 'var(--dark-blue)',
                            fontSize: '20px',
                            fontWeight: '400',
                            textDecoration: 'none',
                            alignSelf: 'center',
                        }}>
                            EN
                        </Link>
                    </Box> */}
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    Header
};