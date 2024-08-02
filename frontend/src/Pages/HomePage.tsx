import React from "react"
import logo from '../Assets/logo.svg';
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            <h1>Home Page</h1>
            <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
            
            {!isAuthenticated && (
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            )}
            {isAuthenticated && (
                <ul>
                    <li><Link to="/user/profile">Profile</Link></li>
                </ul>
            )}
        </div>
    )
}