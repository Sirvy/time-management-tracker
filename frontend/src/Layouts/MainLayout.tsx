import React, { ReactNode, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Define the type for the props
interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const { isAuthenticated, logout } = useAuth();
    const [auth, setAuth] = useState(isAuthenticated);

    const navigate = useNavigate();

    useEffect(() => {
        setAuth(isAuthenticated);
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
        setAuth(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
                            TimeLance
                        </Link>
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
                            Home
                        </Link>
                        <Link to="/test" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
                            Test
                        </Link>
                        {auth ? (
                            <>
                                <Link to="/user/profile" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
                                    Profile
                                </Link>
                                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleLogout}>
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
                                    Login
                                </Link>
                                <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    Register
                                </Link>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Container component="main"  sx={{ mt: 8, mb: 2}} maxWidth="xl">
                {children}
            </Container>
        </>
    );
};

export default MainLayout;
