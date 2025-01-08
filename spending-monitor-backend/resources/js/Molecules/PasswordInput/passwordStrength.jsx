import React from 'react';

const PasswordStrength = ({ password }) => {
    const calculateStrength = (pass) => {
        let strength = 0;
        
        if (!pass) return strength;
        
        if (pass.length >= 8) strength += 1;
        if (/\d/.test(pass)) strength += 1;
        if (/[a-z]/.test(pass)) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
        
        return strength;
    };

    const getStrengthColor = (level) => {
        const colors = {
            1: 'var(--danger-color, #dc3545)',      // Red
            2: 'var(--warning-color, #ffc107)',      // Yellow
            3: 'var(--info-color, #17a2b8)',        // Blue
            4: 'var(--success-color, #28a745)',      // Green
            5: 'var(--primary-color, #6f42c1)',      // Purple
            
        };
        return colors[level] || '#ddd';
    };

    const strength = calculateStrength(password);
    const strengthText = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strength];
    
    return (
        <div className="password-strength">
            <div className="password-strength__meter">
                {[...Array(5)].map((_, index) => (
                    <div 
                        key={index}
                        className={`password-strength__bar ${index < strength ? 'active' : ''}`}
                        style={index < strength ? { backgroundColor: getStrengthColor(strength) } : {}}
                    />
                ))}
            </div>
            <div className="password-strength__text" style={{ color: strength > 0 ? getStrengthColor(strength) : '#666' }}>
                {password && strengthText}
            </div>
        </div>
    );
};

export default PasswordStrength; 