import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            localStorage.setItem('token', response.data.token);
            alert('Registration successful!');
            navigate('/'); // Redirect to the dashboard or login page
        } catch (error) {
            alert('Registration failed: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;