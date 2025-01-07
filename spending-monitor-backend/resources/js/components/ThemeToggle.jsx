import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../../sass/components/_theme-toggle.scss';

function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <span className="theme-toggle__icon">
                {isDarkMode ? '☀️' : '🌙'}
            </span>
        </button>
    );
}

export default ThemeToggle; 