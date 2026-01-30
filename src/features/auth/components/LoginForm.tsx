import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../../../stores/useAuthStore';
import { KairosInput, InputGroup, Label } from './InputComponents';
import { KairosButton } from './ButtonComponents';

const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  margin-bottom: 8px;
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
`;

const LinkText = styled(Link)`
  color: ${({ theme }) => theme.colors.kairosAzul};
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $visible }) => ($visible ? '0' : '100px')});
  background: ${({ theme }) => theme.colors.kairosRojoCarmesi};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: transform 0.3s ease;
  z-index: 1000;
`;

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setLocalError(err.message || 'Error al iniciar sesión');
            setTimeout(() => setLocalError(null), 4000);
        }
    };

    return (
        <>
            <FormTitle>Bienvenido de nuevo</FormTitle>
            <FormSubtitle>Ingresa tus credenciales para continuar.</FormSubtitle>

            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <KairosInput
                        id="email"
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="password">Contraseña</Label>
                    <KairosInput
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>

                <KairosButton type="submit" $fullWidth disabled={isLoading}>
                    {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
                </KairosButton>
            </form>

            <p style={{ marginTop: 24, textAlign: 'center', color: '#64748B' }}>
                ¿No tienes cuenta? <LinkText to="/register">Regístrate gratis</LinkText>
            </p>

            <ToastContainer $visible={!!localError}>
                {localError}
            </ToastContainer>
        </>
    );
};
