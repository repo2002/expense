import React, { useRef, useEffect, useState } from 'react';
import './TabPanel.scss';

const TabPanel = ({ activeTab, tabs }) => {
    const headerRef = useRef(null);
    const [isMoving, setIsMoving] = useState(false);
    const [direction, setDirection] = useState('right');
    const prevTabRef = useRef(activeTab);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const activeButton = header.querySelector(`.tab-panel__tab.active`);
        if (activeButton) {
            setIsMoving(true);
            const buttonRect = activeButton.getBoundingClientRect();
            const headerRect = header.getBoundingClientRect();
            const newLeft = buttonRect.left - headerRect.left;
            const currentLeft = parseFloat(header.style.getPropertyValue('--tab-left')) || 0;
            
            // Determine direction
            const newDirection = newLeft > currentLeft ? 'right' : 'left';
            setDirection(newDirection);

            if (newDirection === 'right') {
                // Shrink from left side
                header.style.setProperty('--tab-width', '8px');
                
                setTimeout(() => {
                    // Move to new position
                    header.style.setProperty('--tab-left', `${newLeft}px`);
                    
                    setTimeout(() => {
                        // Expand from left side
                        header.style.setProperty('--tab-width', `${buttonRect.width}px`);
                        setIsMoving(false);
                    }, 200);
                }, 200);
            } else {
                // For left direction, first move anchor point to right side
                header.style.setProperty('--tab-left', `${currentLeft + parseFloat(header.style.getPropertyValue('--tab-width')) - 8}px`);
                header.style.setProperty('--tab-width', '8px');
                
                setTimeout(() => {
                    // Move to new position (right side of target)
                    header.style.setProperty('--tab-left', `${newLeft + buttonRect.width - 8}px`);
                    
                    setTimeout(() => {
                        // Move anchor to left and expand
                        header.style.setProperty('--tab-left', `${newLeft}px`);
                        header.style.setProperty('--tab-width', `${buttonRect.width}px`);
                        setIsMoving(false);
                    }, 200);
                }, 200);
            }
        }
        
        prevTabRef.current = activeTab;
    }, [activeTab]);

    return (
        <div className="tab-panel">
            <div 
                className={`tab-panel__header ${isMoving ? `moving-${direction}` : ''}`} 
                ref={headerRef}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-panel__tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => tab.onClick()}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-panel__content">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default TabPanel; 