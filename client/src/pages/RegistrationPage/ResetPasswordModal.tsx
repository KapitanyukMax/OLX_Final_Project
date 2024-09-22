import React, { useEffect, useState } from 'react';
import { Button, Box, StyledEngineProvider } from '@mui/material';
import StyledLabel from '../../components/lable';
import PasswordIcon from '../../components/icons/password';
import { StyledInput } from '../../components/input';
import { getAuth, updatePassword} from 'firebase/auth';
interface ResetPasswordModalProps {
    onSwitchToSuccessPageModal:()=>void; 
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ onSwitchToSuccessPageModal }) => {
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [password, setPassword] = useState<string>(''); 
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');

    
    useEffect(() => {
        const storedUserId = localStorage.getItem('resetUserId');
        const storedEmail = localStorage.getItem('resetUserEmail'); // Отримання email
        if (storedUserId) {
            setUserId(storedUserId);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const auth = getAuth();
    const user = auth.currentUser;

    const host = import.meta.env.VITE_HOST;

    const handleResetPassword = async () => {
        if (password.length < 6) {
            setError('Пароль має містити принаймні 6 символів');
            return;
        }

        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }
        
        try {
            const response = await fetch(`${host}/resetPass/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    newPassword: password,
                }),
            });

            
            const data = await response.json();
                console.log(userId);
                console.log(password);
                console.log(data.message);
                console.log(response.status);

                
            if (response.ok) {
                try {
                    if (user) {
                        await updatePassword(user, password);
                        console.log("Пароль успішно змінено");
                    } else {
                        console.log("Користувач не автентифікований");
                    }
                } catch (error) {
                    console.error("Помилка при зміні пароля:", error);
                }
                onSwitchToSuccessPageModal();
            } else {
                
                setError(data.message || 'Помилка при оновленні паролю');
            }
        } catch (error) {
            console.error('Помилка при скиданні паролю:', error);
            setError('Помилка при з\'єднанні з сервером');
        }
    };


    const handleTogglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleTogglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setError('Паролі не співпадають');
        } else {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setError('Паролі не співпадають');
        } else {
            setError('');
        }
    };

    return (
        <Box sx={{ boxSizing: 'border-box', padding: '40px 30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '36px' }}>
                    <StyledLabel text='3/3' textType='head' type='head' textColor='var(--blue)' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                    <StyledLabel text='Відновлення паролю' textType='head' type='head' textColor='var(--blue)' />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Новий пароль' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput 
                                widthType='big' 
                                value={password}
                                iconEnd={PasswordIcon} 
                                iconEndClick={handleTogglePasswordVisibility1} 
                                type={showPassword1 ? 'text' : 'password'}
                                onChange={handlePasswordChange} 
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '8px', width: '100%' }}>
                            <StyledLabel text='Підтвердіть пароль' textType='small' type='with-icon' textColor='var(--black)' />
                            <StyledInput 
                                widthType='big' 
                                value={confirmPassword}
                                iconEnd={PasswordIcon} 
                                iconEndClick={handleTogglePasswordVisibility2} 
                                type={showPassword2 ? 'text' : 'password'}
                                onChange={handleConfirmPasswordChange} 
                            />
                            {error && <StyledLabel text={error} textType='middle' textColor='red' type='with-icon'/>}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '42px', marginTop: '36px' }}>
                <StyledEngineProvider injectFirst>
                    <Button 
                        onClick={ handleResetPassword} 
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
                        }}
                    >
                        Продовжити
                    </Button>
                </StyledEngineProvider>
            </Box>
        </Box>
    );
};
