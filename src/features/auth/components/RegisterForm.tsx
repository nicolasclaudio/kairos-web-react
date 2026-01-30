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

export const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const { register, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err: any) {
            setLocalError(err.message || 'Error al registrarse');
            setTimeout(() => setLocalError(null), 4000);
        }
    };

    return (
        <>
            <FormTitle>Crea tu cuenta</FormTitle>
            <FormSubtitle>Comienza tu viaje hacia la productividad total.</FormSubtitle>

            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <KairosInput
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </InputGroup>

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
                    {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                </KairosButton>
            </form>

            <p style={{ marginTop: 24, textAlign: 'center', color: '#64748B' }}>
                ¿Ya tienes cuenta? <LinkText to="/login">Inicia Sesión</LinkText>
            </p>

            <ToastContainer $visible={!!localError}>
                {localError}
            </ToastContainer>
        </>
    );
};
