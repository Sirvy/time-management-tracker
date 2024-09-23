import React from "react";
import logo from '../Assets/logo.svg';
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';

export const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <img src={logo} alt="logo" style={{ width: '150px', height: '150px' }} />
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to TimeLance
                </Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>
                    Your ultimate tool for time management and productivity improvement
                </Typography>
                {!isAuthenticated ? (
                    <Box mt={2}>
                        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
                            Login
                        </Button>
                        <Button variant="outlined" color="primary" component={Link} to="/register">
                            Register
                        </Button>
                    </Box>
                ) : (
                    <Box mt={2}>
                        <Button variant="contained" color="primary" component={Link} to="/user/profile" sx={{ mr: 2 }}>
                            Profile
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
                            Logout
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}