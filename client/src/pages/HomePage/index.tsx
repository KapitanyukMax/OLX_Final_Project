import React, { useEffect, useState } from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import { StyledEngineProvider } from "@mui/material/styles";
import StyledButton from "../../components/button";
import StyledLabel from "../../components/lable";
import CarIcon from "../../components/icons/car";
import BusinessManIcon from "../../components/icons/businessman";
import GeneratorIcon from "../../components/icons/generator";
import TransportSparePartIcon from "../../components/icons/transportSparePart";
import HeartFilledIcon from "../../components/icons/heartFilled";
import ChildrenToyIcon from "../../components/icons/childrenToy";
import PhoneIcon from "../../components/icons/phone";
import WorkIcon from "../../components/icons/work";
import CatIcon from "../../components/icons/cat";
import SportsIcon from "../../components/icons/sports";
import ClothesIcon from "../../components/icons/clothes";
import HandIcon from "../../components/icons/hand";
import CalendarIcon from "../../components/icons/calendar";
import HomeAndGardenIcon from "../../components/icons/homeAndGarden";
import RealEstateAgentIcon from "../../components/icons/realEstateAgent";
import FurnitureIcon from "../../components/icons/furniture";
import { List, ListItem, Typography } from "@mui/material";
import { StyledAdvert } from "../../components/advert";
import InformationSection from "../../components/informationSection";
import { Search } from "../../components/search";
import { advertType } from "../../interfaces/advertType";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { fetchAdverts } from "../../functions/fetchAdverts";

const HomePage: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [adverts, setAdverts] = useState<advertType[]>([]);
    const [vipAdverts, setVipAdverts] = useState<advertType[]>([]);
    const [topAdverts, setTopAdverts] = useState<advertType[]>([]);
    const [favoriteAdvertsIds, setFavoriteAdvertsIds] = useState<string[]>([]);

    const host = import.meta.env.VITE_HOST;

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

    useEffect(() => {
        getAdverts();
        fetchFavorites();
    }, [userData]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            console.log(user?.uid);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
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

        setUser();
    }, [currentUser]);

    const getAdverts = async (limit: number = 8) => {
        const response = await fetchAdverts({ limit, startAfter: null });

        const data = response.data.adverts;

        if (response && response.status === 200 && data?.length > 0) {
            setAdverts(data);
        }
    };

    const getVipAdverts = async (limit: number = 4) => {
        const response = await fetchAdverts({ limit, startAfter: null, isVip: true });

        const data = response.data.adverts;

        if (response && response.status === 200 && data?.length > 0) {
            setVipAdverts(data);
        }
    };

    const getTopAdverts = async (limit: number = 8) => {
        const response = await fetchAdverts({ limit, startAfter: null, isTop: true });

        const data = response.data.adverts;

        if (response && response.status === 200 && data?.length > 0) {
            setTopAdverts(data);
        }
    };

    const onSearch = (searchTerm: string = '', city: string = '') => {
        const searchTermParams = searchTerm.length > 0 ? `searchTerm=${searchTerm}&` : '';
        const cityParams = city.length > 0 ? `city=${city}&` : '';

        window.location.href = `/adverts?${searchTermParams}${cityParams}`;
    };

    useEffect(() => {
        getAdverts();
        getVipAdverts();
        getTopAdverts();
    }, []);

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
                    alignItems: 'center',
                    width: '1382px',
                    marginTop: '60px',
                    marginBottom: '90px'
                }}>
                    <Search onSearch={onSearch} />

                    <Box sx={{ marginTop: '120px' }}>
                        <StyledLabel text="Розділи на сервісі DDX" type='head' textType='head' textColor='black' />
                    </Box>

                    <Box sx={{
                        marginTop: '50px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        rowGap: '47px',
                        columnGap: '24px'
                    }}>
                        <StyledButton text='Транспорт' type='category' icon={CarIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Транспорт';
                            }} />
                        <StyledButton text='Запчастини для транспорту' type='category' icon={TransportSparePartIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Запчастини для транспорту';
                            }} />
                        <StyledButton text='Електроніка для блекауту' type='category' icon={GeneratorIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Електроніка для блекауту';
                            }} />
                        <StyledButton text='Бізнес та послуги' type='category' icon={BusinessManIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Бізнес та послуги';
                            }} />
                        <StyledButton text='Допомога' type='category' icon={HeartFilledIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Допомога';
                            }} />
                        <StyledButton text='Дитячі товари' type='category' icon={ChildrenToyIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Дитячі товари';
                            }} />
                        <StyledButton text='Електроніка' type='category' icon={PhoneIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Електроніка';
                            }} />
                        <StyledButton text='Робота' type='category' icon={WorkIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Робота';
                            }} />
                        <StyledButton text='Оренда та прокат' type='category' icon={CalendarIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Оренда та прокат';
                            }} />
                        <StyledButton text='Дім і сад' type='category' icon={HomeAndGardenIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Дім і сад';
                            }} />
                        <StyledButton text='Нерухомість' type='category' icon={RealEstateAgentIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Нерухомість';
                            }} />
                        <StyledButton text="Меблі та інтер'єр" type='category' icon={FurnitureIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Дім і сад';
                            }} />
                        <StyledButton text='Тварини' type='category' icon={CatIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Тварини';
                            }} />
                        <StyledButton text='Хобі, спорт' type='category' icon={SportsIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Хобі, спорт';
                            }} />
                        <StyledButton text='Одяг та аксесуари' type='category' icon={ClothesIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Одяг та аксесуари';
                            }} />
                        <StyledButton text='Віддам безкоштовно' type='category' icon={HandIcon}
                            onClick={() => {
                                window.location.href = '/adverts/Віддам безкоштовно';
                            }} />
                    </Box>

                    <Box sx={{ marginTop: '120px' }}>
                        <Typography sx={{
                            display: 'inline',
                            color: 'var(--green)',
                            margin: 0,
                            padding: 0,
                            fontSize: '36px',
                            fontFamily: 'Nunito, sans-serif'
                        }}>VIP</Typography>
                        <Typography sx={{
                            display: 'inline',
                            color: 'black',
                            margin: 0,
                            padding: 0,
                            fontSize: '36px',
                            fontFamily: 'Nunito, sans-serif'
                        }}>-оголошення</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: '24px',
                        flexWrap: 'wrap',
                        marginTop: '70px'
                    }}>
                        {vipAdverts.map((advert: advertType) => {
                            return (
                                <StyledAdvert key={advert.id} isFavorite={favoriteAdvertsIds.includes(advert.id)} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} isVIP={true} currency={advert.currencyId} onClick={
                                    () => {
                                        window.location.href = `/advert/${advert.id}`;
                                    }
                                }
                                    onHeartClick={() => handleHeartIconClick(advert.id)} />
                            );
                        })}
                    </Box>

                    <Box sx={{
                        marginTop: '65px'
                    }}>
                        <StyledButton text='Більше' type='outlined' className='button-medium'
                            onClick={() => {
                                window.location.href = '/adverts-vip';
                            }} />
                    </Box>

                    <Box sx={{ marginTop: '120px' }}>
                        <Typography sx={{
                            display: 'inline',
                            color: 'var(--green)',
                            margin: 0,
                            padding: 0,
                            fontSize: '36px',
                            fontFamily: 'Nunito, sans-serif'
                        }}>Top</Typography>
                        <Typography sx={{
                            display: 'inline',
                            color: 'black',
                            margin: 0,
                            padding: 0,
                            fontSize: '36px',
                            fontFamily: 'Nunito, sans-serif'
                        }}>-оголошення</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: '24px',
                        flexWrap: 'wrap',
                        marginTop: '70px'
                    }}>
                        {topAdverts.map((advert: advertType) => {
                            return (
                                <StyledAdvert key={advert.id} isFavorite={favoriteAdvertsIds.includes(advert.id)} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} isTOP={true} currency={advert.currencyId} onClick={
                                    () => {
                                        window.location.href = `/advert/${advert.id}`;
                                    }
                                }
                                    onHeartClick={() => handleHeartIconClick(advert.id)} />
                            );
                        })}
                    </Box>

                    <Box sx={{
                        marginTop: '65px'
                    }}>
                        <StyledButton text='Більше' type='outlined' className='button-medium'
                            onClick={() => {
                                window.location.href = '/adverts-top';
                            }} />
                    </Box>

                    <Box sx={{
                        marginTop: '120px'
                    }}>
                        <InformationSection />
                    </Box>

                    <Typography sx={{
                        display: 'block',
                        color: 'black',
                        marginTop: '120px',
                        padding: 0,
                        fontSize: '36px',
                        fontFamily: 'Nunito, sans-serif'
                    }}>Нові оголошення</Typography>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: '24px',
                        flexWrap: 'wrap',
                        marginTop: '70px'
                    }}>
                        {adverts.map((advert: advertType) => {
                            return (
                                <StyledAdvert key={advert.id} isFavorite={favoriteAdvertsIds.includes(advert.id)} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} currency={advert.currencyId} onClick={
                                    () => {
                                        window.location.href = `/advert/${advert.id}`;
                                    }
                                }
                                    onHeartClick={() => { handleHeartIconClick(advert.id) }} />
                            );
                        })}
                    </Box>

                    <Box sx={{
                        marginTop: '65px'
                    }}>
                        <StyledButton text='Більше' type='outlined' className='button-medium'
                            onClick={() => {
                                window.location.href = '/adverts';
                            }} />
                    </Box>

                    <Typography sx={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        color: 'black',
                        marginTop: '120px',
                        fontSize: '26px',
                        fontFamily: 'Nunito, sans-serif',
                    }}>
                        Популярні запити
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        marginTop: '50px',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '34px'
                    }}>
                        <StyledButton text='Велосипед' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Велосипед');
                            }} />

                        <StyledButton text='Купальник' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Купальник');
                            }} />

                        <StyledButton text='Кошенята' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Кошенята');
                            }} />

                        <StyledButton text='Квартира' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Квартира');
                            }} />

                        <StyledButton text='Генератор' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Генератор');
                            }} />

                        <StyledButton text='Холодильник' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Холодильник');
                            }} />

                        <StyledButton text='Акваріум' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Акваріум');
                            }} />

                        <StyledButton text='Павербанк' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Павербанк');
                            }} />

                        <StyledButton text='Дерева' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Дерева');
                            }} />

                        <StyledButton text='Ноутбук' type='outlined' className='button-fit'
                            onClick={() => {
                                onSearch('Ноутбук');
                            }} />
                    </Box>

                    <Typography sx={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        color: 'black',
                        marginTop: '120px',
                        fontSize: '26px',
                        fontFamily: 'Nunito, sans-serif',
                    }}>
                        Популярні міста
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        marginTop: '50px',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '34px'
                    }}>
                        <StyledButton text='Київ' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Київ');
                            }} />

                        <StyledButton text='Рівне' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Рівне');
                            }} />

                        <StyledButton text='Львів' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Львів');
                            }} />

                        <StyledButton text='Хмельницький' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Хмельницький');
                            }} />

                        <StyledButton text='Кривий Ріг' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Кривий Ріг');
                            }} />

                        <StyledButton text='Харків' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Харків');
                            }} />

                        <StyledButton text='Дніпро' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Дніпро');
                            }} />

                        <StyledButton text='Тернопіль' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Тернопіль');
                            }} />

                        <StyledButton text='Івано-Франківськ' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Івано-Франківськ');
                            }} />

                        <StyledButton text='Черкаси' type='outlined' className='button-fit'
                            onClick={() => {
                                console.log('Черкаси');
                            }} />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: '30px',
                        marginTop: '120px',
                        padding: 0
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '50px'
                        }}>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '26px',
                                fontFamily: 'Nunito, sans-serif',
                            }}>
                                Про нас
                            </Typography>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif',
                            }}>
                                DDX — це сучасний і зручний сервіс для тих, хто хоче легко і швидко знаходити, купувати та продавати різноманітні товари та послуги. Наша команда складається з досвідчених професіоналів, які прагнуть створити найкращий досвід для наших користувачів
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '50px'
                        }}>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '26px',
                                fontFamily: 'Nunito, sans-serif',
                            }}>
                                Наша місія
                            </Typography>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif',
                            }}>
                                Наша місія — забезпечити простий, безпечний та ефективний спосіб обміну товарами та послугами для людей у всіх куточках України. Ми віримо, що кожен товар і послуга може знайти свого покупця, а кожен продавець - свого клієнта
                            </Typography>
                        </Box>
                    </Box>

                    <Typography sx={{
                        display: 'block',
                        textAlign: 'left',
                        color: 'black',
                        width: '100%',
                        marginTop: '120px',
                        fontSize: '26px',
                        fontFamily: 'Nunito, sans-serif'
                    }}>
                        Що ми пропонуємо?
                    </Typography>

                    <List sx={{
                        width: '1034px',
                        alignSelf: 'flex-start',
                        marginTop: '50px',
                        color: 'var(--blue)',
                        listStyleType: 'disk',
                        paddingLeft: '25px',
                        '& li': {
                            display: 'list-item',
                            listStyleType: 'disc'
                        }
                    }}>
                        <ListItem sx={{
                            marginBottom: '20px'
                        }}>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                Широкий асортимент товарів та послуг:
                            </Typography>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                &nbsp;Від електроніки до одягу, від автомобілів до нерухомості — у нас ви знайдете все, що вам потрібно
                            </Typography>
                        </ListItem>

                        <ListItem sx={{
                            marginBottom: '20px'
                        }}>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                Зручний інтерфейс:
                            </Typography>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                &nbsp;Інтуїтивно зрозумілий дизайн та зручна навігація роблять процес купівлі та продажу легким і приємним
                            </Typography>
                        </ListItem>

                        <ListItem sx={{
                            marginBottom: '20px'
                        }}>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                Безпека та надійність:
                            </Typography>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                &nbsp;Ми ретельно перевіряємо всі оголошення, щоб забезпечити безпечні угоди для наших користувачів
                            </Typography>
                        </ListItem>

                        <ListItem sx={{
                            marginBottom: '20px'
                        }}>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                Підтримка клієнтів:
                            </Typography>
                            <Typography sx={{
                                display: 'inline',
                                textAlign: 'left',
                                color: 'black',
                                fontSize: '18px',
                                fontFamily: 'Nunito, sans-serif'
                            }}>
                                &nbsp;Наша служба підтримки завжди готова допомогти вам вирішити будь-які питання та надати необхідну консультацію
                            </Typography>
                        </ListItem>
                    </List>

                    <Typography sx={{
                        display: 'block',
                        textAlign: 'left',
                        color: 'black',
                        width: '100%',
                        marginTop: '120px',
                        fontSize: '26px',
                        fontFamily: 'Nunito, sans-serif'
                    }}>
                        Приєднуйтесь до нас!
                    </Typography>

                    <Typography sx={{
                        display: 'block',
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                        color: 'black',
                        width: '900px',
                        marginTop: '50px',
                        fontSize: '18px',
                        fontFamily: 'Nunito, sans-serif'
                    }}>
                        Зареєструйтесь на DDX вже сьогодні і почніть користуватися всіма перевагами нашого сервісу. Створюйте оголошення, знаходьте вигідні пропозиції та здійснюйте безпечні угоди — все це на DDX!
                    </Typography>

                    <Typography sx={{
                        display: 'block',
                        alignSelf: 'flex-start',
                        textAlign: 'left',
                        color: 'black',
                        width: '900px',
                        marginTop: '20px',
                        fontSize: '18px',
                        fontFamily: 'Nunito, sans-serif'
                    }}>
                        Дякуємо, що обираєте нас. Разом ми створюємо найкращий онлайн-майданчик для купівлі, продажу та обміну товарами та послугами в Україні
                    </Typography>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    HomePage
};
