import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, db } from '../../../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StyledEngineProvider, Box, Button, IconButton } from '@mui/material';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import StyledButton from '../../components/button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';

const SubCategoryCreatePage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const { categoryId } = useParams<{ categoryId: string }>();

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const [errors, setErrors] = useState({
        name: ''
    });

    const [formData, setFormData] = useState<{
        name: string,
        picture: string,
        categoryId: string
    }>({
        name: '',
        picture: '',
        categoryId: categoryId || ''
    });

    const handleSubmit = async () => {
        let formIsValid = true;
        const newErrors = {
            name: ''
        };

        if (!formData.name) {
            newErrors.name = 'Назва обов\'язкова';
            formIsValid = false;
        }

        setErrors(newErrors);

        if (!formIsValid) {
            setErrorMessage('Будь ласка, заповніть усі обов\'язкові поля.');
            setOpenErrorDialog(true);
            return;
        }

        try {
            console.log('Creating subCategory:', formData);
            // Створення підкатегорії
            const response = await axios.post(`${host}/subcategories`, formData);
            console.log('SubCategory created successfully', response.data);

            // Перевірка, чи є id підкатегорії
            if (response.data.id) {
                const categoryRef = await axios.get(`${host}/categories/${categoryId}`);
                const category = categoryRef.data;

                // Додавання підкатегорії до категорії
                console.log(response.data.id);
                await axios.put(`${host}/categories`, { ...category, subcategories: [...category.subcategories, response.data.id] });

                setSuccessMessage('Підкатегорію створено успішно!');
                setOpenSuccessDialog(true);
            } else {
                throw new Error('Не вдалося отримати id підкатегорії');
            }
        } catch (error) {
            console.error('Error creating subCategory', error);
            setErrorMessage('Помилка створення підкатегорії.');
            setOpenErrorDialog(true);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user);
            if (user?.email) {
                const response = await axios.get(`${host}/users/email?email=${user.email}`);
                setCurrentUser(response.data);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    userId: response.data.id,
                }));
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log('FormData:', formData);
    }, [formData]);

    const handleNameChange = (value: string) => {
        setFormData({ ...formData, name: value });
    }

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
                <form className='form'>
                    <Box sx={{
                        margin: '60px',
                    }}>
                        <StyledLabel text="Створити категорію" type='head' textType='head' textColor='var(--blue)' />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '65px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                        paddingBottom: '30px',
                    }}>
                        <Box>
                            <StyledLabel text="Заголовок" type='head' textType='head' textColor='black' />
                            <StyledInput value={formData.name} label='Вкажіть назву' required widthType='large' maxLength={80} onChange={(e) => handleNameChange(e.target.value)} />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </Box>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            textAlign: 'left',
                            marginBottom: '50px',
                        }}>
                            <StyledButton text='Створити підкатегорію' type='contained' primaryColor='var(--light-blue)' secondaryColor='white' hoverBackColor='var(--green)' onClick={handleSubmit} />
                            <StyledButton text='Скасувати' type='contained' primaryColor='red' secondaryColor='white' hoverBackColor='var(--green)' onClick={
                                () => {
                                    window.location.href = '/admin-panel';
                                }
                            } />
                        </Box>
                    </Box>
                </form>
            </Box>
            <Dialog
                open={openSuccessDialog}
                onClose={() => setOpenErrorDialog(false)}
                aria-labelledby="success-message"
            >
                <DialogTitle id="success-message">Підкатегорію успішно створено</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenSuccessDialog(false);
                        window.location.href = '/admin-panel';
                    }} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
                aria-labelledby="error-dialog-title"
            >
                <DialogTitle id="error-dialog-title">Error</DialogTitle>
                <DialogContent>
                    <p>{errorMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenErrorDialog(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledEngineProvider >
    );
};

export {
    SubCategoryCreatePage,
}