import React, { useState, useEffect } from 'react';
import BaseTemplate from '../../templates/BaseTemplate';
import TabPanel from '../../molecules/TabPanel';
import PersonalInfoForm from '../../organisms/PersonalInfoForm';
import PasswordChangeForm from '../../organisms/PasswordChangeForm';
import axios from '../../api/axios';
import './Profile.scss';

const ProfilePage = () => {
    // Personal Info State
    const [isPersonalEditing, setIsPersonalEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        surname: '',
    });

    // Password Change State
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // Shared State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/user');
            setUserData(response.data);
        } catch (error) {
            setError('Failed to load user data');
        }
    };

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.put('/user/profile', userData);
            setIsPersonalEditing(false);
            setSuccessMessage('Profile updated successfully');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear after 3 seconds
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPasswordError('');
        setPasswordSuccessMessage('');

        try {
            const response = await axios.put('/user/password', passwordData);
            resetPasswordForm();
            setPasswordSuccessMessage(response.data.message);
            setTimeout(() => setPasswordSuccessMessage(''), 3000); // Clear after 3 seconds
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Failed to update password');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetPasswordForm = () => {
        setPasswordData({
            current_password: '',
            password: '',
            password_confirmation: '',
        });
        setPasswordError('');
    };

    const tabs = [
        {
            id: 'personal',
            label: 'Personal Information',
            content: (
                <PersonalInfoForm
                    userData={userData}
                    isEditing={isPersonalEditing}
                    isLoading={isLoading}
                    error={error}
                    successMessage={successMessage}
                    onEdit={() => setIsPersonalEditing(true)}
                    onSubmit={handlePersonalInfoSubmit}
                    onChange={handlePersonalInfoChange}
                    onCancel={() => {
                        setIsPersonalEditing(false);
                        fetchUserData();
                    }}
                />
            ),
            onClick: () => setActiveTab('personal')
        },
        {
            id: 'password',
            label: 'Change Password',
            content: (
                <PasswordChangeForm
                    passwordData={passwordData}
                    isEditing={isPasswordEditing}
                    isLoading={isLoading}
                    error={passwordError}
                    successMessage={passwordSuccessMessage}
                    onEdit={() => setIsPasswordEditing(true)}
                    onSubmit={handlePasswordSubmit}
                    onChange={handlePasswordChange}
                    onCancel={() => {
                        setIsPasswordEditing(false);
                        resetPasswordForm();
                    }}
                />
            ),
            onClick: () => setActiveTab('password')
        }
    ];

    return (
        <BaseTemplate
            title="Profile Settings"
            breadcrumbs="Settings / Profile"
        >
            <div className="profile-page">
                <TabPanel 
                    activeTab={activeTab}
                    tabs={tabs}
                />
            </div>
        </BaseTemplate>
    );
};

export default ProfilePage; 