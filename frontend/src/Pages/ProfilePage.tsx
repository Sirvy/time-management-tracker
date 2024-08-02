import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ProfilePage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>
            <h1>Protected Page</h1>
            <p>{message}</p>
        </div>
    );
};
