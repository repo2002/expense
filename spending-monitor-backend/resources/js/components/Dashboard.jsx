import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import '../../sass/components/_dashboard.scss';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await API.get('/dashboard');
                setDashboardData(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/login');
                }
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (!dashboardData) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <h1>Welcome, {dashboardData.user.name}!</h1>
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Total Expenses</h3>
                    <p>${dashboardData.summary.total_expenses}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Budget</h3>
                    <p>${dashboardData.summary.total_budget}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Savings</h3>
                    <p>${dashboardData.summary.total_savings}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
