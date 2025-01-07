import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import '../../sass/components/_navbar.scss';
import ThemeToggle from './ThemeToggle';



function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await API.post('/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <Link to="/">SpendingMonitor</Link>
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

            <div className={`navbar__links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" className="navbar__link" onClick={() => setIsMenuOpen(false)}>About</Link>
                
                
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="navbar__link">Dashboard</Link>
                        <Link to="/profile" className="navbar__link">Profile</Link>
                        <button 
                            onClick={handleLogout} 
                            className="navbar__link navbar__link--button"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar__link">Login</Link>
                        <Link to="/register" className="navbar__link navbar__link--highlight">Register</Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
}

export default Navbar;