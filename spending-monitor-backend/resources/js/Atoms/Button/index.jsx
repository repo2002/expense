import React from 'react';
import './Button.scss';

const Button = ({ 
    children, 
    type = 'button', 
    variant = 'primary', 
    size = 'medium',
    fullWidth = false,
    isLoading = false,
    disabled = false,
    onClick,
    ...props 
}) => {
    return (
        <button
            type={type}
            className={`
                button 
                button--${variant} 
                button--${size}
                ${fullWidth ? 'button--full-width' : ''}
                ${isLoading ? 'button--loading' : ''}
            `}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...props}
        >
            {isLoading ? (
                <span className="button__loader"></span>
            ) : children}
        </button>
    );
};

export default Button;
