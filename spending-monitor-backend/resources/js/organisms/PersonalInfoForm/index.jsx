import React from 'react';
import FormField from '../../Molecules/FormField';
import Button from '../../atoms/Button';
import './PersonalInfoForm.scss';

const PersonalInfoForm = ({ 
    userData, 
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
        <div className="personal-info-form">
            <h2 className="personal-info-form__title">Personal Information</h2>

            {error && (
                <div className="personal-info-form__error">
                    {error}
                </div>
            )}
            
            {successMessage && (
                <div className="personal-info-form__success">
                    {successMessage}
                </div>
            )}

            <form className="personal-info-form__form" onSubmit={onSubmit}>
                <FormField
                    label="Name"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={onChange}
                    disabled={!isEditing}
                />
                <FormField
                    label="Surname"
                    id="surname"
                    name="surname"
                    value={userData.surname}
                    onChange={onChange}
                    disabled={!isEditing}
                />
                <FormField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={onChange}
                    disabled={!isEditing}
                />

                <div className="personal-info-form__actions">
                    {!isEditing ? (
                        <Button 
                            variant="primary"
                            onClick={onEdit}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <>
                            <Button 
                                type="submit"
                                variant="primary"
                                isLoading={isLoading}
                            >
                                Save Changes
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

export default PersonalInfoForm; 