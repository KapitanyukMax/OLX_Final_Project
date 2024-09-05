import React from 'react';
import { Button, Box } from '@mui/material';
import StyledLabel from '../../components/lable';
import CloudDoneIcon from '../../components/icons/successCloudIcon';


interface PasswordChangedSuccessfullyModalProps {
    onSwitchToLogin: () => void;
}

export const PasswordChangedSuccessfullyModal: React.FC<PasswordChangedSuccessfullyModalProps> = ({ onSwitchToLogin }) => {

    

    return (
        <Box sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 30px',
            width: '688px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center',
                gap: '60px',
            }}>
                <StyledLabel type='head' text='Пароль успішно змінено' textType='head' textColor="var(--blue)" />
                <CloudDoneIcon />
            </Box>
            <Box sx={{
                marginTop: '44px',
            }}>
                <Button onClick={onSwitchToLogin} sx={{ width: '456px', height: '48px', backgroundColor: 'var(--blue)', color: 'white', borderRadius: '15px', fontFamily: 'Nunito', gap: '8px',
                    '&:hover': {
                        backgroundColor: 'var(--green)',
                        color:'black'
                 },
                }}>
                Повернутись до сторінки входу
            </Button>
        </Box>
        </Box>
    );
};
