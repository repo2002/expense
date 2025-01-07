import React from 'react';
import AuthTemplate from '../../templates/AuthTemplate';
import ForgotPasswordForm from '../../organisms/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    return (
        <AuthTemplate
            title="Reset Password"
            subtitle="Enter your email to receive reset instructions"
        >
            <ForgotPasswordForm />
        </AuthTemplate>
    );
};

export default ForgotPasswordPage; 