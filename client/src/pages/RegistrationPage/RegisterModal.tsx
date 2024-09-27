import React, { useState } from 'react';
import { StyledEngineProvider, Button, Box } from '@mui/material';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import HorizontalLineIcon from '../../components/icons/horizontalLine';
import GoogleIcon from '../../components/icons/google';
import FacebookIcon from '../../components/icons/facebook';
import AppleIcon from '../../components/icons/apple';
import PasswordIcon from '../../components/icons/password';
import { iconBoxStyles } from './Styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

interface RegisterModalProps {
    onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ onSwitchToLogin }) => {
    const [emailOrPhone, setEmailOrPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const host = import.meta.env.VITE_HOST;

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if (!name) {
            setError('Будь ласка, введіть ім\'я');
            return;
        }
        let email: string | null = null;
        let phone: string | null = null;
    
        if (validateEmail(emailOrPhone)) {
            email = emailOrPhone;
        } else if (validatePhoneNumber(emailOrPhone)) {
            phone = emailOrPhone;
        } else {
            setError('Неправильний формат електронної пошти або телефону');
            return;
        }
        if (!password) {
            setError('Будь ласка, введіть пароль');
            return;
        }
        
        try {
            const response = await fetch(`${host}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email: email ?? null,
                    phone: phone ?? null,
                    currencyId: '',
                    isAdmin: false,
                    password,
                    picture: '',
                    rating: 0,
                    verifyCode: '',
                    resetCodeExpiry:'',
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(`Помилка реєстрації: ${errorData.message}`);
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User was added to Firebase : ", userCredential);
            onSwitchToLogin();
            console.log('User registered and added to Firestore successfully');
        } catch (error: any) {
            console.error('Error registering user:', error);
            setError('Помилка реєстрації: ' + (error.message || 'Невідома помилка'));
        }
    };
    
    
    const handleAppleLogin = () => {
        console.log('Apple login clicked');
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
    };

    const handleFacebookLogin = () => {
        console.log('Facebook login clicked');
    };

    return (
        <Box sx={{ boxSizing: 'border-box', padding: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '60px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <StyledLabel text='Зареєструватися' textType='head' type='head' textColor='var(--blue)' />
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text="Ваше ім'я" textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput widthType='big' value={name} onChange={handleNameChange}/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Електронна пошта чи телефон' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput widthType='big' value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)}/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Пароль' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput widthType='big' value={password} iconEnd={PasswordIcon} iconEndClick={handleTogglePasswordVisibility} type={showPassword ? 'text' : 'password'} onChange={handlePasswordChange} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '42px', margin:' 36px 0px 42px 0px' }}>
                        <StyledEngineProvider injectFirst>
                            <Button
                                type="submit"
                                sx={{
                                    width: '456px',
                                    height: '48px',
                                    backgroundColor: 'var(--blue)',
                                    color: 'white',
                                    borderRadius: '15px',
                                    fontFamily: 'Nunito',
                                    gap: '8px',
                                    '&:hover': {
                                        backgroundColor: 'var(--green)',
                                        color: 'black',
                                    },
                                }}
                            >
                                Зареєструватися
                            </Button>
                        </StyledEngineProvider>
                    </Box>
                </form>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '4px' }}>
                <StyledLabel text="Вже маєте акаунт?" type='with-icon' textType='small' />
                <StyledLabel text="Увійти" type='with-icon' textType='small-bold' onClick={onSwitchToLogin} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '48px', gap: '16px' }}>
                <HorizontalLineIcon />
                <StyledLabel text='Увійти за допомогою' type='with-icon' textType='small' />
                <HorizontalLineIcon />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '51px', marginTop: '30px' }}>
                <Box sx={iconBoxStyles} onClick={handleAppleLogin}>
                    <AppleIcon />
                </Box>
                <Box sx={iconBoxStyles} onClick={handleGoogleLogin}>
                    <GoogleIcon />
                </Box>
                <Box sx={iconBoxStyles} onClick={handleFacebookLogin}>
                    <FacebookIcon />
                </Box>
            </Box>
        </Box>
    );
};
