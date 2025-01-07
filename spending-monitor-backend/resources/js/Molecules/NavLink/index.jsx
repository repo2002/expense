import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import './NavLink.scss';

const NavLink = ({
    children,      // The content inside the link (text or components)
    to,            // The destination path/URL
    icon,          // Optional icon component to show before text
    badge,         // Optional badge/notification count
    end = false,   // If true, link is only active on exact path match
    className = '', // Additional CSS classes
    activeClassName = '', // CSS class to apply when link is active
    ...props
}) => {
    return (
        <RouterNavLink
            to={to}
            end={end}
            className={({ isActive }) => `
                nav-link
                ${isActive ? 'nav-link--active' : ''}
                ${className}
            `}
            {...props}
        >
            {icon && <span className="nav-link__icon">{icon}</span>}
            <span className="nav-link__text">{children}</span>
            {badge && <span className="nav-link__badge">{badge}</span>}
        </RouterNavLink>
    );
};

export default NavLink;
