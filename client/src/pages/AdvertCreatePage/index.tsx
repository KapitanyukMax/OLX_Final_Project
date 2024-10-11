import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../../firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StyledEngineProvider, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import { StyledDropdown } from '../../components/dropdown';
import { StyledCheckBox } from '../../components/checkBox';
import StyledButton from '../../components/button';
import { StyledTextArea } from '../../components/textArea';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import imageCompression from 'browser-image-compression';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useRef } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';

const AdvertCreatePage: React.FC = () => {
    const host = import.meta.env.VITE_HOST;

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [cities, setCities] = useState<string[]>([]);

    const [category, setCategory] = useState('');

    const [categories, setCategories] = useState<{ id: string; name: string; picture: string; subcategories: [] }[]>([]);
    const [subCategories, setSubCategories] = useState<{ id: string, name: string }[]>([]);

    const [currencies, setCurrencies] = useState<string[]>([]);

    const storage = getStorage();

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        location: '',
        subCategoryId: '',
        image: '',
    });


    const [formData, setFormData] = useState<{
        userId: string;
        subCategoryId: string;
        name: string;
        description: string;
        price: number;
        location: string;
        status: string;
        pictures: string[];
        orderType: string;
        currencyId: string;
        delivery: string;
        isHidden: boolean;
    }>({
        userId: '',
        subCategoryId: '',
        name: '',
        description: '',
        price: 0,
        location: '',
        status: '',
        pictures: [],
        orderType: '',
        currencyId: '',
        delivery: '',
        isHidden: false,
    });

    const uploadResizedImages = async (file: File, path: string) => {
        const sizes = [200, 400, 800];

        try {
            const timestamp = Date.now();
            const originalRef = ref(storage, `${path}/original-${timestamp}.jpg`);
            await uploadBytes(originalRef, file);

            for (let size of sizes) {
                const options = {
                    maxWidthOrHeight: size,
                    useWebWorker: true,
                };

                const resizedFile = await imageCompression(file, options);
                const resizedRef = ref(storage, `${path}/resized-${size}-${timestamp}.jpg`);
                await uploadBytes(resizedRef, resizedFile);
            }

            console.log('Зображення успішно завантажені!');
        } catch (error) {
            console.error('Помилка під час завантаження:', error);
        }
    };

    const uploadMultipleImages = async (files: FileList) => {
        const path = `images/${formData.userId}`;

        const uploadPromises = Array.from(files).map(async (file, i) => {
            const timestamp = Date.now();
            const uniquePath = `${path}/image-${i}-${timestamp}`;

            await uploadResizedImages(file, uniquePath);

            const downloadURL = await getDownloadURL(ref(storage, `${uniquePath}/original-${timestamp}.jpg`));
            return downloadURL;
        });

        const uploadedImageURLs = await Promise.all(uploadPromises);
        console.log('Uploaded image URLs:', uploadedImageURLs);

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                pictures: [...prevFormData.pictures, ...uploadedImageURLs],
            };
        });
    };

    useEffect(() => {
        console.log('Updated pictures:', formData.pictures);
    }, [formData.pictures]);

    const handleMultipleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedImages((prevImages) => [...prevImages, ...files]);
        if (event.target.files && event.target.files.length > 0) {
            await uploadMultipleImages(event.target.files);
        }
    };

    const handleDeleteImage = async (index: number) => {
        const imageToDelete = formData.pictures[index];
        const imageRef = ref(storage, imageToDelete);
        try {
            await deleteObject(imageRef);
            console.log('Image successfully deleted from Firebase Storage');
        } catch (error) {
            console.error('Error deleting image from Firebase Storage:', error);
        }

        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setFormData((prevFormData) => ({
            ...prevFormData,
            pictures: prevFormData.pictures.filter((_, i) => i !== index),
        }));
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        let formIsValid = true;
        const newErrors = {
            name: '',
            description: '',
            price: '',
            location: '',
            subCategoryId: '',
            image: '',
        };

        if (!formData.name) {
            newErrors.name = 'Назва обов\'язкова';
            formIsValid = false;
        }

        if (!formData.description) {
            newErrors.description = 'Опис обов\'язковий';
            formIsValid = false;
        }

        if (!formData.location) {
            newErrors.location = 'Місцезнаходження обов\'язкове';
            formIsValid = false;
        }

        if (!formData.subCategoryId) {
            newErrors.subCategoryId = 'Категорія обов\'язкова';
            formIsValid = false;
        }

        if (formData.pictures.length === 0) {
            newErrors.image = 'Додайте хоча б одне зображення';
            formIsValid = false;
        }

        setErrors(newErrors);

        if (!formIsValid) {
            setErrorMessage('Будь ласка, заповніть усі обов\'язкові поля.');
            setOpenErrorDialog(true);
            return;
        }

        try {
            const response = await axios.post(`${host}/adverts`, formData);
            console.log('Advert created successfully', response.data);

            setSuccessMessage('Оголошення додано успішно!');
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('Error creating advert', error);
            setErrorMessage('Помилка створення оголошення.');
            setOpenErrorDialog(true);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${host}/categories`);

                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await axios.get(`${host}/currencies`);
                const currencies = response.data.map((currency: { abbrEng: string }) => currency.abbrEng);

                setCurrencies(currencies);
            } catch (error) {
                console.error('Error fetching currencies', error);
            }
        };

        fetchCurrency();
    }, []);

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

    const fetchCities = async (value: string) => {
        try {
            const response = await axios.post(`${host}/cities`, {
                apiKey: '15d0f1b8de9dc0f5370abcf1906f03cd',
                modelName: "AddressGeneral",
                calledMethod: "getSettlements",
                methodProperties: {
                    FindByString: value
                }
            });
            const cities = response.data.data.map((city: any) => city.Description);
            setCities(cities);
        } catch (error) {
            console.error('Error fetching cities', error);
        }
    };

    const handleNameChange = (value: string) => {
        setFormData({ ...formData, name: value });
    }

    const handleDescriptionChange = (value: string) => {
        setFormData({ ...formData, description: value });
    }

    const handlePriceChange = (value: string) => {
        setFormData({ ...formData, price: parseFloat(value) });
    }

    const handleLocationChange = (value: string) => {
        setFormData({ ...formData, location: value });
    }

    const handleCheckboxChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubCategoryChange = (value: string) => {
        setFormData({ ...formData, subCategoryId: value });
    }

    const handleCurrencyChange = (value: string) => {
        setFormData({ ...formData, currencyId: value });
    }

    const handleCategory = async (value: string) => {
        setSubCategories([]);
        setCategory(value);
        const res = await axios.get(`${host}/subcategories/by-category/${value}`);
        if (res.data === undefined) {
            setSubCategories([]);
        } else {
            setSubCategories(res.data);
        }
    }

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                backgroundColor: '#ebeef5',
            }}>
                <form className='form'>
                    <Box sx={{
                        margin: '60px',
                    }}>
                        <StyledLabel text="Створити оголошення" type='head' textType='head' textColor='var(--blue)' />
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
                            <StyledInput placeholder="Вкажіть назву" value={formData.name} label='Вкажіть назву' required widthType='large' maxLength={80} onChange={(e) => handleNameChange(e.target.value)} />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>
                            <StyledLabel text="Категорія" type='head' textType='head' textColor='black' />
                            <StyledLabel text="Вкажіть категорію*" type='primary' textType='small' textColor='black' />
                            <FormControl fullWidth sx={{ width: '600px' }}>
                                <InputLabel id='category' className='modified' sx={{ fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400' }}>Категорія</InputLabel>
                                <Select labelId='category' className='modified' sx={{ borderRadius: '10px', border: '0px solid #000' }} label='Категорія' value={category} onChange={(e) => handleCategory(e.target.value as string)}>
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
                                            className='modified'
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ width: '600px' }}>
                                <InputLabel id='subCategory' sx={{ fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400' }}>Підкатегорія</InputLabel>
                                <Select labelId='subCategory' label='Категорія' sx={{ borderRadius: '10px', border: '0px solid #000' }} value={formData.subCategoryId} onChange={(e) => handleSubCategoryChange(e.target.value as string)}>
                                    {subCategories.map((item, index) => (
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
                            {errors.subCategoryId && <div className="error-message">{errors.subCategoryId}</div>}
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Місцезнаходження" type='head' textType='head' textColor='black' />
                        <StyledLabel text="Оберіть назву населеного пункту*" type='primary' textType='small' textColor='black' />
                        <StyledDropdown placeholder="Оберіть місто" type='large' values={cities} onInput={(e) => {
                            const value = e.target.value;
                            fetchCities(value);
                        }} onChange={(e) => handleLocationChange(e.target.value)} />
                        {errors.location && <div className="error-message">{errors.location}</div>}
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
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}>
                            <StyledLabel text="Вид угоди" type='head' textType='head' textColor='black' />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '592px',
                                gap: '80px',
                                flexWrap: 'wrap',
                            }}>
                                <StyledCheckBox label='Продам' checked={formData.orderType === "Продам"} onChange={() => handleCheckboxChange('orderType', 'Продам')} />
                                <StyledCheckBox label='Здам в оренду' checked={formData.orderType === "Здам в оренду"} onChange={() => handleCheckboxChange('orderType', 'Здам в оренду')} />
                                <StyledCheckBox label='Безкоштовно' checked={formData.orderType === "Безкоштовно"} onChange={() => handleCheckboxChange('orderType', 'Безкоштовно')} />
                                <StyledCheckBox label='Куплю' checked={formData.orderType === "Куплю"} onChange={() => handleCheckboxChange('orderType', 'Куплю')} />
                                <StyledCheckBox label='Орендую' checked={formData.orderType === "Орендую"} onChange={() => handleCheckboxChange('orderType', 'Орендую')} />
                                <StyledCheckBox label='Обміняю' checked={formData.orderType === "Обміняю"} onChange={() => handleCheckboxChange('orderType', 'Обміняю')} />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}>
                            <StyledLabel text="Стан" type='head' textType='head' textColor='black' />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '80px',
                            }}>
                                <StyledCheckBox label='Нове' checked={formData.status === "Нове"} onChange={() => handleCheckboxChange('status', 'Нове')} />
                                <StyledCheckBox label='Вживане' checked={formData.status === "Вживане"} onChange={() => handleCheckboxChange('status', 'Вживане')} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Ціна" type='head' textType='head' textColor='black' />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '36px',
                            alignItems: 'end',
                        }}>
                            <StyledInput label='Вкажіть ціну' placeholder="1080" value={formData.price == 0 ? '' : formData.price.toString()} widthType='middle' onChange={(e) => handlePriceChange(e.target.value)} />
                            <FormControl fullWidth sx={{ width: '300px' }}>
                                <InputLabel id='currency' sx={{ fontFamily: 'Nunito', fontSize: '18px', fontWeight: '400' }}>Валюта</InputLabel>
                                <Select labelId='currency' label='Валюта' sx={{ borderRadius: '10px', border: '0px solid #000' }} value={formData.currencyId} onChange={(e) => handleCurrencyChange(e.target.value as string)}>
                                    {currencies.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item}
                                            sx={{
                                                fontFamily: "Nunito",
                                                fontSize: "18px",
                                            }}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                    }}>
                        <StyledLabel text="Фото" type='head' textType='head' textColor='black' />
                        <StyledLabel text="Додайте фото*" type='primary' textType='small' textColor='black' />
                        <Box className='images-container' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '24px',
                        }}>
                            {selectedImages.map((image, index) => (
                                <Box
                                    key={index}
                                    className='image-wrapper'
                                    sx={{
                                        position: 'relative',
                                        width: '185px',
                                        height: '185px',
                                    }}
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Selected image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => handleDeleteImage(index)}
                                        className='delete-button'
                                        aria-label="delete"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: 'red',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMultipleImageUpload}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            multiple
                        />
                        <StyledButton
                            text='Додати фото'
                            type='contained'
                            primaryColor='var(--green)'
                            secondaryColor='black'
                            hoverBackColor='var(--light-blue)'
                            onClick={handleButtonClick}
                        />
                        {errors.image && <div className="error-message">{errors.image}</div>}
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '33px 118px',
                        textAlign: 'left',
                        marginBottom: '120px',
                    }}>
                        <StyledLabel text="Опис оголошення" type='head' textType='head' textColor='black' />
                        <StyledTextArea label='Введіть опис' required placeholder="Будь ласка, додайте опис оголошення" value={formData.description} maxLength={9000} minRows={18} onChange={(e) => handleDescriptionChange(e.target.value)} />
                        {errors.description && <div className="error-message">{errors.description}</div>}
                        <StyledButton text='Додати оголошення' type='contained' primaryColor='var(--light-blue)' secondaryColor='white' hoverBackColor='var(--green)' onClick={handleSubmit} />
                    </Box>
                </form>
            </Box>
            <Dialog
                open={openSuccessDialog}
                onClose={() => setOpenErrorDialog(false)}
                aria-labelledby="success-message"
            >
                <DialogTitle id="success-message">Оголошення успішно додане</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenSuccessDialog(false);
                        window.location.href = '/profile-page';
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
    AdvertCreatePage,
}