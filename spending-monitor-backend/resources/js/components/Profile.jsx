import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../sass/components/_profile.scss';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/user');
            setUser(response.data);
            setFormData({
                ...formData,
                name: response.data.name,
                email: response.data.email
            });
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await axios.put('/user/profile', formData);
            setUser(response.data);
            setIsEditing(false);
            // Clear password fields
            setFormData(prev => ({
                ...prev,
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            }));
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const updateProfile = async (data) => {
        try {
            const response = await axios.post('/api/profile/update', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            // handle response
        } catch (error) {
            // handle error
        }
    };

    if (!user) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-card__header">
                    <h1>Profile</h1>
                    <button 
                        className="edit-button"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <div className="error-message">{errors.name[0]}</div>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <div className="error-message">{errors.email[0]}</div>}
                        </div>

                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="current_password"
                                value={formData.current_password}
                                onChange={handleInputChange}
                                className={errors.current_password ? 'error' : ''}
                            />
                            {errors.current_password && <div className="error-message">{errors.current_password[0]}</div>}
                        </div>

                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="new_password"
                                value={formData.new_password}
                                onChange={handleInputChange}
                                className={errors.new_password ? 'error' : ''}
                            />
                            {errors.new_password && <div className="error-message">{errors.new_password[0]}</div>}
                        </div>

                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                name="new_password_confirmation"
                                value={formData.new_password_confirmation}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Name</label>
                            <p>{user.name}</p>
                        </div>
                        <div className="info-group">
                            <label>Email</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-group">
                            <label>Member Since</label>
                            <p>{new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile; 