import React from 'react';
import './CategoryTag.scss';

const CategoryTag = ({ name, color, icon }) => {
    return (
        <div 
            className="category-tag"
            style={{ 
                backgroundColor: `${color}15`, // 15 is for opacity
                borderColor: color,
                color: color 
            }}
        >
            {icon && <span className="category-tag__icon">{icon}</span>}
            <span className="category-tag__name">{name}</span>
        </div>
    );
};

export default CategoryTag; 