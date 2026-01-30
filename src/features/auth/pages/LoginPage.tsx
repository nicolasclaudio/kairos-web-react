import React from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { SocialAuth } from '../components/SocialAuth';

export const LoginPage: React.FC = () => {
    return (
        <AuthLayout title="Domina tu tiempo, conquista tus metas.">
            <LoginForm />
            <SocialAuth />
        </AuthLayout>
    );
};
