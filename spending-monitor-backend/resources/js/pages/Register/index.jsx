import React from 'react';
import AuthTemplate from '../../templates/AuthTemplate';
import RegisterForm from '../../organisms/RegisterForm';
import './Register.scss';

const RegisterPage = () => {
    return (
        <AuthTemplate
            title="Create Account"
            subtitle="Join us and start managing your finances"
        >
            <RegisterForm />
        </AuthTemplate>
    );
};

export default RegisterPage; 