import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';

export const ForgotPasswordModal = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Password reset email sent');
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };

    return (
        <Box>
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Button onClick={handleForgotPassword}>Send Reset Email</Button>
            <Button onClick={onSwitchToLogin}>Back to Login</Button>
        </Box>
    );
};
