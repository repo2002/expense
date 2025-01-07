import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import '../../sass/components/_register.scss';
import PasswordStrength from './PasswordStrength';


function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await API.post('/register', {
                name,
                surname,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred during registration.' });
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-card__header">
                    Register
                </div>
                
                {errors.general && (
                    <div className="error-message">{errors.general}</div>
                )}
                
                <form onSubmit={handleSubmit} className="register-card__form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className={errors.name ? 'error' : ''}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <div className="error-message">{errors.name[0]}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Sur Name</label>
                        <input
                            type="text"
                            className={errors.surname ? 'error' : ''}
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        {errors.surname && (
                            <div className="error-message">{errors.surname[0]}</div>
                        )}
                    </div>

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
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />
                        <PasswordStrength 
                            password={password} 
                            isVisible={isPasswordFocused}
                        />
                        {errors.password && (
                            <div className="error-message">{errors.password[0]}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className={errors.password_confirmation ? 'error' : ''}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        {errors.password_confirmation && (
                            <div className="error-message">
                                {errors.password_confirmation[0]}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;