import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { auth } from '../../../firebaseConfig';
import { User, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { StyledEngineProvider, Box } from '@mui/material';
import StyledButton from '../../components/button';
import PenFluentIcon from '../../components/icons/penFluent';
import ImageComponent from '../../components/image';
import { StyledInput } from '../../components/input';
import StyledLabel from '../../components/lable';
import StyledIconButton from '../../components/iconButton';
import IInCircleIcon from '../../components/icons/iInCircle';
import { Link } from 'react-router-dom';
import SearchIcon from '../../components/icons/search';
import { StyledAdvert } from '../../components/advert';

const ProfilePage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);

    const [isEditable, setIsEditable] = useState(true);

    const [adverts, setAdverts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [open, setOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState<string | null>(null);

    const [displayName, setDisplayName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [image, setImage] = useState<string | File>('');
    const [prevImage, setPrevImage] = useState<string>('');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [sortValue, setSortValue] = useState<string>('По даті(спадання)');
    const sortValues = ['По даті(спадання)', 'По даті(зростання)', 'По ціні(спадання)', 'По ціні(зростання)'];

    const [categories, setCategories] = useState<{ id: string; name: string; picture: string; subcategories: [] }[]>([]);
    const [category, setCategory] = useState<string>('');

    const [favoriteAdvertsIds, setFavoriteAdvertsIds] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            console.log(user?.uid);
        });

        return () => unsubscribe();
    }, []);

    const fetchFavorites = async () => {
        try {
            if (!userData) return;
            const response = await axios.get(`${host}/favorites/userId?userId=${userData.id}`);
            const favoriteAdvertIds = response.data.adverts.map((advert: any) => advert.id);
            setFavoriteAdvertsIds(favoriteAdvertIds);
        } catch (error) {
            console.error('Error fetching favorites', error);
        }
    };

    const handleHeartIconClick = async (advertId: string) => {
        if (currentUser === null) {
            window.location.href = '/registration';
        }
        if (favoriteAdvertsIds.includes(advertId)) {
            await axios.get(`${host}/favorites/remove?userId=${userData.id}&advertId=${advertId}`);
            setFavoriteAdvertsIds(favoriteAdvertsIds.filter(id => id !== advertId));
        } else {
            await axios.get(`${host}/favorites/add?userId=${userData.id}&advertId=${advertId}`);
            setFavoriteAdvertsIds([...favoriteAdvertsIds, advertId]);
        }
    };

    const getAdverts = async (page: number = 1, searchTerm?: string) => {
        if (userData) {
            let response;
            const limit = 8;
            let startAfterParam = page > 1 ? adverts[adverts.length - 1].id : null;

            const sortQuery = sortValue === 'По даті(спадання)' ? 'sortBy=creationDate&sortOrder=desc' :
                sortValue === 'По даті(зростання)' ? 'sortBy=creationDate&sortOrder=asc' :
                    sortValue === 'По ціні(спадання)' ? 'sortBy=price&sortOrder=desc' :
                        sortValue === 'По ціні(зростання)' ? 'sortBy=price&sortOrder=asc' : '';

            if (searchTerm && searchTerm.length > 0) {
                startAfterParam = null;
                response = await axios.get(`${host}/adverts/userId?userId=${userData.id}&searchTerm=${searchTerm}&${sortQuery}`);
            } else {
                response = await axios.get(`${host}/adverts/userId?userId=${userData.id}&limit=${limit}&startAfter=${startAfterParam}&${sortQuery}`);
            }

            if (response) {
                if (category === '' || category === 'Всі категорії') {
                    const { adverts: data, totalCount } = response.data;
                    setAdverts(data);

                    if (!searchTerm || searchTerm.length === 0) {
                        setTotalPages(Math.ceil(totalCount / limit));
                    }

                    console.log(data);
                }
                else {
                    const { adverts: data, totalCount } = response.data;
                    const subcategoriesRef = await axios.get(`${host}/subcategories/by-category/${category}`);
                    if (subcategoriesRef.data.length > 0) {
                        const subcategories = subcategoriesRef.data.map((subcategory: any) => subcategory.id);
                        const filteredData = data.filter((advert: any) => subcategories.includes(advert.subCategoryId));
                        setAdverts(filteredData);
                    }

                    if (!searchTerm || searchTerm.length === 0) {
                        setTotalPages(Math.ceil(totalCount / limit));
                    }

                    console.log(data);
                }
            } else {
                return;
            }
        } else {
            console.log('User is not authenticated');
        }
    };

    useEffect(() => {
        getAdverts();
        fetchFavorites();
    }, [userData]);

    useEffect(() => {
        getAdverts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [searchTerm]);

    useEffect(() => {
        const setUser = async () => {
            if (currentUser) {
                try {
                    const response = await axios.get(`${host}/users/email?email=${currentUser.email}`);
                    setUserData(response.data);
                    setDisplayName(response.data.name);
                    setPhoneNumber(response.data.phone);
                    setImage(response.data.picture);
                } catch (error) {
                    console.error('Error getting user data:', error);
                }
            }
        }

        setUser();
    }, [currentUser]);

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [sortValue]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${host}/categories`);

                setCategories(response.data);
                setCategories([{ id: '', name: 'Всі категорії', picture: '', subcategories: [] }, ...response.data]);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [category]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <StyledButton
                    key={i}
                    text={i.toString()}
                    type={currentPage === i ? 'contained' : 'outlined'}
                    onClick={() => handlePageChange(i)}
                />
            );
        }
        return buttons;
    };

    const handleEditClick = () => {
        setIsEditable((prevState) => !prevState);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleNameChange = (value: string) => {
        setDisplayName(value);
    }

    const handlePhoneChange = (value: string) => {
        setPhoneNumber(value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setPrevImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleUpdate = async () => {
        if (!currentUser) return;

        if (displayName.length < 0 || phoneNumber.length < 0) return;

        try {
            let downloadURL = image;

            if (typeof image !== 'string') {
                const storage = getStorage();
                const storageRef = ref(storage, `profileImages/${currentUser.uid}`);

                await uploadBytes(storageRef, image as File);
                downloadURL = await getDownloadURL(storageRef);
            }

            await updateProfile(currentUser, {
                displayName: displayName,
                photoURL: typeof downloadURL === 'string' ? downloadURL : ''
            });

            await axios.put(`${host}/users`, {
                id: userData.id,
                name: displayName,
                phone: phoneNumber,
                picture: downloadURL
            })

            console.log('User profile updated successfully');
            setIsEditable(true);
            window.location.reload();
        } catch (err) {
            console.error('Error getting user data:', err);
        }
    }

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Ви впевнені що хочете вийти?');

        if (!confirmLogout) {
            return;
        }

        try {
            await auth.signOut();
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            window.location.href = '/registration';
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleDeleteClick = (adId: string) => {
        setSelectedAd(adId);
        setOpen(true);
    };

    const deleteAdvert = async (adId: string | null) => {
        if (!adId) return;

        try {
            await axios.delete(`${host}/adverts/${adId}`);
            console.log('Advert deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting advert:', error);
        }
    };

    const handleConfirmDelete = () => {
        if (selectedAd) {
            deleteAdvert(selectedAd);
            setOpen(false);
            setSelectedAd(null);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAd(null);
    };

    const handleSortChange = (value: string) => {
        setSortValue(value);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
    }

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                backgroundColor: '#ebeef5',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '1371px',
                    height: '100%',
                }}>
                    <Box sx={{ marginTop: '80px', marginBottom: '40px', display: 'flex', gap: '20px', flexDirection: 'row', justifyContent: 'end' }}>
                        <StyledButton text='Редагувати профіль' type='contained' secondaryColor='white' icon={PenFluentIcon} onClick={handleEditClick} />
                        <StyledButton text='Вийти' type='contained' secondaryColor='white' primaryColor='red' onClick={() => {
                            handleLogout();
                        }} />

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                        {!isEditable ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <ImageComponent src={typeof prevImage === 'string' ? prevImage : 'https://via.placeholder.com/204'} borderRadius='204px' alt='user' width='204px' height='204px' />
                                <StyledButton text="Вибрати фото" type="outlined" onClick={() => document.getElementById('fileInput')?.click()} />
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageChange(e)}
                                    accept="image/*"
                                />
                            </Box>
                        ) : (
                            userData ? (
                                <ImageComponent src={typeof image === 'string' ? image : 'https://via.placeholder.com/204'} borderRadius='204px' alt='user' width='204px' height='204px' />
                            ) : (
                                <p>Loading user data...</p>
                            )
                        )}

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                                {userData ? (
                                    <StyledInput value={displayName ?? "Ім'я не вказане"} label="Ім'я" widthType='middle' disabled={isEditable} onChange={(e) => { handleNameChange(e.target.value) }} />
                                ) : (
                                    <p>Loading user data...</p>
                                )}
                                {userData ? (
                                    <StyledInput value={phoneNumber ?? 'Номер телефону не вказаний'} label="Номер телефону" widthType='middle' disabled={isEditable} onChange={(e) => { handlePhoneChange(e.target.value) }} />
                                ) : (
                                    <p>Loading user data...</p>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                                {userData ? (
                                    <StyledInput value={userData?.email || 'Електронна пошта не вказана'} label="Електронна пошта" widthType='middle' disabled={true} />
                                ) : (
                                    <p>Loading user data...</p>
                                )}
                            </Box>
                            {
                                !isEditable ? (
                                    <StyledButton text='Зберегти' type='contained' onClick={handleUpdate} />
                                ) : (null)
                            }
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                        <Box sx={{
                            display: 'flex',
                            marginTop: '160px',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                            <StyledLabel text='Ваші оголошення' type='head' textType='head' textColor='black' />
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '60px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <StyledLabel text='Ваш рахунок: 0 грн' type='primary' textType='small' />
                                        <StyledLabel text='Доступний баланс: 0 грн' type='primary' textType='small' />
                                    </Box>
                                    <StyledIconButton icon={IInCircleIcon} />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                                    <StyledButton text='Поповнити гаманець' type='contained' />
                                    <StyledButton text='Купити пакет' type='contained' />
                                </Box>
                            </Box>
                        </Box>
                        <Link to='#'>Дізнатись більше</Link>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '42px',
                        marginTop: '80px',
                    }}>
                        <StyledButton text='Мої оголошення' type='outlined' />
                        <StyledButton text='Повідомлення' type='outlined' />
                        <StyledButton text='Платежі та рахунок DDX' type='outlined' />
                        <StyledButton text='Робота на DDX' type='outlined' />
                        <StyledButton text='DDX доставка' type='outlined' />
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '40px',
                    width: '100%',
                    backgroundColor: 'rgba(0, 37, 121, 0.08)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '1400px',
                        height: '100%',
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '38px', gap: '30px' }}>
                            <StyledButton text='Активні' type='outlined' />
                            <StyledButton text='Неактивні' type='outlined' />
                            <StyledButton text='Очікуючі' type='outlined' />
                            <StyledButton text='Неоплачені' type='outlined' />
                            <StyledButton text='Відхилені' type='outlined' />
                            <StyledButton text='Архів' type='outlined' />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '75px', gap: '60px' }}>
                            <StyledInput value={searchTerm ?? 'Заголовок'} iconEnd={SearchIcon} widthType='small' onChange={(e) => { handleSearchChange(e.target.value) }} />
                            <FormControl fullWidth sx={{ width: '267px' }}>
                                <InputLabel id='category' sx={{ fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400' }}>Категорія</InputLabel>
                                <Select labelId='category' label='Категорія' sx={{ height: '50px', borderRadius: '10px', border: '1px solid #000', background: 'white', textAlign: 'left', fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400' }} value={category} onChange={(e) => handleCategoryChange(e.target.value as string)}>
                                    {categories.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item.id}
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
                            <FormControl fullWidth sx={{ width: '267px' }}>
                                <InputLabel id='sortValue'>Сортувати</InputLabel>
                                <Select labelId='sortValue' label='Сортувати' sx={{ height: '50px', borderRadius: '10px', border: '1px solid #000', background: 'white', textAlign: 'left', fontFamily: 'Nunito', fontSize: '18px' }} value={sortValue} onChange={(e) => handleSortChange(e.target.value as string)}>
                                    {sortValues.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item}
                                            sx={{
                                                fontFamily: "Nunito",
                                                fontSize: "18px",
                                                fontWeight: '400',
                                                color: '#737070'
                                            }}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '100px', width: '100%', marginBottom: '40px' }}>
                            {adverts.length === 0 ? (
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '831px', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
                                        <ImageComponent src='https://via.placeholder.com/363' alt='user' width='363px' height='321px' />
                                        <StyledLabel text='Активні оголошення відображаються тут до закінчення їх терміну дії' type='primary' textType='middle' textColor='black' />
                                        <StyledLabel text='Ці оголошення доступні для перегляду всім і стають неактивними через 30 днів після їх активації' type='primary' textType='small' textColor='black' />
                                        <StyledButton text='Додати оголошення' type='contained' onClick={() => { window.location.href = '/advert-create' }} />
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    flexWrap: 'wrap'
                                }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: "24px", flexWrap: "wrap", width: '100%', marginBottom: '40px' }}>
                                        {adverts.length === 0 ? (
                                            <p>No adverts available.</p>
                                        ) : (
                                            adverts.map((advert) => (
                                                <StyledAdvert
                                                    key={advert.id}
                                                    title={advert.name}
                                                    location={advert.location}
                                                    date={advert.creationDate}
                                                    image={advert.pictures[0]}
                                                    price={advert.price}
                                                    isFavorite={favoriteAdvertsIds.includes(advert.id)}
                                                    onClick={
                                                        () => {
                                                            window.location.href = `/advert/${advert.id}`;
                                                        }
                                                    }
                                                    onDelete={() => handleDeleteClick(advert.id)}
                                                    onEdit={
                                                        () => {
                                                            window.location.href = `/advert-edit/${advert.id}`;
                                                        }
                                                    }
                                                    onHeartClick={() => {
                                                        handleHeartIconClick(advert.id);
                                                    }} />
                                            ))
                                        )}
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', marginTop: '20px', gap: "5px" }}>
                                        {renderPaginationButtons()}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">Підтвердження видалення</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-description">
                        Ви дійсно хочете видалити це оголошення? Цю дію не можна буде відмінити.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Скасувати
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        Видалити
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledEngineProvider >
    );
};

export {
    ProfilePage,
}