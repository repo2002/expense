import React from 'react';
import AuthTemplate from '../../templates/AuthTemplate';
import LoginForm from '../../organisms/LoginForm';
import './Login.scss';

const LoginPage = () => {
    return (
        <AuthTemplate
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
        >
            <LoginForm />
        </AuthTemplate>
    );
};

export default LoginPage; 