import React, { useState } from 'react';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { Box } from '@mui/material';
import { Header } from '../../components/header';
import backgroundImage from './../../assets/background.svg'

export const AuthModal = () => {
    const [modalState, setModalState] = useState<'login' | 'register' | 'forgotPassword'>('login');

    const handleSwitchToRegister = () => setModalState('register');
    const handleSwitchToForgotPassword = () => setModalState('forgotPassword');
    const handleSwitchToLogin = () => setModalState('login');

    return (
        <Box>
            <Box>
                <Header/>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height:'100vh',
                    width:'100vw',
                    background:`url(${backgroundImage})`,
                    backgroundSize:'cover',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '628px',
                        backgroundColor: 'white',
                        gap:'30px',
                        
                    }}>
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
                            />
                        )}
                    </Box>
                </Box>
            </Box>
            
        </Box>
    );
};
