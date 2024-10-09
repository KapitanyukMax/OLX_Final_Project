import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StyledEngineProvider, Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import StyledButton from '../../components/button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useRef } from 'react';

const CategoryCreatePage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const [imageURL, setImageURL] = useState<string | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(null);  // Track image path in Firebase storage
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const storage = getStorage();

    const [errors, setErrors] = useState({
        name: '',
        picture: '',
    });

    const [formData, setFormData] = useState<{
        name: string,
        picture: string,
        subcategories: string[]
    }>({
        name: '',
        picture: '',
        subcategories: []
    });

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

        if (!formData.picture) {
            newErrors.picture = 'Зображення обов\'язкове';
            formIsValid = false;
        }

        setErrors(newErrors);

        if (!formIsValid) {
            setErrorMessage('Будь ласка, заповніть усі обов\'язкові поля.');
            setOpenErrorDialog(true);
            return;
        }

        try {
            console.log('Creating category:', formData);
            const response = await axios.post(`${host}/categories`, { ...formData, subcategories: [] });
            console.log('Category created successfully', response.data);

            setSuccessMessage('Категорію створено успішно!');
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('Error creating category', error);
            setErrorMessage('Помилка створення категорії.');
            setOpenErrorDialog(true);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;

        const storageRef = ref(storage, `categoryImages/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            const newImageUrl = await getDownloadURL(storageRef);

            setImageURL(newImageUrl);
            setFormData((prevFormData) => ({
                ...prevFormData,
                picture: newImageUrl,
            }));
            setImagePath(storageRef.fullPath);  // Save the image path for later deletion
            console.log("Image uploaded successfully:", newImageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Handle image deletion
    const handleDeleteImage = async () => {
        if (!imagePath) return;

        const imageRef = ref(storage, imagePath);
        try {
            await deleteObject(imageRef);  // Delete image from Firebase storage
            setImageURL(null);  // Clear the image URL
            setImagePath(null);  // Clear the image path
            setFormData((prevFormData) => ({
                ...prevFormData,
                picture: '',
            }));
            console.log("Image deleted successfully");
        } catch (error) {
            console.error("Error deleting image:", error);
            setErrorMessage('Помилка видалення зображення.');
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

    const handleNameChange = (value: string) => {
        setFormData({ ...formData, name: value });
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
                        <Box>
                            <StyledLabel text="Зображення" type="head" textType="head" textColor="black" />
                            {imageURL ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src={imageURL} alt="Category" style={{ width: "200px", marginRight: "20px" }} />
                                    <IconButton onClick={handleDeleteImage} color="error">
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
                            <StyledButton text='Створити категорію' type='contained' primaryColor='var(--light-blue)' secondaryColor='white' hoverBackColor='var(--green)' onClick={handleSubmit} />
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
                <DialogTitle id="success-message">Категорія успішно створена</DialogTitle>
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
    CategoryCreatePage,
}
