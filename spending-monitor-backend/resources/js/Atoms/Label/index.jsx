import React from 'react';
import './Label.scss';

const Label = ({
    children,
    htmlFor,
    required = false,
    disabled = false,
    size = 'medium',
    className = '',
    ...props
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`
                label
                label--${size}
                ${required ? 'label--required' : ''}
                ${disabled ? 'label--disabled' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
            {required && <span className="label__required-mark">*</span>}
        </label>
    );
};

export default Label;
