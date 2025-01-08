import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import DashboardTemplate from '../../templates/DashboardTemplate';
import CategoryTag from '../../components/CategoryTag/index';
import Button from '../../atoms/Button';
import Table from '../../organisms/Table/index';
import { formatAmount, formatCurrency } from '../../utils/formatters';
import ImageModal from '../../components/ImageModal';
import './Dashboard.scss';

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

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

    const columns = [
        {
            key: 'category',
            label: 'Category',
            render: (_, row) => row.category ? (
                <CategoryTag
                    name={row.category.name}
                    color={row.category.color}
                    icon={row.category.icon}
                />
            ) : '-'
        },
        {
            key: 'date',
            label: 'Date',
            render: (date) => date ? new Date(date).toLocaleDateString() : '-'
        },
        {
            key: 'location',
            label: 'Location'
        },
        {
            key: 'description',
            label: 'Description'
        },
        {
            key: 'payment_method',
            label: 'Payment Method'
        },
        {
            key: 'amount',
            label: 'Amount',
            
            render: (amount, row) => amount != null ? 
                formatCurrency(amount, row.currency) : '-'
        },
        {
            key: 'receipt_image',
            label: 'Receipt',
            align: 'center',
            render: (receipt) => receipt ? (
                <Button 
                    onClick={() => setSelectedReceipt(receipt)}
                    type="button"
                    variant="primary"
                    size="small"
                >
                    📎 View Receipt
                </Button>
            ) : '-'
        }
    ];

    return (
        <DashboardTemplate>
            <div className="dashboard-page">
                {/* Summary Cards */}
                <div className="dashboard-page__summary">
                    <div className="summary-card">
                        <h3>Monthly Budget</h3>
                        <p>€{dashboardData?.summary.total_budget.toFixed(2)}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Total Expenses</h3>
                        <p>€{dashboardData?.summary.total_expenses.toFixed(2)}</p>
                    </div>
                    <div className="summary-card">
                        <h3>Remaining Budget</h3>
                        <p>€{dashboardData?.summary.remaining_budget.toFixed(2)}</p>
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
                                <p>€{category.total.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="dashboard-page__transactions">
                    <h2>Recent Transactions</h2>
                    <Table 
                        columns={columns} 
                        data={dashboardData?.recent_transactions || []}
                    />
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

                {selectedReceipt && (
                    <ImageModal
                        imageUrl={selectedReceipt}
                        onClose={() => setSelectedReceipt(null)}
                    />
                )}
            </div>
        </DashboardTemplate>
    );
};

export default DashboardPage; 