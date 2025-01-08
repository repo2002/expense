import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../../Molecules/FormField';
import CategorySelect from '../../Molecules/CategorySelect';
import Button from '../../atoms/Button';
import API from '../../api/axios';
import './ExpenseForm.scss';
import { currencies } from '../../utils/currencies';
import { paymentMethods } from '../../utils/paymentMethods';

const ExpenseForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'EUR',
        date: new Date().toISOString().split('T')[0],
        category_id: '',
        description: '',
        payment_method: '',
        is_recurring: false,
        recurring_frequency: 'monthly', // monthly, weekly, yearly
        recurring_end_date: '',
        location: '',
        tags: [],
        receipt_image: null
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);


    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : 
                    type === 'file' ? files[0] : 
                    value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const formPayload = new FormData(); // new formdata object for image and file upload
            
            // Loop through form data
            // add all form data to formPayload
            // if key is tags, convert to json string
            // if key is receipt_image, add to formPayload
            // else add key and value to formPayload
            // Convert boolean to string/number for proper transmission
            const dataToSend = {
                ...formData,
                is_recurring: formData.is_recurring ? 1 : 0
            };

            // reference https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form

            Object.keys(dataToSend).forEach(key => {
                if (dataToSend[key] !== null && dataToSend[key] !== '') {
                    if (key === 'tags') {
                        formPayload.append(key, JSON.stringify(dataToSend[key]));
                    } else if (key === 'receipt_image') {
                        if (dataToSend[key]) {
                            formPayload.append(key, dataToSend[key]);
                        }
                    } else {
                        formPayload.append(key, dataToSend[key]);
                    }
                }
            });

            const response = await API.post('/expenses', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });

            if (response.data) {
                setIsSubmitted(true);
                // Reset form
                setFormData({
                    amount: '',
                    currency: 'EUR',
                    date: new Date().toISOString().split('T')[0],
                    category_id: '',
                    description: '',
                    payment_method: '',
                    is_recurring: false,
                    recurring_frequency: 'monthly',
                    recurring_end_date: '',
                    location: '',
                    tags: [],
                    receipt_image: null
                });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            }
        } catch (error) {
            console.error('Submission error:', error.response?.data);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: error.response?.data?.message || 'An error occurred while saving the expense.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2 className="expense-form__title">Add New Expense</h2>

            {errors.general && (
                <div className="expense-form__error">{errors.general}</div>
            )}

            {isSubmitted && (
                <div className="expense-form__success">
                    Expense added successfully!
                </div>
            )}

            <div className="expense-form__grid">
                <div className="expense-form__amount-group"> 
                    <FormField
                        label="Amount"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        error={errors.amount}
                        placeholder="0.00"
                    />
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="expense-form__currency-select"
                    >
                        {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                                {currency.symbol} {currency.code}
                            </option>
                        ))}
                    </select>
                </div>

                <FormField
                    label="Date"
                    type="date"
                    required
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    error={errors.date}
                    placeholder="DD/MM/YYYY"
                />
            </div>

            <div className="form-field">
                <label>Category</label>
                <CategorySelect
                    categories={categories}
                    selectedId={formData.category_id}
                    onChange={(id) => handleChange({
                        target: { name: 'category_id', value: id }
                    })}
                    error={errors.category_id}
                    required
                />
            </div>

            <div className="form-field">
                <label>Payment Method</label>
                <select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}

                >
                    <option value="">Select payment method</option>
                    {paymentMethods.map(method => (
                        <option key={method.id} value={method.id}>
                            {method.name}
                        </option>
                    ))}
                </select>
                {errors.payment_method && (
                    <span className="form-field__error">{errors.payment_method}</span>
                )}
            </div>

            <FormField
                label="Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                placeholder="Where did you make this expense?"
            />

            <FormField
                label="Description"
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Add any additional details..."
            />

            <div className="form-field">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="is_recurring"
                        checked={formData.is_recurring}
                        onChange={handleChange}
                    />
                    This is a recurring expense
                </label>
            </div>

            {formData.is_recurring && (
                <div className="expense-form__grid">
                    <div className="form-field">
                        <label>Frequency</label>
                        <select
                            name="recurring_frequency"
                            value={formData.recurring_frequency}
                            onChange={handleChange}
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <FormField
                        label="End Date"
                        type="date"
                        name="recurring_end_date"
                        value={formData.recurring_end_date}
                        onChange={handleChange}
                        error={errors.recurring_end_date}
                    />
                </div>
            )}

            <div className="form-field">
                <label>Receipt Image</label>
                <input
                    type="file"
                    name="receipt_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="form-field__input-file-upload"
                    id="receipt_upload"
                />
                <label htmlFor="receipt_upload" className="form-field__upload-button">
                    Choose File
                    {formData.receipt_image && (
                        <span className="form-field__filename">
                            {formData.receipt_image.name}
                        </span>
                    )}
                </label>
                {errors.receipt_image && (
                    <span className="form-field__error">{errors.receipt_image}</span>
                )}
            </div>

            <div className="expense-form__actions">
                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                >
                    Add Expense
                </Button>
            </div>
        </form>
    );
};

export default ExpenseForm; 