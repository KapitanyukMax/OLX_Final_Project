import React, { useState, useEffect } from 'react';
import { Button, Box, StyledEngineProvider } from '@mui/material';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged  } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import { StyledCheckBox } from '../../components/checkBox';
import HorizontalLineIcon from '../../components/icons/horizontalLine';
import GoogleIcon from '../../components/icons/google';
import FacebookIcon from '../../components/icons/facebook';
import AppleIcon from '../../components/icons/apple';
import PasswordIcon from '../../components/icons/password';
import { useNavigate } from 'react-router-dom';
import { iconBoxStyles } from './Styles';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface LoginModalProps {
    onSwitchToRegister: () => void;
    onSwitchToForgotPassword: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onSwitchToRegister, onSwitchToForgotPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is logged in:', user);
                // Можеш зберігати статус автентифікації у state
            } else {
                console.log('No user is logged in');
            }
        });
    
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    
        return () => unsubscribe();
    }, []);

    const host = import.meta.env.VITE_HOST;

    const checkUserAuth = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Користувач автентифікований
                console.log('User is logged in:', user);
                console.log('User display name:', user.displayName);
            } else {
                // Користувач не автентифікований
                console.log('No user is logged in');
            }
        });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChangeWrapper = () => {
        setRememberMe(!rememberMe);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError('');
        if (!validateEmail(email)) {
            setError('Неправильний формат електронної пошти');
            return;
        }

        if (!password) {
            setError('Будь ласка, введіть пароль');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully');

            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            navigate('/components-preview');

        } catch (error: unknown) {
            console.error('Error logging in:', error);
            setError('Помилка входу: ' + (error || 'Невідома помилка'));
        }
    };
    const handleAppleLogin = () => {
        console.log('Apple login clicked');
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log('Google login successful', user);

            const userData = {
                name: user.displayName,
                email: user.email ?? null,
                phone: user.phoneNumber ?? null,
                currencyId: '',
                isAdmin: false,
                password,
                picture: '',
                rating: 0,
                verifyCode: '',
                resetCodeExpiry: '',
            };

            await fetch(`${host}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            navigate('/components-preview');
        }
        catch (error) {
            console.error('Google login error:', error);
            setError('Помилка входу через Google: ' + (error || 'Невідома помилка'));
        }
    };

    const handleFacebookLogin = () => {
        console.log('Facebook login clicked');
    };

    return (
        <Box sx={{ boxSizing: 'border-box', padding: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '60px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <StyledLabel text='Увійти' textType='head' type='head' textColor='var(--blue)' />
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Електронна пошта чи телефон' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput widthType='big' value={email} onChange={handleEmailChange} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Пароль' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput widthType='big' value={password} iconEnd={PasswordIcon} iconEndClick={handleTogglePasswordVisibility} type={showPassword ? 'text' : 'password'}
                                onChange={handlePasswordChange} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '22px', width: '568px', marginTop: '12px', marginBottom: '36px' }}>
                <StyledCheckBox label="Запам'ятати мене" checked={rememberMe} onChange={handleRememberMeChangeWrapper} />
                <StyledLabel text='Забули пароль?' textType='small' type='with-icon' textColor='var(--blue)' onClick={onSwitchToForgotPassword} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '42px' }}>
                <StyledEngineProvider injectFirst>
                    <Button
                        onClick={handleLogin}
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
                                color: 'black'
                            },
                        }}>
                        Увійти
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '4px' }}>
                            <StyledLabel text="Немає акаунту?" type='with-icon' textType='small' />
                            <StyledLabel text="Зареєструватись" type='with-icon' textType='small-bold' onClick={onSwitchToRegister} />
                        </Box>
                    </Box>
                </StyledEngineProvider>
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
