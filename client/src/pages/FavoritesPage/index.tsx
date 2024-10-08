import React, { useEffect, useState } from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import { StyledEngineProvider } from "@mui/material/styles";
import { StyledAdvert } from "../../components/advert";
import { useParams } from "react-router-dom";
import StyledLabel from "../../components/lable";
import { StyledInput } from "../../components/input";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from "../../components/icons/search";
import StyledButton from "../../components/button";

const FavoritesPage: React.FC = () => {
    const userId = useParams<{ userId: string }>().userId;

    const [favoriteAdverts, setFavoriteAdverts] = useState<any[]>([]);
    const [favoriteAdvertsIds, setFavoriteAdvertsIds] = useState<string[]>([]);

    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [sortValue, setSortValue] = useState<string>('По даті(спадання)');
    const sortValues = ['По даті(спадання)', 'По даті(зростання)', 'По ціні(спадання)', 'По ціні(зростання)'];

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [categories, setCategories] = useState<{ id: string; name: string; picture: string; subcategories: [] }[]>([]);
    const [category, setCategory] = useState<string>('');

    const host = import.meta.env.VITE_HOST;

    const getAdverts = async (page: number = 1, searchTerm?: string) => {
        let response;
        const limit = 8;
        let startAfterParam = page > 1 ? favoriteAdverts[favoriteAdverts.length - 1].id : null;

        const sortQuery = sortValue === 'По даті(спадання)' ? 'sortBy=creationDate&sortOrder=desc' :
            sortValue === 'По даті(зростання)' ? 'sortBy=creationDate&sortOrder=asc' :
                sortValue === 'По ціні(спадання)' ? 'sortBy=price&sortOrder=desc' :
                    sortValue === 'По ціні(зростання)' ? 'sortBy=price&sortOrder=asc' : '';
        if (searchTerm && searchTerm.length > 0) {
            response = await axios.get(`${host}/favorites/userId?userId=${userId}&searchTerm=${searchTerm}&${sortQuery}`);
        }
        else {
            response = await axios.get(`${host}/favorites/userId?userId=${userId}&limit=${limit}&startAfter=${startAfterParam}&${sortQuery}`);
        }

        if (response) {
            if (category === '' || category === 'Всі категорії') {
                const { adverts: data, totalCount } = response.data;
                setFavoriteAdverts(data);

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
                    setFavoriteAdverts(filteredData);
                }

                if (!searchTerm || searchTerm.length === 0) {
                    setTotalPages(Math.ceil(totalCount / limit));
                }

                console.log(data);
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        getAdverts();
        fetchFavorites();
    }, []);

    useEffect(() => {
        getAdverts();
    }, [favoriteAdvertsIds]);

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [sortValue]);

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [searchTerm]);

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

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`${host}/favorites/userId?userId=${userId}`);
            const favoriteAdvertIds = response.data.adverts.map((advert: any) => advert.id);
            setFavoriteAdvertsIds(favoriteAdvertIds);
        } catch (error) {
            console.error('Error fetching favorites', error);
        }
    };

    useEffect(() => {
        getAdverts(currentPage, searchTerm || '');
    }, [category]);

    const handleSortChange = (value: string) => {
        setSortValue(value);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
    }

    const handleHeartIconClick = async (advertId: string) => {
        if (favoriteAdvertsIds.includes(advertId)) {
            await axios.get(`${host}/favorites/remove?userId=${userId}&advertId=${advertId}`);
            setFavoriteAdvertsIds(favoriteAdvertsIds.filter(id => id !== advertId));
        } else {
            await axios.get(`${host}/favorites/add?userId=${userId}&advertId=${advertId}`);
            setFavoriteAdvertsIds([...favoriteAdvertsIds, advertId]);
        }
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

                    <Box>
                        <StyledLabel text="Ваші обрані оголошення" type='head' textType='head' textColor='black' />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '75px', gap: '60px', justifyContent: 'space-between', width: '100%' }}>
                        <StyledInput value={'Заголовок'} iconEnd={SearchIcon} widthType='big' onChange={(e) => handleSearchChange(e.target.value)} />
                        <FormControl fullWidth sx={{ width: '329px' }}>
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
                        <FormControl fullWidth sx={{ width: '329px' }}>
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

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: '24px',
                        flexWrap: 'wrap',
                        marginTop: '70px'
                    }}>
                        {
                            favoriteAdverts.length === 0 ? (
                                <p>No adverts available.</p>
                            ) :
                                (
                                    favoriteAdverts.map((advert: any) => {
                                        return (
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
                                                onHeartClick={
                                                    () => {
                                                        handleHeartIconClick(advert.id);
                                                    }
                                                } />
                                        );
                                    })
                                )
                        }
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', marginTop: '20px', gap: "5px" }}>
                        {renderPaginationButtons()}
                    </Box>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    FavoritesPage
};
