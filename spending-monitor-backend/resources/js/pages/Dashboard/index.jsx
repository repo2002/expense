import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import DashboardTemplate from '../../templates/DashboardTemplate';
import Button from '../../atoms/Button';
import './Dashboard.scss';

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await API.get('/dashboard');
                setDashboardData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                {/* Summary Cards */}
                <div className="dashboard-page__summary">
                    <div className="summary-card">
                        <h3>Monthly Budget</h3>
                        <p>${dashboardData?.summary.total_budget.toFixed(2)}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Total Expenses</h3>
                        <p>${dashboardData?.summary.total_expenses.toFixed(2)}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Remaining Budget</h3>
                        <p>${dashboardData?.summary.remaining_budget.toFixed(2)}</p>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="dashboard-page__categories">
                    <h2>Spending by Category</h2>
                    <div className="categories-grid">
                        {dashboardData?.summary.categories.map((category) => (
                            <div 
                                key={category.name} 
                                className="category-card"
                                style={{ borderColor: category.color }}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <h4>{category.name}</h4>
                                <p>${category.total.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="dashboard-page__transactions">
                    <h2>Recent Transactions</h2>
                    <div className="transactions-list">
                        {dashboardData?.recent_transactions.map((transaction) => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-info">
                                    <span className="category-tag" style={{ backgroundColor: transaction.category.color }}>
                                        {transaction.category.name}
                                    </span>
                                    <p className="transaction-date">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="transaction-amount">
                                    ${transaction.amount.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Bills */}
                <div className="dashboard-page__bills">
                    <h2>Upcoming Bills</h2>
                    <div className="bills-list">
                        {dashboardData?.upcoming_bills.map((bill) => (
                            <div key={bill.id} className="bill-item">
                                <h4>{bill.name}</h4>
                                <p>Due: {new Date(bill.due_date).toLocaleDateString()}</p>
                                <p>${bill.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardTemplate>
    );
};

export default DashboardPage; 