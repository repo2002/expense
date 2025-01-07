import React from 'react';
import BaseTemplate from '../BaseTemplate';
import './DashboardTemplate.scss';

const DashboardTemplate = ({ 
    children, 
    title,
    actions,
    breadcrumbs 
}) => {
    return (
        <BaseTemplate>
            <div className="dashboard-template">
                <div className="dashboard-template__header">
                    {breadcrumbs && (
                        <div className="dashboard-template__breadcrumbs">
                            {breadcrumbs}
                        </div>
                    )}
                    <div className="dashboard-template__title-row">
                        {title && <h1 className="dashboard-template__title">{title}</h1>}
                        {actions && (
                            <div className="dashboard-template__actions">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
                <div className="dashboard-template__content">
                    {children}
                </div>
            </div>
        </BaseTemplate>
    );
};

export default DashboardTemplate; 