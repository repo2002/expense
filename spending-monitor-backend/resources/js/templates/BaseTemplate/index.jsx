import React from 'react';
import Navbar from '../../organisms/Navbar';
import './BaseTemplate.scss';

const BaseTemplate = ({ children }) => {
    return (
        <div className="base-template">
            <Navbar />
            <main className="base-template__content">
                {children}
            </main>
        </div>
    );
};

export default BaseTemplate; 