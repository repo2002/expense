import React from 'react';
import BaseTemplate from '../../templates/BaseTemplate';
import './About.scss';

const AboutPage = () => {
    return (
        <BaseTemplate>
            <div className="about-page">
                <h1 className="about-page__title">About SpendingMonitor</h1>
                <div className="about-page__content">
                    <p>SpendingMonitor helps you track and manage your personal finances effectively.</p>
                    <div className="about-page__features">
                        <h2>Key Features</h2>
                        <ul>
                            <li>Track your expenses</li>
                            <li>Set budgets</li>
                            <li>View spending analytics</li>
                            <li>Manage multiple accounts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    );
};

export default AboutPage; 