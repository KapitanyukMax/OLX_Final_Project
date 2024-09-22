import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import StyledLabel from '../../components/lable';
import { StyledInput } from '../../components/input';

interface EnterVerifyModalProps {
  email: string;
  onSwitchToResetPassword: () => void;
}

export const EnterVerifyModal: React.FC<EnterVerifyModalProps> = ({ email, onSwitchToResetPassword }) => {
  const [timer, setTimer] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const host = import.meta.env.VITE_HOST;

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setIsButtonDisabled(false);
    }
  }, [timer]);

  const ReSendPassword = async () => {
    try {
      const response = await fetch(`${host}/resetPass/re-send-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Password reset code re-sent');
        setTimer(30);
        setIsButtonDisabled(true);
      } else {
        const data = await response.json();
        console.error(data.message || 'Сталася помилка при повторній відправці коду');
      }
    } catch (error) {
      console.error('Error re-sending password reset code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${host}/resetPass/verify-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode: verificationCode }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Код підтверджено успішно');
        setIsCodeValid(true);
        localStorage.setItem('resetUserId', result.userId);
        onSwitchToResetPassword();
      } else {
        setErrorMessage(result.message || 'Невірний код.');
        console.error(result.message || 'Невірний код.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrorMessage('Сталася помилка при перевірці коду');
    }
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 30px',
        width: '688px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '36px',
        }}
      >
        <StyledLabel type='head' text='2/3' textType='head' textColor='var(--blue)' />
        <StyledLabel type='head' text='Введіть код' textType='head' textColor='var(--blue)' />
      </Box>
      <Box sx={{ marginTop: '10px', marginBottom: '32px' }}>
        <StyledLabel
          type='primary'
          text='Ми надіслали вам код підтвердження'
          textType='middle'
          textColor='var(--black)'
          textAlign='center'
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <StyledLabel type='with-icon' text='Введіть код' textType='small' />
        <StyledInput
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          widthType='big'
        />
        {errorMessage && <StyledLabel type='with-icon' text={errorMessage} textType='small' />}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '12px',
        }}
      >
        <StyledLabel
          type='with-icon'
          text={`Надіслати повторно через 00:${timer < 10 ? `0${timer}` : timer}`}
          textType='small'
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '32px',
        }}
      >
        <Button
          onClick={handleVerifyCode}
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
          Продовжити
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button
          onClick={ReSendPassword}
          disabled={isButtonDisabled}
          sx={{
            width: '456px',
            height: '48px',
            backgroundColor: isButtonDisabled ? 'var(--grey)' : 'var(--blue)',
            color: 'white',
            borderRadius: '15px',
            fontFamily: 'Nunito',
            gap: '8px',
            '&:hover': {
              backgroundColor: isButtonDisabled ? 'var(--grey)' : 'var(--green)',
              color: 'black',
            },
          }}
        >
          Надіслати код повторно
        </Button>
      </Box>
    </Box>
  );
};
