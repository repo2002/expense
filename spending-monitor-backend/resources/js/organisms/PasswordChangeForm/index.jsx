import React from 'react';
import PasswordInput from '../../Molecules/PasswordInput';
import Button from '../../atoms/Button';
import './PasswordChangeForm.scss';

const PasswordChangeForm = ({
    passwordData,
    isEditing,
    isLoading,
    error,
    successMessage,
    onEdit,
    onSubmit,
    onChange,
    onCancel
}) => {
    return (
        <div className="password-change-form">
            <h2 className="password-change-form__title">Password Settings</h2>

            {error && (
                <div className="password-change-form__error">
                    {error}
                </div>
            )}
            
            {successMessage && (
                <div className="password-change-form__success">
                    {successMessage}
                </div>
            )}

            <form className="password-change-form__form" onSubmit={onSubmit}>
                <PasswordInput
                    label="Current Password"
                    id="current_password"
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={onChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                    required
                />
                <PasswordInput
                    label="New Password"
                    id="password"
                    name="password"
                    value={passwordData.password}
                    onChange={onChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                    required
                />
                <PasswordInput
                    label="Confirm New Password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={passwordData.password_confirmation}
                    onChange={onChange}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                    required
                />

                <div className="password-change-form__actions">
                    {!isEditing ? (
                        <Button 
                            variant="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                onEdit();
                            }}
                            type="button"
                        >
                            Change Password
                        </Button>
                    ) : (
                        <>
                            <Button 
                                type="submit"
                                variant="primary"
                                isLoading={isLoading}
                            >
                                Update Password
                            </Button>
                            <Button 
                                type="button"
                                variant="secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PasswordChangeForm; 