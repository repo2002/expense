import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/'); // Redirect to dashboard
        } catch (error) {
            alert('Login failed: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;