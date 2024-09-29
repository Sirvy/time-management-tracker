import React, { ReactNode, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenValid, refreshTokenIfExpired, removeTokens } from '../Services/AuthService';
import { useAuth } from '../Providers/AuthProvider';

// Define the type for the props
interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const { isLoggedIn, setAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const refreshLogin = async () => {
            await refreshTokenIfExpired();
            setAuth(isTokenValid());
        }
        refreshLogin();
    }, [])

    const handleLogout = () => {
        setAuth(false);
        removeTokens();
        navigate('/');
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
                        {isLoggedIn ? (
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
