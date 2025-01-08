import React from 'react';
import CategoryTag from '../../components/CategoryTag/index';
import './CategorySelect.scss';

const CategorySelect = ({ 
    categories, 
    selectedId, 
    onChange,
    error,
    required = false 
}) => {
    const selectedCategory = categories.find(cat => cat.id === selectedId);
    const unselectedCategories = categories.filter(cat => cat.id !== selectedId);

    const handleSelectedClick = () => {
        // Only allow deselection if not required or if there's already a selection
        if (!required || selectedId) {
            onChange(null);
        }
    };

    return (
        <div className="category-select">
            {/* Selected Category Display */}
            {selectedCategory && (
                <div className="category-select__selected">
                    <label className="category-select__label">
                        Selected Category
                        {required && <span className="category-select__required"> *</span>}
                    </label>
                    <button 
                        type="button"
                        className="category-select__selected-tag"
                        onClick={handleSelectedClick}
                        title="Click to deselect"
                    >
                        <CategoryTag
                            name={selectedCategory.name}
                            color={selectedCategory.color}
                            icon={selectedCategory.icon}
                        />
                    </button>
                </div>
            )}

            {/* Category Options */}
            <div className="category-select__options">
                <label className="category-select__label">
                    {selectedCategory ? 'Change Category' : 'Select Category'}
                    {required && !selectedCategory && <span className="category-select__required">*</span>}
                </label>
                <div className="category-select__grid">
                    {unselectedCategories.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            className="category-select__item"
                            onClick={() => onChange(category.id)}
                        >
                            <CategoryTag
                                name={category.name}
                                color={category.color}
                                icon={category.icon}
                            />
                        </button>
                    ))}
                </div>
            </div>
            
            {error && <span className="category-select__error">{error}</span>}
        </div>
    );
};

export default CategorySelect; 