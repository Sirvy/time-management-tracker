import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { TestPage } from './Pages/TestPage';
import { LoginPage } from './Pages/LoginPage';
import { ProfilePage } from './Pages/ProfilePage';
import { PrivateRoute } from './Routers/PrivateRoute';
import { RegisterPage } from './Pages/RegisterPage';
import MainLayout from './Layouts/MainLayout';

const App = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/user" element={<PrivateRoute />}>
                        <Route path="/user/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </MainLayout>
        </Router>
    )
}

export default App;