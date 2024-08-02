import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/register', { username, password, email });
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
