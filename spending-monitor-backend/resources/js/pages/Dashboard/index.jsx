import React from 'react';
import DashboardTemplate from '../../templates/DashboardTemplate';
import Button from '../../atoms/Button';
import './Dashboard.scss';

const DashboardPage = () => {
    return (
        <DashboardTemplate
            title="Dashboard"
            actions={
                <Button variant="primary">
                    Add Transaction
                </Button>
            }
        >
            <div className="dashboard-page">
                {/* Add your dashboard content here */}
                <div className="dashboard-page__stats">
                    {/* Stats cards will go here */}
                </div>
                <div className="dashboard-page__transactions">
                    {/* Transactions list will go here */}
                </div>
            </div>
        </DashboardTemplate>
    );
};

export default DashboardPage; 