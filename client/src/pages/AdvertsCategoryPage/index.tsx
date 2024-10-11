import { Box, Button, Link, MenuItem, Select, Typography } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search } from '../../components/search';
import { StyledAdvert } from '../../components/advert';
import { categoryType, subcategoryType } from '../../interfaces/categoryTypes';
import { advertType } from '../../interfaces/advertType';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import { currencyType } from '../../interfaces/currencyType';
import { StyledCheckBox } from '../../components/checkBox';
import { fetchAdverts } from '../../functions/fetchAdverts';

const AdvertsCategoryPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();

    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState<categoryType | undefined>();
    const [categories, setCategories] = useState<categoryType[]>();
    const [subcategories, setSubcategories] = useState<subcategoryType[]>([]);
    const [adverts, setAdverts] = useState<advertType[]>([]);
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromPrice, setFromPrice] = useState<number | undefined>();
    const [toPrice, setToPrice] = useState<number | undefined>();
    const [advertsState, setAdvertsState] = useState<string>('Всі оголошення');
    const [sortBy, setSortBy] = useState('Датою створення');
    const [currency, setCurrency] = useState('');
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState(1);
    const [underlineStyles, setUnderlineStyles] = useState({ width: '174px', left: '0' });
    const [isFound, setIsFound] = useState(true);

    const statesMap = new Map([
        ['Всі оголошення', ''],
        ['Нові', 'state=Нові&'],
        ['Вживані', 'state=Вживані&']
    ]);

    const sortByMap = new Map([
        ['Датою створення', 'sortBy=creationDate&sortOrder=desc&'],
        ['Ціною за зростанням', 'sortBy=price&sortOrder=asc&'],
        ['Ціною за спаданням', 'sortBy=price&sortOrder=desc&']
    ]);

    const host = import.meta.env.VITE_HOST;
    const pageLimit = 26;

    const getAdverts = async () => {
        setIsLoading(true);

        if (!category) {
            return;
        }

        const response = await fetchAdverts(category.id, searchTerm, pageLimit, selectedSubcategories, fromPrice,
            toPrice, statesMap.get(advertsState), sortByMap.get(sortBy), currency);
        setIsLoading(false);

        const data = response.data.adverts;

        if (response && response.status === 200 && data?.length > 0) {
            setIsFound(true);
            setAdverts(data);
            console.log(data);
        }
        else {
            setIsFound(false);
        }
    };

    const getCategories = async () => {
        const response = await axios.get(`${host}/categories`);
        if (response.status === 200) {
            setCategories(response.data);
        }
    };

    const getSubcategories = async (categoryId: string) => {
        const response = await axios.get(`${host}/subcategories/by-category/${categoryId}`);
        if (response.status === 200) {
            setSubcategories(response.data);
        }
    };

    const getCurrencies = async () => {
        try {
            const response = await axios.get(`${host}/currencies`);
            if (response.status === 200) {
                setCurrencies(response.data.map((item: currencyType) => item.abbrEng));
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const onSearch = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };

    const handleTabChange = async (selectedTabIndex: number) => {
        setSelectedTab(selectedTabIndex);

        switch (selectedTabIndex) {
            case 1:
                setUnderlineStyles({
                    width: '176px',
                    left: '0px'
                });
                break;
            case 2:
                setUnderlineStyles({
                    width: '191px',
                    left: '199px'
                });
                break;
            default:
                setUnderlineStyles({
                    width: '183px',
                    left: '411px'
                });
                break;
        }
    };

    useEffect(() => {
        getCategories();
        getCurrencies();
    }, []);

    useEffect(() => {
        axios.get(`${host}/categories/name?name=${categoryName}`)
            .then(response => {
                if (response.status === 200) {
                    setCategory(response.data);
                }
            })
            .catch(error => {
                if (!error?.response) {
                    console.log('Unknown server error');
                }

                if (error.response.status === 400) {
                    window.location.href = '/';
                }
                else {
                    console.log(`Server responded with status ${error.response.status}: ${error.response.data.message}`);
                }
            });
    }, [categoryName]);

    useEffect(() => {
        if (category?.id) {
            getSubcategories(category.id);
        }
    }, [category]);

    useEffect(() => {
        getAdverts();
    }, [category, searchTerm, selectedSubcategories, fromPrice, toPrice, advertsState, sortBy, currency]);

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

                    <Typography sx={{
                        display: 'block',
                        width: '100%',
                        marginTop: '63px',
                        color: 'black',
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '18px',
                        textAlign: 'left'
                    }}>
                        <Link href='/' underline='none' sx={{
                            color: 'inherit'
                        }}>
                            Головна
                        </Link>
                        &nbsp;/&nbsp;
                        <Link href='#' underline='none' sx={{
                            color: '#b3b3b3'
                        }}>
                            {categoryName}
                        </Link>
                    </Typography>

                    <Box sx={{ marginTop: '32px' }}>
                        <StyledLabel text={categoryName ?? ''} type='head' textType='head' textColor='black' />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: '65px'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Nunito, sans-serif',
                                textAlign: 'left'
                            }}>
                                Категорія
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '36px',
                                alignItems: 'end',
                            }}>
                                <Select
                                    value={categoryName}
                                    onChange={(e) => window.location.href = `/adverts/${e.target.value}`}
                                    sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #000',
                                        backgroundColor: 'white',
                                        width: '198px',
                                        textAlign: 'left'
                                    }}
                                >
                                    {categories?.map((item: categoryType, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item.name}
                                            sx={{
                                                fontFamily: "Nunito",
                                                fontSize: "18px",
                                            }}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Nunito, sans-serif',
                                textAlign: 'left'
                            }}>
                                Ціна
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '20px'
                            }}>
                                <StyledInput onChange={e => setFromPrice(+e.target.value)}
                                    value={fromPrice?.toString() || ''}
                                    placeholder='Від:'
                                    width='121px' />
                                <StyledInput onChange={e => setToPrice(+e.target.value)}
                                    value={toPrice?.toString() || ''}
                                    placeholder='До:'
                                    width='121px' />
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Nunito, sans-serif',
                                textAlign: 'left'
                            }}>
                                Стан
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '36px',
                                alignItems: 'end',
                            }}>
                                <Select
                                    value={advertsState}
                                    onChange={(e) => setAdvertsState(e.target.value)}
                                    sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #000',
                                        backgroundColor: 'white',
                                        width: '225px',
                                        textAlign: 'left'
                                    }}
                                >
                                    {Array.from(statesMap.keys())
                                        .map((state: string, index) => (
                                            <MenuItem
                                                key={index}
                                                value={state}
                                                sx={{
                                                    fontFamily: "Nunito",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                {state}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Nunito, sans-serif',
                                textAlign: 'left'
                            }}>
                                Сортувати за
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '36px',
                                alignItems: 'end',
                            }}>
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #000',
                                        backgroundColor: 'white',
                                        width: '265px',
                                        textAlign: 'left'
                                    }}
                                >
                                    {Array.from(sortByMap.keys())
                                        .map((sortOrder: string, index) => (
                                            <MenuItem
                                                key={index}
                                                value={sortOrder}
                                                sx={{
                                                    fontFamily: "Nunito",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                {sortOrder}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '12px'
                        }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Nunito, sans-serif',
                                textAlign: 'left'
                            }}>
                                Валюта
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '36px',
                                alignItems: 'end',
                            }}>
                                <Select
                                    displayEmpty
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    renderValue={(value: string) => {
                                        if (!value) {
                                            return <Typography sx={{
                                                fontFamily: 'Nunito, sans-serif',
                                                fontSize: '18px',
                                                color: 'gray'
                                            }}>
                                                Оберіть валюту
                                            </Typography>;
                                        }
                                        return value;
                                    }}
                                    sx={{
                                        borderRadius: '10px',
                                        border: '1px solid #000',
                                        backgroundColor: 'white',
                                        width: '175px',
                                        textAlign: 'left'
                                    }}
                                >
                                    {currencies.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item}
                                            sx={{
                                                fontFamily: 'Nunito, sans-serif',
                                                fontSize: '18px',
                                            }}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                    </Box>

                    {isLoading
                        ? (<Typography sx={{
                            fontFamily: 'Nunito, sans-serif',
                            fontSize: '24px',
                            marginTop: '65px'
                        }}>
                            Завантаження...
                        </Typography>)
                        : isFound
                            ? (<>
                                <Box sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'left',
                                    marginTop: '65px',
                                    width: '100%'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        gap: '28px'
                                    }}>
                                        <Button onClick={() => handleTabChange(1)} disableRipple
                                            sx={{
                                                display: 'inline',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                padding: '15px 10px',
                                                margin: '0',
                                                color: 'black',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: 'transparent'
                                                }
                                            }}>
                                            <Typography sx={{
                                                display: 'inline',
                                                fontFamily: 'Nunito, sans-serif',
                                                fontSize: '20px',
                                                fontWeight: (selectedTab == 1) ? 'bold' : 'normal'
                                            }}>
                                                Всі оголошення
                                            </Typography>
                                        </Button>

                                        <Button onClick={() => handleTabChange(2)} disableRipple
                                            sx={{
                                                position: 'relative',
                                                display: 'inline',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                padding: '0 10px',
                                                margin: '0',
                                                color: 'black',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: 'transparent'
                                                }
                                            }}>
                                            <Typography sx={{
                                                display: 'inline',
                                                fontFamily: 'Nunito, sans-serif',
                                                fontSize: '20px',
                                                fontWeight: (selectedTab == 2) ? 'bold' : 'normal'
                                            }}>
                                                TOP-оголошення
                                            </Typography>
                                        </Button>

                                        <Button onClick={() => handleTabChange(3)} disableRipple
                                            sx={{
                                                position: 'relative',
                                                display: 'inline',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                padding: '0 10px',
                                                margin: '0',
                                                color: 'black',
                                                textTransform: 'none',
                                                '&:hover': {
                                                    backgroundColor: 'transparent'
                                                }
                                            }}>
                                            <Typography sx={{
                                                display: 'inline',
                                                fontFamily: 'Nunito, sans-serif',
                                                fontSize: '20px',
                                                fontWeight: (selectedTab == 3) ? 'bold' : 'normal'
                                            }}>
                                                VIP-оголошення
                                            </Typography>
                                        </Button>
                                    </Box>

                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: '0',
                                        height: '1px',
                                        backgroundColor: 'var(--blue)',
                                        transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
                                        ...underlineStyles
                                    }} />
                                </Box>

                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, auto)',
                                    columnGap: '40px',
                                    rowGap: '48px',
                                    width: '100%',
                                    marginTop: '70px'
                                }}>
                                    <Box sx={{
                                        gridRow: 'span 2'
                                    }}>
                                        <Typography sx={{
                                            fontFamily: 'Nunito, sans-serif',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            textAlign: 'left'
                                        }}>
                                            Підкатегорія
                                        </Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: '18px',
                                            marginTop: '20px',
                                            textAlign: 'left'
                                        }}>
                                            {subcategories.map(subcategory => (
                                                <StyledCheckBox label={subcategory.name}
                                                    sx={{
                                                        margin: '0',
                                                        padding: '0'
                                                    }}
                                                    onChange={() => {
                                                        if (selectedSubcategories.includes(subcategory.name)) {
                                                            setSelectedSubcategories(
                                                                selectedSubcategories.filter(value =>
                                                                    value !== subcategory.name
                                                                )
                                                            );
                                                        }
                                                        else {
                                                            setSelectedSubcategories(
                                                                [...selectedSubcategories,
                                                                subcategory.name]
                                                            );
                                                        }
                                                    }} />
                                            ))}
                                        </Box>
                                    </Box>

                                    {adverts.map((advert: advertType) => {
                                        return (
                                            <StyledAdvert key={advert.id} title={advert.name} location={advert.location} date={advert.creationDate} image={advert.pictures[0]} price={advert.price} currency={advert.currencyId} onClick={
                                                () => {
                                                    window.location.href = `/advert/${advert.id}`;
                                                }
                                            } />
                                        );
                                    })}
                                </Box>
                            </>)
                            : (
                                <Typography sx={{
                                    fontFamily: 'Nunito, sans-serif',
                                    fontSize: '24px',
                                    marginTop: '65px'
                                }}>
                                    <pre>Оголошень не знайдено :(</pre>
                                </Typography>
                            )}
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    AdvertsCategoryPage
};
