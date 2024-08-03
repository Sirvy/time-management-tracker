import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Avatar, Paper, Button } from '@mui/material';

export const ProfilePage = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.message);
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                        {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {username}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Welcome to your personal profile page!
                    </Typography>
                    <Button sx={{ marginTop: 5 }} variant="outlined" color="secondary" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
                        Logout
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
