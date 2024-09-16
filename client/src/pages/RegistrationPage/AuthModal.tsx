import React, { useState } from 'react';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { EnterVerifyModal } from './EnterVerifyCodeModal';
import { Box } from '@mui/material';
import { Header } from '../../components/header';
import backgroundImage from './../../assets/background.svg';
import { ResetPasswordModal } from './ResetPasswordModal.tsx';
import { PasswordChangedSuccessfullyModal} from './PasswordChangedSuccessfullyModal.tsx'


export const AuthModal = () => {
    const [modalState, setModalState] = useState<'login' | 'register' | 'forgotPassword' | 'enterVerifyCodeModal' | 'resetPassword' | 'successfullyChangedModal'>('login');
    const [email, setEmail] = useState<string>('');

    const handleSwitchToForgotPassword = () => {
        setModalState('forgotPassword');
    };

    const handleSwitchToRegister = () => {
        setModalState('register');
    };

    const handleSwitchToLogin = () => {
        setModalState('login');
    };

    const handleSwitchToEnterVerifyCode = (email: string) => {
        setEmail(email);
        setModalState('enterVerifyCodeModal');
    };

    const handleSwitchToResetPassword = () => {
        setModalState('resetPassword');
    };

    const handleSwitchToSuccessPageModal = () => {
        setModalState('successfullyChangedModal');
    };

    return (
        <Box>
            <Box>
                <Header />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                        background: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '628px',
                            backgroundColor: 'white',
                            gap: '30px',
                        }}
                    >
                        {modalState === 'login' && (
                            <LoginModal
                                onSwitchToRegister={handleSwitchToRegister}
                                onSwitchToForgotPassword={handleSwitchToForgotPassword}
                            />
                        )}
                        {modalState === 'register' && (
                            <RegisterModal
                                onSwitchToLogin={handleSwitchToLogin}
                            />
                        )}
                        {modalState === 'forgotPassword' && (
                            <ForgotPasswordModal
                                onSwitchToLogin={handleSwitchToLogin}
                                onSwitchToEnterVerifyCode={handleSwitchToEnterVerifyCode}
                            />
                        )}
                        {modalState === 'enterVerifyCodeModal' && (
                            <EnterVerifyModal
                                onSwitchToResetPassword={handleSwitchToResetPassword}
                                email={email}
                            />
                        )}
                        {modalState === 'resetPassword' && (
                            <ResetPasswordModal
                                onSwitchToSuccessPageModal={handleSwitchToSuccessPageModal}
                            />
                        )}
                        {modalState === 'successfullyChangedModal' &&(
                            <PasswordChangedSuccessfullyModal
                                onSwitchToLogin={handleSwitchToLogin}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
