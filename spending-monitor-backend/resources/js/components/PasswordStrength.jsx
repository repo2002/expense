import React from 'react';
import '../../sass/components/_password-strength.scss';

function PasswordStrength({ password, isVisible }) {
    const requirements = [
        { regex: /.{8,}/, text: "At least 8 characters long" },
        { regex: /[A-Z]/, text: "Contains uppercase letter" },
        { regex: /[0-9]/, text: "Contains number" },
    ];

    const calculateStrength = () => {
        let strength = 0;
        requirements.forEach(requirement => {
            if (requirement.regex.test(password)) {
                strength += 1;
            }
        });
        return (strength / requirements.length) * 100;
    };

    const getStrengthText = () => {
        const strength = calculateStrength();
        if (strength === 0) return '';
        if (strength <= 33) return 'Weak';
        if (strength <= 66) return 'Medium';
        return 'Strong';
    };

    if (!isVisible) return null;

    return (
        <div className="password-strength">
            <div className="password-strength__bar">
                <div 
                    className={`password-strength__progress ${getStrengthText().toLowerCase()}`}
                    style={{ width: `${calculateStrength()}%` }}
                />
            </div>
            <div className="password-strength__requirements">
                {requirements.map((requirement, index) => (
                    <div 
                        key={index} 
                        className={`requirement ${requirement.regex.test(password) ? 'met' : ''}`}
                    >
                        <span className="check-mark">
                            {requirement.regex.test(password) ? '✓' : '○'}
                        </span>
                        {requirement.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PasswordStrength; 