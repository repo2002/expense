import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import '../../sass/components/_login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await API.post('/login', {
                email,
                password
            });
            
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: error.response?.data?.message || 'Invalid credentials' });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-card__header">
                    Login
                </div>
                
                {errors.general && (
                    <div className="error-message">{errors.general}</div>
                )}
                
                <form onSubmit={handleSubmit} className="login-card__form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className={errors.email ? 'error' : ''}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <div className="error-message">{errors.email[0]}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={errors.password ? 'error' : ''}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <div className="error-message">{errors.password[0]}</div>
                        )}
                    </div>

                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;