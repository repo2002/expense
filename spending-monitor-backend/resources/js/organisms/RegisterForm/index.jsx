import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../Molecules/FormField';
import PasswordInput from '../../Molecules/PasswordInput';
import Button from '../../atoms/Button';
import Link from '../../atoms/Link';
import axios from '../../api/axios';
import './RegisterForm.scss';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            const response = await axios.post('/register', formData);
            
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: error.response?.data?.message || 'An error occurred during registration.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2 className="register-form__title">Create Account</h2>
            
            {errors.general && (
                <div className="register-form__error">{errors.general}</div>
            )}

            <div className="register-form__name-group">
                <FormField
                    label="First Name"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <FormField
                    label="Last Name"
                    id="surname"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleChange}
                    error={errors.surname}
                />
            </div>

            <FormField
                label="Email"
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <FormField
                label="Password"
                id="password"
                name="password"
                required
                component={PasswordInput}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            <FormField
                label="Confirm Password"
                id="password_confirmation"
                name="password_confirmation"
                required
                component={PasswordInput}
                value={formData.password_confirmation}
                onChange={handleChange}
                error={errors.password_confirmation}
            />

            <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
            >
                Register
            </Button>

            <div className="register-form__login">
                Already have an account?{' '}
                <Link to="/login">Sign in</Link>
            </div>
        </form>
    );
};

export default RegisterForm; 