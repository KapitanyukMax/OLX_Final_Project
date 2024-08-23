import React, { useState } from 'react';
import { Button, Box, StyledEngineProvider } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import { StyledCheckBox } from '../../components/checkBox';
import HorizontalLineIcon from '../../components/icons/horizontalLine';
import GoogleIcon from '../../components/icons/google';
import FacebookIcon from '../../components/icons/facebook';
import AppleIcon from '../../components/icons/apple';
import PasswordIcon from '../../components/icons/password';

export const LoginModal = ({ onSwitchToRegister, onSwitchToForgotPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Помилка входу: ' + error);
        }
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
                            <StyledInput widthType='big' value='vikka3467@gmail.com' onChange={handleEmailChange}/>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Пароль' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput widthType='big' value={password} isPassword iconEnd={PasswordIcon} iconEndClick={handleTogglePasswordVisibility} type={showPassword?'text':'password'}
                            onChange={handlePasswordChange} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '22px', width: '568px', marginTop: '12px', marginBottom: '36px' }}>
                <StyledCheckBox label="Запам'ятати мене" />
                <StyledLabel text='Забули пароль?' textType='small' type='with-icon' textColor='var(--blue)' onClick={onSwitchToForgotPassword} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '42px' }}>
                <StyledEngineProvider injectFirst>
                    <Button onClick={handleLogin} sx={{ width: '456px', height: '48px', backgroundColor: 'var(--blue)', color: 'white', borderRadius: '15px', fontFamily: 'Nunito', gap: '8px' }}>
                        Увійти
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
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
                <Box sx={{ border: '1px solid black', padding: '16px', borderRadius: '10px' }}>
                    <AppleIcon />
                </Box>
                <Box sx={{ border: '1px solid black', padding: '16px', borderRadius: '10px' }}>
                    <GoogleIcon />
                </Box>
                <Box sx={{ border: '1px solid black', padding: '16px', borderRadius: '10px' }}>
                    <FacebookIcon />
                </Box>
            </Box>
        </Box>
    );
};
