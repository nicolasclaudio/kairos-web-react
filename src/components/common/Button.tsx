import React from 'react';
import styled, { css } from 'styled-components';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const ButtonBase = styled.button<{ $variant: ButtonProps['variant']; $size: ButtonProps['size'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Size variants */
  ${({ $size, theme }) => {
        switch ($size) {
            case 'sm':
                return css`
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.fontSize.sm};
        `;
            case 'lg':
                return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSize.lg};
        `;
            default: // md
                return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.fontSize.base};
        `;
        }
    }}

  /* Variant styles */
  ${({ $variant, theme }) => {
        switch ($variant) {
            case 'secondary':
                return css`
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondaryHover};
          }
        `;
            case 'outline':
                return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.border};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceHover};
            border-color: ${theme.colors.primary};
          }
        `;
            case 'ghost':
                return css`
          background-color: transparent;
          color: ${theme.colors.text};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceHover};
          }
        `;
            case 'danger':
                return css`
          background-color: ${theme.colors.danger};
          color: white;
          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
            default: // primary
                return css`
          background-color: ${theme.colors.primary};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
        }
    }}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <ButtonBase
                ref={ref}
                $variant={variant}
                $size={size}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <IconWrapper>
                        <Loader2 size={16} className="animate-spin" />
                    </IconWrapper>
                )}
                {!isLoading && leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
                {children}
                {!isLoading && rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
            </ButtonBase>
        );
    }
);

Button.displayName = 'Button';
