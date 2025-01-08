import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLink from '../../Molecules/NavLink';
import ThemeToggle from '../../components/ThemeToggle';
import Button from '../../atoms/Button';
import API from '../../api/axios';
import './Navbar.scss';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = async () => {
        try {
            await API.post('/logout');
            localStorage.removeItem('token'); // Remove auth token
            document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear CSRF cookie
            window.location.href = '/login'; // Force a full page reload to clear all state
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <NavLink to="/" end onClick={closeMenu}>
                    SpendingMonitor
                </NavLink>
                <button 
                    className={`navbar__hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`navbar__menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="navbar__links">
                    <NavLink to="/" end onClick={closeMenu}>
                        Home
                    </NavLink>
                    <NavLink to="/about" onClick={closeMenu}>
                        About
                    </NavLink>
                    {isAuthenticated ? (
                        <>
                        <NavLink to="/dashboard" onClick={closeMenu}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/profile" onClick={closeMenu}>
                                Profile
                            </NavLink>
                            <Button 
                                variant="warning"
                                size="medium"
                                onClick={() => {
                                    closeMenu();
                                    handleLogout();
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={closeMenu}>
                                Login
                            </NavLink>
                            <NavLink to="/register" onClick={closeMenu}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
                <div className="navbar__actions">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 