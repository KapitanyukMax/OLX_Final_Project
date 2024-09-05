import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';
import ArrowUpIcon from '../../components/icons/arrowUp';

interface ForgotPasswordModalProps {
    onSwitchToLogin: () => void;
    onSwitchToEnterVerifyCode: (contact: string) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onSwitchToLogin, onSwitchToEnterVerifyCode }) => {
    const [contact, setContact] = useState('');
    const [error, setError] = useState<string>('');

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact(e.target.value);
        setError('');
    };

    const handleForgotPassword = async () => {
        if (!contact) {
            setError('Поле не може бути пустим');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/resetPass/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact }),
            });
    
            if (response.ok) {
                console.log('Password reset code sent');
                onSwitchToEnterVerifyCode(contact);
            } else {
                const data = await response.json();
                setError(data.message || 'Сталася помилка при надсиланні запиту');
            }
        } catch (error) {
            console.error('Error sending password reset request:', error);
            setError('Сталася помилка при надсиланні запиту');
        }
    };

    return (
        <Box sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            padding: '40px 35px',
            width: '618px',
        }}>
            <StyledLabel type='head' text='1/3' textType='head' textColor="var(--blue)" />
            <StyledLabel type='head' text='Забули пароль?' textType='head' textColor='var(--blue)' />
            <StyledLabel type='primary' text="Яка електронна пошта або номер телефону зв'язані з вашим профілем DDX?" textType='middle' textColor='var(--black)' textAlign='center' />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                gap: '8px',
                marginBottom: '12px',
            }}>
                <StyledLabel type='with-icon' text='Електронна пошта або телефон' textType='small' />
                <StyledInput value={contact} onChange={handleContactChange} widthType='big' />
                {error && (
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <Typography color='error' sx={{ marginTop: '8px' }}>
                            {error}
                        </Typography>
                    </Box>
                )}
            </Box>
            <Button onClick={handleForgotPassword} sx={{ width: '456px', height: '48px', backgroundColor: 'var(--blue)', color: 'white', borderRadius: '15px', fontFamily: 'Nunito', gap: '8px',
                '&:hover': {
                        backgroundColor: 'var(--green)',
                        color:'black'
                 },
             }}>
                Продовжити
            </Button>
            <Box onClick={onSwitchToLogin} sx={{
                display: 'flex',
                width: '454px',
                padding: '15px',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '8px',
            }}>
                <StyledLabel text='Повернутись назад' type='with-icon' icon={ArrowUpIcon} textType='small' onClick={onSwitchToLogin}/>
            </Box>
        </Box>
    );
};
