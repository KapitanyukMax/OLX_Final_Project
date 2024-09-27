import React, { useEffect, useState } from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import { StyledEngineProvider } from "@mui/material/styles";
import { Header } from "../../components/header";
import StyledFooter from '../../components/footer';
import { StyledInput } from "../../components/input";
import SearchIcon from '@mui/icons-material/Search';
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

const HomePage: React.FC = () => {
    const StyledSearchIcon: React.FC = () => (
        <SearchIcon sx={{ color: "black" }} />
    );

    const [adverts, setAdverts] = useState([]);
    const [vipAdverts, setVipAdverts] = useState([]);
    const [topAdverts, setTopAdverts] = useState([]);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const getAdverts = async (search?: string, limit?: number) => {
        limit ??= 8;
        let response;
        if (search && search.length > 0) {
            response = await axios.get(`http://localhost:5000/adverts?limit=${limit}?searchTerm=${search}`);
        }
        else {
            response = await axios.get(`http://localhost:5000/adverts?limit=${limit}`);
        }
        if (response) {
            const data = response.data.adverts;
            setAdverts(data);
            console.log(data);
        }
    };

    const getVipAdverts = async (limit?: number) => {
        limit ??= 4;
        const response = await axios.get(`http://localhost:5000/adverts/vip?limit=${limit}`);
        if (response) {
            const data = response.data.adverts;
            setVipAdverts(data);
            console.log(data);
        }
    };

    const getTopAdverts = async (limit?: number) => {
        limit ??= 4;
        const response = await axios.get(`http://localhost:5000/adverts/top?limit=${limit}`);
        if (response) {
            const data = response.data.adverts;
            setTopAdverts(data);
            console.log(data);
        }
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleSearchClick = () => {
        if (searchTerm) {
            setIsSearching(true);
            getAdverts(searchTerm || '', 20);
        }
    }

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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '60px',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <StyledInput value={searchTerm || 'Що шукаємо?'} iconEnd={StyledSearchIcon} width="522px" onChange={handleSearchChange} />
                        <StyledInput value='Вся Україна' iconEnd={StyledSearchIcon} width="254px" />
                        <StyledInput value='Місто/село' iconEnd={StyledSearchIcon} width="254px" />
                        <StyledButton text='Пошук' type='contained' primaryColor='var(--dark-blue)' hoverColor='black' className='button-small' onClick={handleSearchClick} />
                    </Box>

                    {isSearching
                        ? (<>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '24px',
                                flexWrap: 'wrap',
                                marginTop: '70px'
                            }}>
                                {adverts.map((advert: any) => {
                                    return (
                                        <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} onClick={
                                            () => {
                                                window.location.href = `/advert/${advert.id}`;
                                            }
                                        } />
                                    );
                                })}
                            </Box>
                        </>)
                        : (<>
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
                                <StyledButton text='Транспорт' type='category' icon={CarIcon} />
                                <StyledButton text='Запчастини для транспорту' type='category' icon={TransportSparePartIcon} />
                                <StyledButton text='Електроніка для блекауту' type='category' icon={GeneratorIcon} />
                                <StyledButton text='Бізнес та послуги' type='category' icon={BusinessManIcon} />
                                <StyledButton text='Допомога' type='category' icon={HeartFilledIcon} />
                                <StyledButton text='Дитячі товари' type='category' icon={ChildrenToyIcon} />
                                <StyledButton text='Електроніка' type='category' icon={PhoneIcon} />
                                <StyledButton text='Робота' type='category' icon={WorkIcon} />
                                <StyledButton text='Оренда та прокат' type='category' icon={CalendarIcon} />
                                <StyledButton text='Дім і сад' type='category' icon={HomeAndGardenIcon} />
                                <StyledButton text='Нерухомість' type='category' icon={RealEstateAgentIcon} />
                                <StyledButton text="Меблі та інтер'єр" type='category' icon={FurnitureIcon} />
                                <StyledButton text='Тварини' type='category' icon={CatIcon} />
                                <StyledButton text='Хобі, спорт' type='category' icon={SportsIcon} />
                                <StyledButton text='Одяг та аксесуари' type='category' icon={ClothesIcon} />
                                <StyledButton text='Віддам безкоштовно' type='category' icon={HandIcon} />
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
                                flexDirection: 'row',
                                gap: '24px',
                                flexWrap: 'wrap',
                                marginTop: '70px'
                            }}>
                                {vipAdverts.map((advert: any) => {
                                    return (
                                        <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} isVIP={true} onClick={
                                            () => {
                                                window.location.href = `/advert/${advert.id}`;
                                            }
                                        } />
                                    );
                                })}
                            </Box>

                            <Box sx={{
                                marginTop: '65px'
                            }}>
                                <StyledButton text='Більше' type='outlined' className='button-medium'
                                    onClick={() => {
                                        window.location.href = '/components-preview';
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
                                flexDirection: 'row',
                                gap: '24px',
                                flexWrap: 'wrap',
                                marginTop: '70px'
                            }}>
                                {topAdverts.map((advert: any) => {
                                    return (
                                        <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} isTOP={true} onClick={
                                            () => {
                                                window.location.href = `/advert/${advert.id}`;
                                            }
                                        } />
                                    );
                                })}
                            </Box>

                            <Box sx={{
                                marginTop: '65px'
                            }}>
                                <StyledButton text='Більше' type='outlined' className='button-medium'
                                    onClick={() => {
                                        window.location.href = '/components-preview';
                                    }} />
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
                                flexDirection: 'row',
                                gap: '24px',
                                flexWrap: 'wrap',
                                marginTop: '70px'
                            }}>
                                {adverts.map((advert: any) => {
                                    return (
                                        <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} onClick={
                                            () => {
                                                window.location.href = `/advert/${advert.id}`;
                                            }
                                        } />
                                    );
                                })}
                            </Box>

                            <Box sx={{
                                marginTop: '65px'
                            }}>
                                <StyledButton text='Більше' type='outlined' className='button-medium'
                                    onClick={() => {
                                        window.location.href = '/components-preview';
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
                                        setSearchTerm('Велосипед');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Купальник' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Купальник');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Кошенята' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Кошенята');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Квартира' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Квартира');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Генератор' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Генератор');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Холодильник' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Холодильник');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Акваріум' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Акваріум');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Павербанк' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Павербанк');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Дерева' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Дерева');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
                                    }} />

                                <StyledButton text='Ноутбук' type='outlined' className='button-fit'
                                    onClick={() => {
                                        setSearchTerm('Ноутбук');
                                        setIsSearching(true);
                                        getAdverts(searchTerm || '', 20);
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
                        </>)
                    }
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    HomePage
};
