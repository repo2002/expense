import React from 'react';
import BaseTemplate from '../../templates/BaseTemplate';
import ExpenseForm from '../../organisms/ExpenseForm';
import './Home.scss';

const HomePage = () => {
    return (
        <BaseTemplate>
            <div className="home-page">
                <h1 className="home-page__title">Welcome to SpendingMonitor</h1>
                <ExpenseForm />
            </div>
        </BaseTemplate>
    );
};

export default HomePage;