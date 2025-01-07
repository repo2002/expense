import React, { forwardRef } from 'react';
import './Input.scss';

const Input = forwardRef(({
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    size = 'medium',
    fullWidth = true,
    onFocus,
    onBlur,
    ...props
}, ref) => {
    return (
        <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''}`}>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    input 
                    input--${size}
                    ${error ? 'input--error' : ''}
                    ${disabled ? 'input--disabled' : ''}
                `}
                {...props}
            />
            {error && <span className="input__error-message">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
