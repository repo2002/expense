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
    ...inputProps
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
            <Input
                id={id}
                type={type}
                error={error}
                disabled={disabled}
                size={size}
                {...inputProps}
            />
        </div>
    );
};

export default FormField;
