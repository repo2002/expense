import React from 'react';
import BaseTemplate from '../BaseTemplate';
import './AuthTemplate.scss';

const AuthTemplate = ({ children, title, subtitle }) => {
    return (
        <BaseTemplate>
            <div className="auth-template">
                <div className="auth-template__container">
                    {title && <h1 className="auth-template__title">{title}</h1>}
                    {subtitle && <p className="auth-template__subtitle">{subtitle}</p>}
                    {children}
                </div>
            </div>
        </BaseTemplate>
    );
};

export default AuthTemplate; 