import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './Link.scss';

const Link = ({
    children,
    to,
    external = false,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    underline = false,
    className = '',
    onClick,
    ...props
}) => {
    const linkClass = `
        link
        link--${variant}
        link--${size}
        ${underline ? 'link--underline' : ''}
        ${disabled ? 'link--disabled' : ''}
        ${className}
    `;

    if (external) {
        return (
            <a
                href={to}
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
                onClick={disabled ? (e) => e.preventDefault() : onClick}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <RouterLink
            to={to}
            className={linkClass}
            onClick={disabled ? (e) => e.preventDefault() : onClick}
            {...props}
        >
            {children}
        </RouterLink>
    );
};

export default Link;
