import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebaseConfig';
import axios from 'axios';
import { User, onAuthStateChanged } from 'firebase/auth';
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
    const [isEditable, setIsEditable] = useState(true);
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getAdverts = async () => {
            if (currentUser) {
                const response = await axios.get(`http://localhost:5000/adverts?userId=${currentUser.uid}`);
                if (response) {
                    const data = response.data.adverts;
                    setAdverts(data);
                    console.log(data);
                } else {
                    return;
                }
            } else {
                console.log('User is not authenticated');
            }
        }

        getAdverts();
    }, [currentUser]);

    const handleEditClick = () => {
        setIsEditable((prevState) => !prevState);
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
                    <Box sx={{ marginTop: '80px', marginBottom: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                        <StyledButton text='Редагувати профіль' type='contained' secondaryColor='black' icon={PenFluentIcon} onClick={handleEditClick} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                        <ImageComponent src='https://via.placeholder.com/204' alt='user' width='204px' height='204px' />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                                <StyledInput value={currentUser?.displayName ?? ''} label="Ім'я" widthType='middle' disabled={isEditable} />
                                <StyledInput value={currentUser?.phoneNumber ?? ''} label="Номер телефону" widthType='middle' disabled={isEditable} />
                                <StyledInput value='Рівненська область' label="Регіон" widthType='middle' disabled={isEditable} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                                <StyledInput value='Ромашко' label="Прізвище" widthType='middle' disabled={isEditable} />
                                <StyledInput value={currentUser?.email ?? ''} label="Електронна пошта" widthType='middle' disabled={isEditable} />
                                <StyledInput value='Рівне' label="Назва населеного пункту" widthType='middle' disabled={isEditable} />
                            </Box>
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
                            <StyledInput value='Заголовок, ID' iconEnd={SearchIcon} widthType='small' />
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
                                    flexDirection: 'row',
                                    gap: '30px',
                                    flexWrap: 'wrap'
                                }}>
                                    {adverts.map((advert: any) => {
                                        return (
                                            <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} onClick={
                                                () => {
                                                    console.log('Advert clicked');
                                                }
                                            } />
                                        );
                                    })}
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