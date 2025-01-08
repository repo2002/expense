import React from 'react';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';
import './FormField.scss';

const FormField = ({
    label,
    id,
    required = false,
    error,
    type = 'text',
    size = 'medium',
    disabled = false,
    component: Component,
    ...props
}) => {
    return (
        <div className="form-field">
            {label && (
                <Label 
                    htmlFor={id}
                    required={required}
                    disabled={disabled}
                    size={size}
                >
                    {label}
                </Label>
            )}
            
            {Component ? (
                <Component 
                    id={id}
                    {...props}
                />
            ) : (
                <Input
                    id={id}
                    type={type}
                    error={error}
                    disabled={disabled}
                    size={size}
                    {...props}
                />
            )}

            {error && (
                <div className="form-field__error">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FormField;
