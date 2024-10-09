import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton, Paper, StyledEngineProvider, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import StyledLabel from "../../components/lable";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { StyledAdvert } from "../../components/advert";
import StyledButton from "../../components/button";
import ImageComponent from "../../components/image";
import { CategoryEditPage } from "./categoryEdit";

const AdminPage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<any[]>([]);

    const [categories, setCategories] = useState<{ id: string, name: string, picture: string, subcategories: [] }[]>([]);
    const [subcategories, setSubcategories] = useState<{ categoryId: string, id: string, name: string }[]>([]);

    const [adverts, setAdverts] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [usersPage, setUsersPage] = useState<number>(0);

    const fetchCategories = async () => {
        const response = await axios.get(`${host}/categories`);
        const data = await response.data;
        console.log(data);
        setCategories(data);
    };

    const fetchSubcategories = async () => {
        const response = await axios.get(`${host}/subcategories`);
        const data = await response.data;
        console.log(data);
        setSubcategories(data);
    };

    const fetchAdverts = async (page: number = 1) => {
        const limit = 12;
        const startAfterParam = page > 1 && adverts.length > 0 ? adverts[adverts.length - 1].id : null;

        try {
            const response = await axios.get(`${host}/adverts`, {
                params: {
                    limit,
                    startAfter: startAfterParam,
                },
            });
            const { adverts: data, totalCount } = response.data;

            setAdverts(data);
            setTotalPages(Math.ceil(totalCount / limit));
        } catch (error) {
            console.error("Error fetching adverts:", error);
        }
    };

    const fetchUsers = async () => {
        const response = await axios.get(`${host}/users`);
        const data = await response.data;
        console.log(data);
        setUsers(data);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            console.log(user?.uid);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
        fetchAdverts();
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchAdverts(currentPage);
    }, [currentPage]);

    const toggleCategory = (categoryId: string) => {
        setOpenCategories((prevState) => ({
            ...prevState,
            [categoryId]: !prevState[categoryId],
        }));
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleChangeUsersPage = (event: unknown, newPage: number) => {
        setUsersPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setUsersPage(0);
    };

    const handleCategoryEdit = (categoryId: string) => {
        window.location.href = `/category-edit/${categoryId}`;
    }

    const handleCategoryDelete = async (categoryId: string) => {
        const confirmed = window.confirm('Ви впевнені, що хочете видалити цю категорію? Всі підкатегорії також будуть видалені.');
        if (!confirmed) return;

        try {
            await axios.delete(`${host}/categories/${categoryId}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
            const ref = await axios.get(`${host}/subcategories/by-category/${categoryId}`);
            const subcategories = ref.data;
            for (const subcategory of subcategories) {
                await axios.delete(`${host}/subcategories/${subcategory.id}`);
            }
            setSubcategories(prevSubcategories => prevSubcategories.filter(subcategory => subcategory.categoryId !== categoryId));
            alert('Категорію видалено успішно!');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Не вдалося видалити категорію.');
        }

        fetchCategories();
    }

    const handleSubCategoryEdit = (subCategoryId: string) => {
        window.location.href = `/subcategory-edit/${subCategoryId}`;
    }

    const handleSubCategoryDelete = async (subCategoryId: string) => {
        const confirmed = window.confirm('Ви впевнені, що хочете видалити цю підкатегорію?');
        if (!confirmed) return;

        try {
            await axios.delete(`${host}/subcategories/${subCategoryId}`);
            setSubcategories(prevSubcategories => prevSubcategories.filter(subcategory => subcategory.id !== subCategoryId));
            alert('Підкатегорію видалено успішно!');
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            alert('Не вдалося видалити підкатегорію');
        }

        fetchSubcategories();
    }

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

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                backgroundColor: '#ebeef5',
                marginBottom: '50px'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '1371px',
                    height: '100%',
                    marginTop: '50px'
                }}>
                    <Box>
                        <StyledLabel text="Ласкаво просимо до адмін-панелі" type="head" textType="head" textColor="black" sx={{ textAlign: 'center' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '1371px', height: '100%', marginTop: '50px' }}>
                        <StyledLabel text="Користувачі:" type="head" textType="head" textColor="black" />
                        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Фото</TableCell>
                                        <TableCell>Ім'я</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.slice(usersPage * rowsPerPage, usersPage * rowsPerPage + rowsPerPage).map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>
                                                <ImageComponent src={typeof user.picture === 'string' ? user.picture : 'https://via.placeholder.com/35'} borderRadius='10px' alt='user' width='35px' height='35px' />
                                            </TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{user.rating}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={users.length}
                            page={usersPage}
                            onPageChange={handleChangeUsersPage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </Box>
                    <Box>
                        <StyledLabel text="Категорії :" type="head" textType="head" textColor="black" />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            justifyContent: 'center',
                        }}>
                            {
                                categories.map((category, index) => {
                                    const isOpen = openCategories[category.id];
                                    return (
                                        <>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ' row', marginLeft: '20px' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <StyledLabel key={category.id} text={category.name} type="head" textType="middle" textColor="black" />
                                                    <IconButton onClick={() => toggleCategory(category.id)}>
                                                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                                                    </IconButton>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                                    <StyledButton text="Змінити" type="contained" primaryColor="orange" onClick={() => handleCategoryEdit(category.id)} />
                                                    <StyledButton text="Видалити" type="contained" primaryColor="red" onClick={() => handleCategoryDelete(category.id)} />
                                                </Box>
                                            </Box>
                                            {isOpen && (
                                                <Box sx={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {
                                                        category.subcategories.map((subcategoryId: string) => {
                                                            let subcategoryName = '';
                                                            subcategories.forEach(element => {
                                                                if (element.id === subcategoryId) {
                                                                    subcategoryName = element.name;
                                                                }
                                                            });
                                                            return subcategoryId ? (
                                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <StyledLabel key={subcategoryId} text={subcategoryName} type="head" textType="small" textColor="black" sx={{ marginLeft: '20px' }} />
                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                                                        <StyledButton text="Змінити" type="contained" primaryColor="orange" onClick={() => handleSubCategoryEdit(subcategoryId)} />
                                                                        <StyledButton text="Видалити" type="contained" primaryColor="red" onClick={() => handleSubCategoryDelete(subcategoryId)} />
                                                                    </Box>
                                                                </Box>
                                                            ) : null;
                                                        })
                                                    }
                                                    {/* <StyledButton text="Додати підкатегорію" type="contained" onClick={() => window.location.href = `/subcategory-create/${category.id}`} /> */}
                                                </Box>
                                            )}
                                        </>
                                    );
                                })
                            }
                            {/* <StyledButton text="Додати категорію" type="contained" onClick={() => window.location.href = '/category-create'} /> */}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '50px' }}>
                        <StyledLabel text="Оголошення :" type="head" textType="head" textColor="black" />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            flexWrap: 'wrap'
                        }}>
                            {
                                adverts.map((advert, index) => {
                                    return (
                                        <StyledAdvert key={advert.id} onDelete={() => deleteAdvert(advert.id)} onEdit={() => {
                                            window.location.href = `/advert-edit/${advert.id}`;
                                        }} title={advert.name} location={advert.location} image={advert.pictures[0]} date={advert.creationDate} price={advert.price} onClick={() => { window.location.href = `/advert/${advert.id}` }} />
                                    );
                                })
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'center', marginTop: '20px', gap: "5px" }}>
                            {renderPaginationButtons()}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export {
    AdminPage
};