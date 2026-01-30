import React from 'react';
import styled from 'styled-components';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ $hasError?: boolean; $hasLeftIcon?: boolean; $hasRightIcon?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: ${({ $hasLeftIcon, theme }) => $hasLeftIcon ? '2.5rem' : theme.spacing.md};
  padding-right: ${({ $hasRightIcon, theme }) => $hasRightIcon ? '2.5rem' : theme.spacing.md};
  
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ $hasError, theme }) =>
        $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  transition: all ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:hover:not(:disabled) {
    border-color: ${({ $hasError, theme }) =>
        $hasError ? theme.colors.danger : theme.colors.borderHover};
  }

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
        $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) =>
        $hasError ? `${theme.colors.danger}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const IconLeft = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

const IconRight = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

const HelperText = styled.span<{ $isError?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ $isError, theme }) =>
        $isError ? theme.colors.danger : theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <InputContainer>
                {label && <Label>{label}</Label>}
                <InputWrapper>
                    {leftIcon && <IconLeft>{leftIcon}</IconLeft>}
                    <StyledInput
                        ref={ref}
                        $hasError={!!error}
                        $hasLeftIcon={!!leftIcon}
                        $hasRightIcon={!!rightIcon || !!error}
                        {...props}
                    />
                    {error ? (
                        <IconRight>
                            <AlertCircle size={16} color="currentColor" />
                        </IconRight>
                    ) : (
                        rightIcon && <IconRight>{rightIcon}</IconRight>
                    )}
                </InputWrapper>
                {(error || helperText) && (
                    <HelperText $isError={!!error}>
                        {error || helperText}
                    </HelperText>
                )}
            </InputContainer>
        );
    }
);

Input.displayName = 'Input';
