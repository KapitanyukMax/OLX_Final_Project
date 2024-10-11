import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StyledEngineProvider, Box, Button } from '@mui/material';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import StyledButton from '../../components/button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';

const SubCategoryEditPage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const { subcategoryId } = useParams<{ subcategoryId: string }>();

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [errors, setErrors] = useState({
        name: ''
    });

    const [formData, setFormData] = useState<{
        id: string,
        name: string,
        picture: string,
        categoryId: string
    }>({
        id: subcategoryId || '',
        name: '',
        picture: '',
        categoryId: ''
    });

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const response = await axios.get(`${host}/subcategories/${subcategoryId}`);
                console.log('SubCategory fetched successfully', response.data);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: response.data.name
                }));
            } catch (error) {
                console.error('Error fetching subCategory', error);
            }
        };

        if (subcategoryId) fetchSubCategory();
        setIsLoading(false);
    }, [subcategoryId]);

    const handleSubmit = async () => {
        setErrors({ name: '' });

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
            console.log('Updating subCategory:', formData);
            const response = await axios.put(`${host}/subcategories`, formData);
            console.log('SubCategory updated successfully', response.data);

            setSuccessMessage('Підкатегорію оновлено успішно!');
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('Error updating subCategory', error);
            setErrorMessage('Помилка оновлення підкатегорію.');
            setOpenErrorDialog(true);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

    const handleNameChange = (value: string) => {
        setFormData({ ...formData, name: value });
    };

    if (isLoading) {
        return <div>Завантаження...</div>;
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
                        <StyledLabel text="Оновити підкатегорію" type='head' textType='head' textColor='var(--blue)' />
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
                            <StyledInput value={formData?.name} label='Вкажіть назву' required widthType='large' maxLength={80} onChange={(e) => handleNameChange(e.target.value)} />
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
                            <StyledButton text='Оновити підкатегорію' type='contained' primaryColor='var(--light-blue)' secondaryColor='white' hoverBackColor='var(--green)' onClick={handleSubmit} />
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
                onClose={() => setOpenSuccessDialog(false)}
                aria-labelledby="success-message"
            >
                <DialogTitle id="success-message">Категорія успішно оновлена</DialogTitle>
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
        </StyledEngineProvider>
    );
};

export { SubCategoryEditPage };
