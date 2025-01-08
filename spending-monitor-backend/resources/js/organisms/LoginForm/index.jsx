import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../Molecules/FormField';
import PasswordInput from '../../Molecules/PasswordInput';
import Button from '../../atoms/Button';
import Link from '../../atoms/Link';
import API, { getCsrfCookie } from '../../api/axios';
import './LoginForm.scss';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            await API.get('/sanctum/csrf-cookie');

            
            const response = await API.post('/login', {
                email,
                password,
                remember: remember
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: error.response?.data?.message || 'An error occurred during login.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-form__title">Welcome Back</h2>
            
            {errors.general && (
                <div className="login-form__error">{errors.general}</div>
            )}

            <FormField
                label="Email"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
            />

            <PasswordInput 
                label="Password"
                id="password"
                required
                error={errors.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-form__forgot-password">
                <Link to="/forgot-password" variant="secondary" size="small">
                    Forgot your password?
                </Link>
            </div>

            <div className="login-form__remember">
                <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
            </div>

            <Button 
                type="submit" 
                variant="primary"
                fullWidth 
                isLoading={isLoading}
            >
                Log In
            </Button>

            <div className="login-form__register">
                Don't have an account?{' '}
                <Link to="/register">Sign up</Link>
            </div>
        </form>
    );
};

export default LoginForm;
