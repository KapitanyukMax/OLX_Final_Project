import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebaseConfig';

export const RegisterModal = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
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
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
            <Button onClick={onSwitchToLogin}>Back to Login</Button>
        </Box>
    );
};
