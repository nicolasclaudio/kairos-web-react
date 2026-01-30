import React from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';
import { SocialAuth } from '../components/SocialAuth';

export const RegisterPage: React.FC = () => {
    return (
        <AuthLayout title="Únete a la nueva era de productividad.">
            <RegisterForm />
            <SocialAuth />
        </AuthLayout>
    );
};
