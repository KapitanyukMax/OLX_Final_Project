import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, db } from '../../../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StyledEngineProvider, Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import StyledButton from '../../components/button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

const CategoryEditPage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const { categoryId } = useParams<{ categoryId: string }>();

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const [imageURL, setImageURL] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);



    const [loading, setLoading] = useState(true);

    const storage = getStorage();

    const [errors, setErrors] = useState({
        name: '',
        picture: ''
    });


    const [formData, setFormData] = useState<{
        id: string,
        name: string,
        picture: string
    }>({
        id: categoryId || '',
        name: '',
        picture: ''
    });

    const [image, setImage] = useState<string | File>(formData.picture);
    const [prevImage, setPrevImage] = useState<string>(formData.picture);

    useEffect(() => {
        setImage(formData.picture);
        setPrevImage(formData.picture);
    }, [formData]);

    const fetchCategopry = async (categoryId: string) => {
        try {
            const response = await axios.get(`${host}/categories/${categoryId}`);
            console.log(response.data);
            setFormData(response.data);
            setImageURL(response.data.picture);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (categoryId) {
            fetchCategopry(categoryId);
        }
    }, [categoryId]);

    const handleSubmit = async () => {
        let formIsValid = true;
        const newErrors = {
            name: '',
            picture: ''
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
            const response = await axios.put(`${host}/categories`, formData);
            console.log('Category updated successfully', response.data);

            setSuccessMessage('Категорію оновлено успішно!');
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('Error updating advert', error);
            setErrorMessage('Помилка оновлення категорії.');
            setOpenErrorDialog(true);
        }
    };

    // Функція для завантаження нового зображення
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;

        const storageRef = ref(storage, `categoryImages/${file.name}`); // Створюємо новий референс
        try {
            // Завантажуємо зображення
            await uploadBytes(storageRef, file);
            const newImageUrl = await getDownloadURL(storageRef);

            // Видаляємо старе зображення, якщо воно існує
            if (imageURL) {
                await deleteImageByUrl(imageURL);
            }

            // Оновлюємо URL зображення
            setImageURL(newImageUrl);
            console.log("Image uploaded successfully:", newImageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Функція для видалення зображення за URL
    const deleteImageByUrl = async (url: string) => {
        const pathFromUrl = url
            .split("?")[0]
            .split("/o/")[1]
            .replace("%2F", "/");

        const imageRef = ref(storage, decodeURIComponent(pathFromUrl));
        try {
            await deleteObject(imageRef);
            console.log("Image deleted successfully.");
            setImageURL(null); // Очищаємо стан URL після видалення
        } catch (error) {
            console.error("Error deleting image:", error);
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

    if (loading) {
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
                        <StyledLabel text="Редагувати категорію" type='head' textType='head' textColor='var(--blue)' />
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
                        <Box>
                            <StyledLabel text="Зображення" type="head" textType="head" textColor="black" />
                            {imageURL ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src={imageURL} alt="Category" style={{ width: "200px", marginRight: "20px" }} />
                                    <IconButton onClick={() => deleteImageByUrl(imageURL)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <StyledLabel text="Немає зображення" type="primary" textType="small" textColor="grey" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                            <StyledButton
                                text="Завантажити зображення"
                                type="contained"
                                primaryColor="var(--light-blue)"
                                secondaryColor="white"
                                hoverBackColor="var(--green)"
                                onClick={() => fileInputRef.current?.click()}
                            />
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
                            <StyledButton text='Оновити оголошення' type='contained' primaryColor='var(--light-blue)' secondaryColor='white' hoverBackColor='var(--green)' onClick={handleSubmit} />
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
                <DialogTitle id="success-message">Оголошення успішно оновлено</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenSuccessDialog(false);
                        window.location.href = '/ admin-panel';
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
    CategoryEditPage,
}