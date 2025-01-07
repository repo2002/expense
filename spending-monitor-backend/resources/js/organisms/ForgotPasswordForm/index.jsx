import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../Molecules/FormField';
import Button from '../../atoms/Button';
import Link from '../../atoms/Link';
import axios from '../../api/axios';
import './ForgotPasswordForm.scss';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await axios.post('/forgot-password', { email });
            setSuccess(true);
        } catch (error) {
            setError(
                error.response?.data?.message || 
                'An error occurred. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="forgot-password-form forgot-password-form--success">
                <h3>Check Your Email</h3>
                <p>We've sent password reset instructions to {email}</p>
                <Button 
                    variant="secondary" 
                    onClick={() => navigate('/login')}
                >
                    Return to Login
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="forgot-password-form">
            {error && (
                <div className="forgot-password-form__error">
                    {error}
                </div>
            )}

            <FormField
                label="Email Address"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
            />

            <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
            >
                Send Reset Instructions
            </Button>

            <div className="forgot-password-form__footer">
                Remember your password?{' '}
                <Link to="/login">Sign in</Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm; 