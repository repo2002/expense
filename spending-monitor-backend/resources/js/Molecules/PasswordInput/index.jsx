import React, { useState } from 'react';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import PasswordStrength from './passwordStrength';
import './PasswordInput.scss';

const PasswordInput = ({ label, value, onChange, error, disabled, showStrength = false, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="password-input">
            {label && (
                <Label>
                    {label}
                </Label>
            )}
            <div className="password-input__field">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    error={error}
                    disabled={disabled}
                    {...props}
                />
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    className="password-input__toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={disabled}
                >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                </Button>
            </div>
            {showStrength && <PasswordStrength password={value} />}
        </div>
    );
};

export default PasswordInput;
