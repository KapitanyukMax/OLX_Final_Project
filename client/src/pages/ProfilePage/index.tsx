import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebaseConfig';
import axios from 'axios';
import { User, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Header } from '../../components/header';
import { StyledEngineProvider, Box } from '@mui/material';
import StyledFooter from '../../components/footer';
import StyledButton from '../../components/button';
import PenFluentIcon from '../../components/icons/penFluent';
import ImageComponent from '../../components/image';
import { StyledInput } from '../../components/input';
import StyledLabel from '../../components/lable';
import StyledIconButton from '../../components/iconButton';
import IInCircleIcon from '../../components/icons/iInCircle';
import { Link } from 'react-router-dom';
import { StyledDropdown } from '../../components/dropdown';
import SearchIcon from '../../components/icons/search';
import { StyledAdvert } from '../../components/advert';

const ProfilePage: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isEditable, setIsEditable] = useState(true);
    const [adverts, setAdverts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [displayName, setDisplayName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [image, setImage] = useState<string | File>('');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            console.log(user?.uid);
        });

        return () => unsubscribe();
    }, []);

    const getAdverts = async (page: number = 1, searchTerm?: string) => {
        if (userData) {
            let response;
            const limit = 8; // Кількість оголошень на сторінці
            let startAfterParam = page > 1 ? adverts[adverts.length - 1].id : null;

            // Якщо є пошуковий термін, скидаємо пагінацію і шукаємо по всіх оголошеннях
            if (searchTerm && searchTerm.length > 0) {
                startAfterParam = null; // Ігноруємо пагінацію
                response = await axios.get(`http://localhost:5000/adverts/userId?userId=${userData.id}&searchTerm=${searchTerm}`);
            } else {
                // Якщо пошуковий термін відсутній, виконуємо запит з пагінацією
                response = await axios.get(`http://localhost:5000/adverts/userId?userId=${userData.id}&limit=${limit}&startAfter=${startAfterParam}`);
            }

            if (response) {
                const { adverts: data, totalCount } = response.data;
                setAdverts(data);

                // Оновлюємо кількість сторінок тільки для звичайних запитів (без пошуку)
                if (!searchTerm || searchTerm.length === 0) {
                    setTotalPages(Math.ceil(totalCount / limit));
                }

                console.log(data);
            } else {
                return;
            }
        } else {
            console.log('User is not authenticated');
        }
    };

    useEffect(() => {
        getAdverts();
    }, [userData]);

    useEffect(() => {
        getAdverts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [searchTerm]);

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

    useEffect(() => {
        const setUser = async () => {
            if (currentUser) {
                try {
                    const response = await axios.get(`http://localhost:5000/users/email?email=${currentUser.email}`);
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
        }
    };

    const handleUpdate = async () => {
        if (!currentUser) return;

        if (displayName.length < 0 || phoneNumber.length < 0) return;


        try {
            let downloadURL = image; // Keep the current image URL by default.

            // Check if a new file has been selected (by checking if `image` is a File object).
            if (typeof image !== 'string') {
                // Upload the image to Firebase Storage if a new file is selected.
                const storage = getStorage();
                const storageRef = ref(storage, `profileImages/${currentUser.uid}`);

                await uploadBytes(storageRef, image as File);
                downloadURL = await getDownloadURL(storageRef);
            }

            await updateProfile(currentUser, {
                displayName: displayName,
                photoURL: typeof downloadURL === 'string' ? downloadURL : ''
            });

            await axios.put('http://localhost:5000/users', {
                id: userData.id,
                name: displayName,
                phone: phoneNumber,
                picture: downloadURL
            })

            console.log('User profile updated successfully');
            setIsEditable(true);
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
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <StyledEngineProvider injectFirst>
            <Header />
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
                            window.location.href = '/registration';
                        }} />

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                        {!isEditable ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <StyledButton text="Вибрати фото" type="outlined" onClick={() => document.getElementById('fileInput')?.click()} />
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{ display: 'none' }} // Приховуємо цей елемент
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
                                {/* <StyledInput value='Рівненська область' label="Регіон" widthType='middle' disabled={isEditable} /> */}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                                {/* <StyledInput value='Ромашко' label="Прізвище" widthType='middle' disabled={isEditable} /> */}
                                {userData ? (
                                    <StyledInput value={userData?.email || 'Електронна пошта не вказана'} label="Електронна пошта" widthType='middle' disabled={isEditable} />
                                ) : (
                                    <p>Loading user data...</p>
                                )}
                                {/* <StyledInput value='Рівне' label="Назва населеного пункту" widthType='middle' disabled={isEditable} /> */}
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
                        <StyledButton text='Налаштуваня' type='outlined' />
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
                            <StyledDropdown values={[]} placeholder='Додати фільтр' type='small' />
                            <StyledInput value={searchTerm ?? 'Заголовок, ID'} iconEnd={SearchIcon} widthType='small' onChange={(e) => { handleSearchChange(e.target.value) }} />
                            <StyledDropdown values={[]} placeholder='Категорія' />
                            <StyledDropdown values={[]} placeholder='Сортувати' />
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
                                                <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} onClick={
                                                    () => {
                                                        window.location.href = `/advert/${advert.id}`;
                                                    }
                                                } />
                                            ))
                                        )}
                                    </Box>

                                    {/* Pagination Buttons */}
                                    <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', marginTop: '20px', gap: "5px" }}>
                                        {renderPaginationButtons()}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <StyledFooter />
        </StyledEngineProvider >
    );
};

export {
    ProfilePage,
}