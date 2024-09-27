import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useLogin } from '../hooks/data-hooks/useLogin';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();    
    const [message, setMessage] = useState(useLocation().state?.message);

    const { mutate: handleLogin, isLoading } = useLogin();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        handleLogin({ username, password }, {
            onSuccess: (data) => {
                login(data.token);
                navigate('/');
                window.location.reload();
            },
            onError: (error) => {
                if (error.response?.status === 404 || error.response?.status === 401) {
                    setError('Invalid username or password. Please try again.');
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        })
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Login Page
            </Typography>            
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </Box>
        </Container>
    );
};