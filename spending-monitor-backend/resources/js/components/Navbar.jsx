import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await API.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            navigate('/login');
        } catch (error) {
            alert('Logout failed: ' + error.response.data.message);
        }
    };

    return (
        <nav>
            <h1>My Application</h1>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;