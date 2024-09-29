// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ isLoggedIn: false, setAuth: (auth: boolean) => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setAuth = (auth: boolean) => {
        setIsLoggedIn(auth);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};